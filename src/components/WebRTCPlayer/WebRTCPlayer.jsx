import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Box, makeStyles, Typography } from "@material-ui/core";
import "webrtc-adapter"; // Browser compatibility for WebRTC
import JanusStream from "../../shared/janus-stream";
import janusService from "../../services/janus.service";
import mqtt from "../../shared/mqtt-client";
import { keycloakData } from "../../redux/selectors/user";
import log from "loglevel";

log.setLevel("info");

const useStyles = makeStyles({
  container: {
    width: "100%",
    maxWidth: "100%",
  },
  video: {
    width: "100%",
    maxWidth: "100%",
    height: "auto",
    backgroundColor: "#000",
  },
  status: {
    padding: "10px",
    textAlign: "center",
    fontSize: "0.9rem",
    color: "#666",
  },
  error: {
    padding: "10px",
    textAlign: "center",
    fontSize: "0.9rem",
    color: "#d32f2f",
    backgroundColor: "#ffebee",
  },
  loading: {
    padding: "10px",
    textAlign: "center",
    fontSize: "0.9rem",
    color: "#1976d2",
  },
});

const WebRTCPlayer = ({ language, onError }) => {
  const classes = useStyles();
  const videoRef = useRef(null);
  const [connectionStatus, setConnectionStatus] = useState("connecting"); // connecting, connected, error, disconnected
  const [errorMessage, setErrorMessage] = useState(null);
  const janusStreamRef = useRef(null);
  const mqttInitializedRef = useRef(false);
  const initializedRef = useRef(false);

  const keycloak = useSelector(keycloakData);
  console.log("[WebRTCPlayer] keycloak:", keycloak);

  // Initialize MQTT and JanusStream
  useEffect(() => {
    // Only run once on mount
    if (initializedRef.current) {
      return;
    }
    
    if (!keycloak || !keycloak.subject) {
      log.warn("[WebRTCPlayer] Keycloak not available");
      return;
    }

    initializedRef.current = true;

    let isMounted = true;
    let timeoutId = null;
    let intervalId = null;

    const initStreaming = async () => {
      console.log("[WebRTCPlayer] initStreaming START");
      try {
        // Check and refresh token if expired
        if (keycloak.isTokenExpired && keycloak.isTokenExpired()) {
          log.info("[WebRTCPlayer] Token expired, refreshing...");
          try {
            await keycloak.updateToken(30);
            log.info("[WebRTCPlayer] Token refreshed successfully");
          } catch (error) {
            log.error("[WebRTCPlayer] Failed to refresh token:", error);
            if (isMounted) {
              setConnectionStatus("error");
              setErrorMessage("Failed to refresh authentication token");
            }
            return;
          }
        }

        // Get fresh token after potential refresh
        const token = keycloak.token;
        if (!token) {
          log.error("[WebRTCPlayer] No token available");
          if (isMounted) {
            setConnectionStatus("error");
            setErrorMessage("No authentication token available");
          }
          return;
        }

        log.info("[WebRTCPlayer] Token available:", token ? "***" : "(empty)");
        log.info("[WebRTCPlayer] User ID:", keycloak.subject);
        log.info("[WebRTCPlayer] User email:", keycloak.profile?.email || "(not available)");

        // Format user object for Janus
        const user = {
          id: keycloak.subject,
          email: keycloak.profile?.email || keycloak.subject,
          username: keycloak.profile?.username || keycloak.subject,
          token: token,
        };

        // Initialize MQTT first if not already done
        // Check if MQTT is actually connected, not just initialized
        const isMqttReallyConnected = mqtt.isConnected && mqtt.mq && mqtt.mq.connected;
        log.info("[WebRTCPlayer] MQTT state check:", {
          mqttInitialized: mqttInitializedRef.current,
          mqttIsConnected: mqtt.isConnected,
          mqttClientExists: !!mqtt.mq,
          mqttClientConnected: mqtt.mq?.connected,
          isMqttReallyConnected: isMqttReallyConnected
        });
        
        if (!mqttInitializedRef.current || !isMqttReallyConnected) {
          mqtt.setToken(token);
          log.info("[WebRTCPlayer] Token set for MQTT");
          log.info("[WebRTCPlayer] Current MQTT connection state:", mqtt.isConnected);
          
          // Always try to initialize MQTT, even if isConnected is true
          // This ensures we have a fresh connection with the current token
          log.info("[WebRTCPlayer] Initializing MQTT connection...");
          log.info("[WebRTCPlayer] Calling mqtt.init() with user:", { id: user.id, email: user.email });
          
          // Wait for MQTT connection before proceeding
          await new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => {
              if (isMounted) {
                log.error("[WebRTCPlayer] MQTT connection timeout");
                reject(new Error("MQTT connection timeout - check your network and MQTT server configuration"));
              }
            }, 10000); // 10 second timeout

            log.info("[WebRTCPlayer] About to call mqtt.init()");
            mqtt.init(user, (reconnected, disconnected) => {
              log.info("[WebRTCPlayer] MQTT init callback called:", { reconnected, disconnected });
              if (!isMounted) return;
              
              if (disconnected) {
                if (timeoutId) clearTimeout(timeoutId);
                log.error("[WebRTCPlayer] MQTT connection failed - Not authorized. Check token and MQTT server configuration.");
                setConnectionStatus("disconnected");
                setErrorMessage("Lost connection to MQTT server - Authentication failed");
                reject(new Error("MQTT connection failed - Not authorized"));
              } else if (reconnected) {
                log.info("[WebRTCPlayer] MQTT reconnected");
                if (timeoutId) clearTimeout(timeoutId);
                mqtt.watch();
                resolve();
              } else {
                // First connection
                if (timeoutId) clearTimeout(timeoutId);
                log.info("[WebRTCPlayer] MQTT connected successfully");
                mqtt.watch();
                resolve();
              }
            });
            log.info("[WebRTCPlayer] mqtt.init() called, waiting for callback...");
          });
          
          mqttInitializedRef.current = true;
        } else if (!mqtt.isConnected) {
          // Update token in case it was refreshed
          mqtt.setToken(token);
          
          // MQTT was initialized but not connected - wait for connection
          await new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => {
              if (isMounted) {
                log.error("[WebRTCPlayer] MQTT connection timeout (waiting for existing connection)");
                reject(new Error("MQTT connection timeout"));
              }
            }, 10000);

            intervalId = setInterval(() => {
              if (!isMounted) {
                if (intervalId) clearInterval(intervalId);
                if (timeoutId) clearTimeout(timeoutId);
                return;
              }
              if (mqtt.isConnected) {
                if (intervalId) clearInterval(intervalId);
                if (timeoutId) clearTimeout(timeoutId);
                resolve();
              }
            }, 100);
          });
        }

        // Fetch streaming server config
        const serverConfig = await janusService.fetchStreamingServer(user);
        console.log('[WebRTCPlayer] Server config received:', serverConfig);
        
        // Get stream IDs for the current language
        const streamIds = janusService.getStreamIdsForLanguage(language);
        console.log('[WebRTCPlayer] Stream IDs for language', language, ':', streamIds);
        
        // Create JanusStream instance
        const stream = new JanusStream();
        stream.setUser(user);
        stream.setConfig(serverConfig.config);
        
        // Set stream IDs BEFORE initializing streaming
        stream.setStreamIds(streamIds.video, streamIds.audio);
        
        stream.onInitializedCallback(() => {
          if (!isMounted) return;
          setConnectionStatus("connected");
          setErrorMessage(null);
          log.info("[WebRTCPlayer] Stream initialized");
        });

        stream.onErrorCallback((error) => {
          if (!isMounted) return;
          setConnectionStatus("error");
          setErrorMessage(error.message || "Stream error occurred");
          log.error("[WebRTCPlayer] Stream error:", error);
          if (onError) {
            onError(error);
          }
        });

        janusStreamRef.current = stream;

        // Initialize streaming
        console.log('[WebRTCPlayer] Initializing streaming with server:', serverConfig.server);
        stream.initStreaming(serverConfig.server);

      } catch (error) {
        log.error("[WebRTCPlayer] Initialization error:", error);
        if (!isMounted) return;
        setConnectionStatus("error");
        setErrorMessage(error.message || "Failed to initialize streaming");
        if (onError) {
          onError(error);
        }
      }
    };

    initStreaming();

    // Cleanup on unmount
    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      if (janusStreamRef.current) {
        janusStreamRef.current.destroy();
        janusStreamRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  // Handle language changes
  useEffect(() => {
    if (!janusStreamRef.current || !language) {
      return;
    }

    const streamIds = janusService.getStreamIdsForLanguage(language);
    janusStreamRef.current.setStreamIds(
      streamIds.video,
      streamIds.audio
    );
  }, [language]);

  // Attach video element and sync audio with video controls
  useEffect(() => {
    if (janusStreamRef.current && videoRef.current) {
      janusStreamRef.current.attachVideoStream(videoRef.current);
      
      const videoElement = videoRef.current;
      
      // Sync audio with video play/pause
      const handlePlay = () => {
        if (janusStreamRef.current) {
          janusStreamRef.current.playAudio();
        }
      };
      
      const handlePause = () => {
        if (janusStreamRef.current) {
          janusStreamRef.current.pauseAudio();
        }
      };
      
      videoElement.addEventListener('play', handlePlay);
      videoElement.addEventListener('pause', handlePause);
      
      // Cleanup listeners
      return () => {
        videoElement.removeEventListener('play', handlePlay);
        videoElement.removeEventListener('pause', handlePause);
      };
    }
  }, [connectionStatus]);

  const getStatusMessage = () => {
    switch (connectionStatus) {
      case "connecting":
        return "Connecting to live stream...";
      case "connected":
        return "Live stream connected";
      case "error":
        return errorMessage || "Connection error";
      case "disconnected":
        return "Disconnected from server";
      default:
        return "";
    }
  };

  return (
    <Box className={classes.container}>
      <video
        ref={videoRef}
        className={classes.video}
        autoPlay
        playsInline
        muted={false}
        controls
      />
      {connectionStatus !== "connected" && (
        <Box
          className={
            connectionStatus === "error"
              ? classes.error
              : connectionStatus === "disconnected"
              ? classes.error
              : classes.loading
          }
        >
          <Typography variant="body2">{getStatusMessage()}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default WebRTCPlayer;
