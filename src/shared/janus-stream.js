import {JanusMqtt} from "../lib/janus-mqtt";
import {StreamingPlugin} from "../lib/streaming-plugin";
import log from "loglevel";

/**
 * Simplified JanusStream for vh-dash broadcast viewing
 * Supports video and audio streaming via WebRTC
 */
class JanusStream {
  constructor() {
    this.janus = null;
    this.user = null;

    // Streaming plugin for video
    this.videoJanusStream = null;
    this.videoMediaStream = null;

    // Streaming plugin for audio
    this.audioJanusStream = null;
    this.audioMediaStream = null;

    // Stream IDs - will be set based on language
    this.videoStreamId = null;
    this.audioStreamId = null;

    this.config = null;
    this.videoElement = null;
    this.audioElement = new Audio();
    this.audioElement.autoplay = true;
    this.audioElement.controls = false;
    this.audioElement.muted = false;
    this.audioElement.volume = 0.6; // Default volume

    // Callbacks
    this.onInitialized = null;
    this.onError = null;
  }

  /**
   * Set user data (from Redux/keycloak)
   * @param {Object} user - User object with id, email, token
   */
  setUser = (user) => {
    this.user = user;
  };

  /**
   * Initialize streaming with server name or fetch from API
   * @param {string} serverName - Optional server name, otherwise will fetch from API
   */
  initStreaming = (serverName) => {
    console.log("[janus-stream] initStreaming called with server:", serverName);
    console.log("[janus-stream] Current stream IDs - video:", this.videoStreamId, "audio:", this.audioStreamId);
    this.clean();
    this.initStrServer(serverName, () => {
      console.log("[janus-stream] initStrServer callback - videoStreamId:", this.videoStreamId, "audioStreamId:", this.audioStreamId);
      console.log("[janus-stream] Streams status - videoJanusStream:", !!this.videoJanusStream, "audioJanusStream:", !!this.audioJanusStream);
      if (this.videoStreamId && !this.videoJanusStream) {
        console.log("[janus-stream] Initializing video stream...");
        this.initVideoStream();
      } else {
        console.warn("[janus-stream] Skipping video stream - videoStreamId:", this.videoStreamId, "videoJanusStream exists:", !!this.videoJanusStream);
      }
      if (this.audioStreamId && !this.audioJanusStream) {
        console.log("[janus-stream] Initializing audio stream...");
        this.initAudioStream();
      } else {
        console.warn("[janus-stream] Skipping audio stream - audioStreamId:", this.audioStreamId, "audioJanusStream exists:", !!this.audioJanusStream);
      }
    });
  };

  /**
   * Initialize or get Janus server
   */
  initStrServer = (serverName, cb) => {
    if (this.janus) {
      if (typeof cb === "function") cb();
      return;
    }

    if (serverName) {
      this.initJanus(serverName, cb);
      return;
    }

    // Try to fetch server from API, or use default config
    // This will be handled by janus-config service
    if (this.config && this.config.server) {
      this.initJanus(this.config.server, cb);
    } else {
      console.error("[janus-stream] No server configured");
      if (cb) cb();
    }
  };

  /**
   * Initialize Janus connection
   */
  initJanus = (serverName, cb) => {
    if (!this.user) {
      console.error("[janus-stream] User not set");
      if (cb) cb();
      return;
    }

    console.log("[janus-stream] Initializing Janus connection with server:", serverName);
    console.log("[janus-stream] User ID:", this.user.id);

    // Get config for this server
    if (!this.config) {
      this.config = this.getDefaultConfig(serverName);
      console.log("[janus-stream] Using default config:", this.config);
    } else {
      console.log("[janus-stream] Using provided config:", this.config);
    }

    const janus = new JanusMqtt(this.user, serverName);

    janus.onStatus = (srv, status) => {
      console.log("[janus-stream] Janus status update:", { server: srv, status });
      if (status !== "online") {
        console.warn("[janus-stream] Janus status is not online:", status);
        if (this.janus) this.janus.destroy();
        this.janus = null;
        setTimeout(() => {
          this.initStrServer(serverName);
        }, 7000);
      } else {
        console.log("[janus-stream] Janus is online!");
      }
    };

    // Initialize with token from user
    const token = this.user.token || "";
    console.log("[janus-stream] Initializing JanusMqtt with token:", token ? "***" : "(no token)");
    janus.init(token).then((data) => {
      console.log("[janus-stream] JanusMqtt initialized successfully:", data);
      this.janus = janus;
      if (typeof cb === "function") cb();
    }).catch((error) => {
      console.error("[janus-stream] JanusMqtt init error:", error);
      if (this.onError) {
        this.onError(error);
      }
      if (typeof cb === "function") cb();
    });
  };

