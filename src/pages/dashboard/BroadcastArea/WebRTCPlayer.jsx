import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Box, makeStyles, Typography } from "@material-ui/core";
import "webrtc-adapter"; // Browser compatibility for WebRTC
import JanusStream from "../../../shared/janus-stream";
import janusService from "../../../services/janus.service";
import mqtt from "../../../shared/mqtt-client";
import { keycloakData } from "../../../redux/selectors/user";
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
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const [connectionStatus, setConnectionStatus] = useState("connecting"); // connecting, connected, error, disconnected
  const [errorMessage, setErrorMessage] = useState(null);
  const janusStreamRef = useRef(null);
  const mqttInitializedRef = useRef(false);
  const initializedRef = useRef(false);

  const keycloak = useSelector(keycloakData);

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
      log.info("[WebRTCPlayer] initStreaming START");
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
        log.info('[WebRTCPlayer] Server config received:', serverConfig);

        // Get stream IDs for the current language
        const streamIds = janusService.getStreamIdsForLanguageName(language);
        log.info('[WebRTCPlayer] Stream IDs for language', language, ':', streamIds);
        
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
        log.info('[WebRTCPlayer] Initializing streaming with server:', serverConfig.server);
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

    const streamIds = janusService.getStreamIdsForLanguageName(language);
    janusStreamRef.current.setStreamIds(
      streamIds.video,
      streamIds.audio
    );
  }, [language]);

  // Attach video element and sync audio with video controls
  useEffect(() => {
    // Only run when stream is ready, video element exists, and connection is established
    if (
      !janusStreamRef.current ||
      !videoRef.current ||
      connectionStatus !== "connected"
    ) {
      return;
    }
  
    const stream = janusStreamRef.current;
    const video = videoRef.current;
    const audio = stream.audioElement;
  
    if (!audio) return;
  
    // 1) Attach the remote video track to the video element 
    stream.attachVideoStream(video);
  
    // 2) Initial sync: copy audio state → video state 
    // Ensures the UI (video controls) represent the actual audio track
    video.volume = audio.volume ?? 1;
    video.muted = audio.muted ?? false;
  
    // 3) Sync PLAY and PAUSE (Video → Audio) 
    // When the user presses play/pause on the video, we also control the audio track
    const handlePlay = () => {
      stream.playAudio();
    };
  
    const handlePause = () => {
      stream.pauseAudio();
    };
  
    // 4) VIDEO volume change (Video → Audio) 
    // User changes volume/mute in the video UI, so update the audio element + Janus API
    const handleVideoVolumeChange = () => {
      const vol = video.volume;
      const muted = video.muted;
  
      // Prevent infinite feedback loop: only update if different
      if (audio.volume !== vol) audio.volume = vol;
      if (audio.muted !== muted) audio.muted = muted;
  
      // Update Janus stream logic
      stream.setVolume(vol);
      stream.setMuted(muted);
    };
  
    // 5) AUDIO volume change (Audio → Video) 
    // If Janus or the backend changes audio volume, sync UI to reflect the actual state
    const handleAudioVolumeChange = () => {
      if (video.volume !== audio.volume) {
        video.volume = audio.volume;
      }
      if (video.muted !== audio.muted) {
        video.muted = audio.muted;
      }
    };
  
    // Register event listeners 
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("volumechange", handleVideoVolumeChange);
    audio.addEventListener("volumechange", handleAudioVolumeChange);
  
    // Initial sync so UI displays correct volume state 
    handleAudioVolumeChange();
  
    // Cleanup on unmount 
    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("volumechange", handleVideoVolumeChange);
      audio.removeEventListener("volumechange", handleAudioVolumeChange);
    };
  }, [connectionStatus]);

  const getStatusMessage = () => {
    switch (connectionStatus) {
      case "connecting":
        return t("Dashboard.BroadcastArea.webrtcConnecting");
      case "connected":
        return t("Dashboard.BroadcastArea.webrtcConnected");
      case "error":
        return errorMessage || t("Dashboard.BroadcastArea.webrtcError");
      case "disconnected":
        return t("Dashboard.BroadcastArea.webrtcDisconnected");
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

