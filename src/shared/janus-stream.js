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
    log.debug("[janus-stream] initStreaming called with server:", serverName);
    this.clean();
    this.initStrServer(serverName, () => {
      if (this.videoStreamId && !this.videoJanusStream) {
        this.initVideoStream();
      }
      if (this.audioStreamId && !this.audioJanusStream) {
        this.initAudioStream();
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
      log.error("[janus-stream] No server configured");
      if (cb) cb();
    }
  };

  /**
   * Initialize Janus connection
   */
  initJanus = (serverName, cb) => {
    if (!this.user) {
      log.error("[janus-stream] User not set");
      if (cb) cb();
      return;
    }

    log.debug("[janus-stream] Initializing Janus connection with server:", serverName);

    // Get config for this server
    if (!this.config) {
      this.config = this.getDefaultConfig(serverName);
    }

    const janus = new JanusMqtt(this.user, serverName);

    janus.onStatus = (srv, status) => {
      if (status !== "online") {
        log.warn("[janus-stream] Janus status is not online:", status);
        if (this.janus) this.janus.destroy();
        this.janus = null;
        setTimeout(() => {
          this.initStrServer(serverName);
        }, 7000);
      } else {
        log.info("[janus-stream] Janus is online!");
      }
    };

    // Initialize with token from user
    const token = this.user.token || "";
    janus.init(token).then((data) => {
      log.info("[janus-stream] Janus initialized successfully");
      this.janus = janus;
      if (typeof cb === "function") cb();
    }).catch((error) => {
      log.error("[janus-stream] JanusMqtt init error:", error);
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
      log.warn("[janus-stream] Cannot init video stream - missing videoStreamId or janus connection");
      return;
    }

    log.debug("[janus-stream] Initializing video stream with ID:", this.videoStreamId);
    this.videoJanusStream = new StreamingPlugin(this.config?.iceServers);
    this.videoJanusStream.onStatus = (status) => {
      log.debug("[janus-stream] Video stream status:", status);
      if (status === "failed" && this.janus) {
        log.warn("[janus-stream] Video stream failed, reinitializing...");
        setTimeout(() => {
          this.initVideoStream();
        }, 2000);
      }
    };

    this.janus.attach(this.videoJanusStream).then(() => {
      this.videoJanusStream.watch(this.videoStreamId).then((stream) => {
        log.info("[janus-stream] Video stream started");
        this.videoMediaStream = stream;
        this.attachVideoStream_(this.videoElement, false);
        this.checkInitialized();
      }).catch((error) => {
        log.error("[janus-stream] Video watch error - Stream ID may not exist:", this.videoStreamId);
        log.error("[janus-stream] Error details:", error);
        if (this.onError) {
          this.onError(new Error(`Video stream ID ${this.videoStreamId} not found: ${error.message || error}`));
        }
      });
    }).catch((error) => {
      log.error("[janus-stream] Video attach error:", error);
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
      log.warn("[janus-stream] Cannot init audio stream - missing audioStreamId or janus connection");
      return;
    }

    log.debug("[janus-stream] Initializing audio stream with ID:", this.audioStreamId);
    this.audioJanusStream = new StreamingPlugin(this.config?.iceServers);
    this.audioJanusStream.onStatus = (status) => {
      log.debug("[janus-stream] Audio stream status:", status);
      if (status === "failed" && this.janus) {
        log.warn("[janus-stream] Audio stream failed, reinitializing...");
        setTimeout(() => {
          this.initAudioStream();
        }, 2000);
      }
    };

    this.janus.attach(this.audioJanusStream).then(() => {
      this.audioJanusStream.watch(this.audioStreamId).then((stream) => {
        log.info("[janus-stream] Audio stream started");
        this.audioMediaStream = stream;
        this.attachAudioStream_(this.audioElement, false);
        // Update video element with combined stream (video + audio)
        if (this.videoElement) {
          this.attachVideoStream_(this.videoElement, this.videoElement);
        }
        this.checkInitialized();
      }).catch((error) => {
        log.error("[janus-stream] Audio watch error - Stream ID may not exist:", this.audioStreamId);
        log.error("[janus-stream] Error details:", error);
        if (this.onError) {
          this.onError(new Error(`Audio stream ID ${this.audioStreamId} not found: ${error.message || error}`));
        }
      });
    }).catch((error) => {
      log.error("[janus-stream] Audio attach error:", error);
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
    log.debug("[janus-stream] setStreamIds called - video:", videoStreamId, "audio:", audioStreamId);
    const videoChanged = this.videoStreamId !== videoStreamId;
    const audioChanged = this.audioStreamId !== audioStreamId;

    this.videoStreamId = videoStreamId;
    this.audioStreamId = audioStreamId;

    if (this.janus) {
      if (videoChanged && videoStreamId) {
        if (this.videoJanusStream) {
          this.videoJanusStream.switch(videoStreamId).catch((error) => {
            log.warn("[janus-stream] Video switch failed, reinitializing video stream:", error);
            // If switch fails, reinitialize the stream
            this.janus.detach(this.videoJanusStream).then(() => {
              this.videoJanusStream = null;
              this.videoMediaStream = null;
              this.initVideoStream();
            }).catch((detachError) => {
              log.error("[janus-stream] Error detaching video stream:", detachError);
              // Force reinitialize even if detach fails
              this.videoJanusStream = null;
              this.videoMediaStream = null;
              this.initVideoStream();
            });
          });
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
          // Try switch first - it's faster and less disruptive
          this.audioJanusStream.switch(audioStreamId).catch((error) => {
            log.warn("[janus-stream] Audio switch failed, will retry with reinitialize:", error);
            // If switch fails, wait a bit and then reinitialize
            // This gives the connection time to stabilize
            setTimeout(() => {
              if (this.audioJanusStream && this.janus) {
                log.debug("[janus-stream] Reinitializing audio stream after switch failure");
                this.janus.detach(this.audioJanusStream).then(() => {
                  this.audioJanusStream = null;
                  this.audioMediaStream = null;
                  this.initAudioStream();
                }).catch((detachError) => {
                  log.error("[janus-stream] Error detaching audio stream:", detachError);
                  // Force reinitialize even if detach fails
                  this.audioJanusStream = null;
                  this.audioMediaStream = null;
                  this.initAudioStream();
                });
              }
            }, 500); // Wait 500ms before reinitializing
          });
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
        // Combine video and audio streams so video element has audio track
        // This allows the volume control to work properly
        const combinedStream = new MediaStream();
        
        // Add video tracks
        if (this.videoMediaStream) {
          this.videoMediaStream.getTracks().forEach(track => {
            if (track.kind === 'video') {
              combinedStream.addTrack(track);
            }
          });
        }
        
        // Add audio tracks from audio stream
        if (this.audioMediaStream) {
          this.audioMediaStream.getTracks().forEach(track => {
            if (track.kind === 'audio') {
              combinedStream.addTrack(track);
            }
          });
        }
        
        // If we have at least video, set the stream
        if (combinedStream.getVideoTracks().length > 0) {
          next.srcObject = combinedStream;
          next.play().catch(error => {
            log.error("[janus-stream] Error playing video", error);
          });
        } else {
          // Fallback to video only if no combined stream
          next.srcObject = this.videoMediaStream;
          next.play().catch(error => {
            log.error("[janus-stream] Error playing video", error);
          });
        }
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
   * Pause audio playback
   */
  pauseAudio = () => {
    if (this.audioElement) {
      this.audioElement.pause();
    }
  };

  /**
   * Play audio playback
   */
  playAudio = () => {
    if (this.audioElement) {
      this.audioElement.play().catch(error => {
        log.error("[janus-stream] Error playing audio", error);
      });
    }
  };

  /**
   * Clean up resources
   */
  clean() {
    log.debug("[janus-stream] clean() called");

    // Stop and cleanup video element
    if (this.videoElement) {
      if (this.videoElement.srcObject) {
        const videoStream = this.videoElement.srcObject;
        if (videoStream && videoStream.getTracks) {
          videoStream.getTracks().forEach(track => track.stop());
        }
        this.videoElement.srcObject = null;
      }
      this.videoElement.pause();
      this.videoElement = null;
    }

    // Stop and cleanup audio element
    if (this.audioElement) {
      this.audioElement.pause();
      if (this.audioElement.srcObject) {
        const audioStream = this.audioElement.srcObject;
        if (audioStream && audioStream.getTracks) {
          audioStream.getTracks().forEach(track => track.stop());
        }
        this.audioElement.srcObject = null;
      }
      this.audioElement.currentTime = 0;
    }

    // Stop media streams directly if they exist
    if (this.videoMediaStream) {
      if (this.videoMediaStream.getTracks) {
        this.videoMediaStream.getTracks().forEach(track => track.stop());
      }
      this.videoMediaStream = null;
    }

    if (this.audioMediaStream) {
      if (this.audioMediaStream.getTracks) {
        this.audioMediaStream.getTracks().forEach(track => track.stop());
      }
      this.audioMediaStream = null;
    }

    // Detach Janus plugins (this will close peer connections)
    if (this.janus) {
      if (this.videoJanusStream) {
        try {
          this.janus.detach(this.videoJanusStream);
        } catch (error) {
          log.error("[janus-stream] Error detaching video stream:", error);
        }
      }
      if (this.audioJanusStream) {
        try {
          this.janus.detach(this.audioJanusStream);
        } catch (error) {
          log.error("[janus-stream] Error detaching audio stream:", error);
        }
      }
    }

    this.videoJanusStream = null;
    this.audioJanusStream = null;
  }

  /**
   * Destroy Janus connection
   */
  destroy() {
    log.debug("[janus-stream] destroy() called");
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