  /**
   * Get default config for a server
   * @param {string} serverName 
   */
  getDefaultConfig = (serverName) => {
    // Default STUN server - can be overridden
    const stunServer = (window.APP_CONFIG && window.APP_CONFIG.STUN_SRV_STR) || "stun:stun.l.google.com:19302";
    
    return {
      server: serverName,
      iceServers: [{urls: stunServer}]
    };
  };

  /**
   * Set config (gateway, iceServers, etc.)
   */
  setConfig = (config) => {
    this.config = config;
  };

  /**
   * Initialize video stream
   */
  initVideoStream = () => {
    if (!this.videoStreamId || !this.janus) {
      console.warn("[janus-stream] Cannot init video stream - missing videoStreamId or janus connection");
      console.warn("[janus-stream] videoStreamId:", this.videoStreamId, "janus:", !!this.janus);
      return;
    }

    console.log("[janus-stream] Initializing video stream with ID:", this.videoStreamId);
    this.videoJanusStream = new StreamingPlugin(this.config?.iceServers);
    this.videoJanusStream.onStatus = (status) => {
      console.log("[janus-stream] Video stream status:", status);
      if (status === "failed" && this.janus) {
        console.warn("[janus-stream] Video stream failed, reinitializing...");
        setTimeout(() => {
          this.initVideoStream();
        }, 2000);
      }
    };

    this.janus.attach(this.videoJanusStream).then((data) => {
      console.log("[janus-stream] Video plugin attached successfully", data);
      console.log("[janus-stream] Attempting to watch video stream ID:", this.videoStreamId);
      this.videoJanusStream.watch(this.videoStreamId).then((stream) => {
        console.log("[janus-stream] Video stream watch successful! Stream:", stream);
        this.videoMediaStream = stream;
        this.attachVideoStream_(this.videoElement, false);
        this.checkInitialized();
      }).catch((error) => {
        console.error("[janus-stream] Video watch error - Stream ID may not exist:", this.videoStreamId);
        console.error("[janus-stream] Error details:", error);
        if (this.onError) {
          this.onError(new Error(`Video stream ID ${this.videoStreamId} not found: ${error.message || error}`));
        }
      });
    }).catch((error) => {
      console.error("[janus-stream] Video attach error:", error);
      if (this.onError) {
        this.onError(error);
      }
    });
  };

  /**
   * Initialize audio stream
   */
  initAudioStream = () => {
    if (!this.audioStreamId || !this.janus) {
      console.warn("[janus-stream] Cannot init audio stream - missing audioStreamId or janus connection");
      console.warn("[janus-stream] audioStreamId:", this.audioStreamId, "janus:", !!this.janus);
      return;
    }

    console.log("[janus-stream] Initializing audio stream with ID:", this.audioStreamId);
    this.audioJanusStream = new StreamingPlugin(this.config?.iceServers);
    this.audioJanusStream.onStatus = (status) => {
      console.log("[janus-stream] Audio stream status:", status);
      if (status === "failed" && this.janus) {
        console.warn("[janus-stream] Audio stream failed, reinitializing...");
        setTimeout(() => {
          this.initAudioStream();
        }, 2000);
      }
    };

    this.janus.attach(this.audioJanusStream).then((data) => {
      console.log("[janus-stream] Audio plugin attached successfully", data);
      console.log("[janus-stream] Attempting to watch audio stream ID:", this.audioStreamId);
      this.audioJanusStream.watch(this.audioStreamId).then((stream) => {
        console.log("[janus-stream] Audio stream watch successful! Stream:", stream);
        this.audioMediaStream = stream;
        this.attachAudioStream_(this.audioElement, false);
        this.checkInitialized();
      }).catch((error) => {
        console.error("[janus-stream] Audio watch error - Stream ID may not exist:", this.audioStreamId);
        console.error("[janus-stream] Error details:", error);
        if (this.onError) {
          this.onError(new Error(`Audio stream ID ${this.audioStreamId} not found: ${error.message || error}`));
        }
      });
    }).catch((error) => {
      console.error("[janus-stream] Audio attach error:", error);
      if (this.onError) {
        this.onError(error);
      }
    });
  };

