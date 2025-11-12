import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Box, makeStyles, Typography } from "@material-ui/core";
import "webrtc-adapter"; // Browser compatibility for WebRTC
import JanusStream from "../../shared/janus-stream";
import janusService from "../../services/janus.service";
import mqtt from "../../shared/mqtt-client";
import { keycloakData } from "../../redux/selectors/user";
import log from "loglevel";

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

  const keycloak = useSelector(keycloakData);

  // Initialize MQTT and JanusStream
  useEffect(() => {
    if (!keycloak || !keycloak.subject) {
      log.warn("[WebRTCPlayer] Keycloak not available");
      return;
    }

    const initStreaming = async () => {
      try {
        // Format user object for Janus
        const user = {
          id: keycloak.subject,
          email: keycloak.profile?.email || keycloak.subject,
          username: keycloak.profile?.username || keycloak.subject,
          token: keycloak.token,
        };

        // Initialize MQTT first if not already done
        if (!mqttInitializedRef.current) {
          mqtt.setToken(keycloak.token);
          mqtt.init(user, (reconnected, disconnected) => {
            if (disconnected) {
              setConnectionStatus("disconnected");
              setErrorMessage("Lost connection to server");
            } else if (reconnected) {
              log.info("[WebRTCPlayer] MQTT reconnected");
            }
          });
          mqttInitializedRef.current = true;
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
          setConnectionStatus("connected");
          setErrorMessage(null);
          log.info("[WebRTCPlayer] Stream initialized");
        });

        stream.onErrorCallback((error) => {
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
      if (janusStreamRef.current) {
        janusStreamRef.current.destroy();
        janusStreamRef.current = null;
      }
    };
  }, [keycloak, onError]);

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

  // Attach video element
  useEffect(() => {
    if (janusStreamRef.current && videoRef.current) {
      janusStreamRef.current.attachVideoStream(videoRef.current);
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