  /**
   * Check if both streams are initialized
   */
  checkInitialized = () => {
    const videoReady = !this.videoStreamId || (this.videoJanusStream && this.videoMediaStream);
    const audioReady = this.audioJanusStream && this.audioMediaStream;

    if (videoReady && audioReady && this.onInitialized) {
      this.onInitialized();
    }
  };

  /**
   * Set stream IDs for video and audio
   * @param {number} videoStreamId - Janus stream ID for video
   * @param {number} audioStreamId - Janus stream ID for audio
   */
  setStreamIds = (videoStreamId, audioStreamId) => {
    console.log("[janus-stream] setStreamIds called - video:", videoStreamId, "audio:", audioStreamId);
    console.log("[janus-stream] Previous IDs - video:", this.videoStreamId, "audio:", this.audioStreamId);
    const videoChanged = this.videoStreamId !== videoStreamId;
    const audioChanged = this.audioStreamId !== audioStreamId;

    this.videoStreamId = videoStreamId;
    this.audioStreamId = audioStreamId;
    console.log("[janus-stream] Stream IDs updated - video:", this.videoStreamId, "audio:", this.audioStreamId);

    if (this.janus) {
      if (videoChanged && videoStreamId) {
        if (this.videoJanusStream) {
          this.videoJanusStream.switch(videoStreamId);
        } else {
          this.initVideoStream();
        }
      } else if (videoChanged && !videoStreamId) {
        // Remove video stream
        if (this.videoJanusStream) {
          this.janus.detach(this.videoJanusStream);
          this.videoJanusStream = null;
          this.videoMediaStream = null;
        }
      }

      if (audioChanged && audioStreamId) {
        if (this.audioJanusStream) {
          this.audioJanusStream.switch(audioStreamId);
        } else {
          this.initAudioStream();
        }
      }
    }
  };

  /**
   * Attach video stream to video element
   */
  attachVideoStream(videoElement) {
    if (videoElement && videoElement !== this.videoElement) {
      this.attachVideoStream_(videoElement, this.videoElement);
      this.videoElement = videoElement;
    }
  }

  attachVideoStream_(next, prev) {
    if (next) {
      if (prev && next !== prev && prev.srcObject) {
        next.srcObject = prev.srcObject;
      } else if (this.videoMediaStream) {
        next.srcObject = this.videoMediaStream;
        next.play().catch(error => {
          console.error("[janus-stream] Error playing video", error);
        });
      }
    }
  }

  attachAudioStream_(next, prev) {
    if (next) {
      if (prev && next !== prev && prev.srcObject) {
        next.srcObject = prev.srcObject;
      } else if (this.audioMediaStream) {
        next.srcObject = this.audioMediaStream;
      }
    }
  }

  /**
   * Set volume
   */
  setVolume = (volume) => {
    if (this.audioElement) {
      this.audioElement.volume = volume;
    }
  };

  /**
   * Mute/unmute audio
   */
  setMuted = (muted) => {
    if (this.audioElement) {
      this.audioElement.muted = muted;
    }
  };

  /**
   * Clean up resources
   */
  clean() {
    if (this.janus) {
      if (this.videoElement) {
        this.videoElement.srcObject = null;
      }
      if (this.audioElement) {
        this.audioElement.srcObject = null;
      }

      if (this.videoJanusStream) {
        this.janus.detach(this.videoJanusStream);
      }
      if (this.audioJanusStream) {
        this.janus.detach(this.audioJanusStream);
      }

      this.videoJanusStream = null;
      this.videoMediaStream = null;
      this.audioJanusStream = null;
      this.audioMediaStream = null;
    }
  }

  /**
   * Destroy Janus connection
   */
  destroy() {
    this.clean();
    if (this.janus) {
      this.janus.destroy();
      this.janus = null;
    }
  }

  /**
   * Set callback for when streams are initialized
   */
  onInitializedCallback = (callback) => {
    this.onInitialized = callback;
  };

  /**
   * Set callback for errors
   */
  onErrorCallback = (callback) => {
    this.onError = callback;
  };
}

export default JanusStream;
