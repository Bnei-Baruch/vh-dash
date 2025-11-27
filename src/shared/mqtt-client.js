import mqtt from 'mqtt';
import {randomString} from "./utils";
import log from "loglevel";

const mqttTimeout = 30 // Seconds
const mqttKeepalive = 10 // Seconds

// Environment variables - should be set in .env
const MQTT_URL = process.env.REACT_APP_MQTT_URL || "";
const MSG_URL = process.env.REACT_APP_MSG_URL || "";
// Try MSG_URL first, but if it fails, fallback to MQTT_URL
// This allows us to try msg.kab.info if msg.kab.sh doesn't work

// Debug: Check if environment variables are loaded
console.log('[mqtt-client] Environment variables check:');
console.log('  REACT_APP_MQTT_URL:', process.env.REACT_APP_MQTT_URL || '(not set)');
console.log('  REACT_APP_MSG_URL:', process.env.REACT_APP_MSG_URL || '(not set)');
console.log('  MQTT_URL (resolved):', MQTT_URL || '(empty)');
console.log('  MSG_URL (resolved):', MSG_URL || '(empty)');

class MqttMsg {
  constructor() {
    this.user = null;
    this.mq = null;
    this.isConnected = false;
    this.token = null;
    this.reconnect_count = 0;
    this._fallbackAttempted = false; // Track if we've tried fallback URL
  }

  init = (user, callback) => {
    if (!MQTT_URL && !MSG_URL) {
      log.error('[mqtt] MQTT_URL or MSG_URL must be configured');
      if (callback) callback(false, true);
      return;
    }

    // Reset fallback flag if we're starting fresh (not a retry)
    // Only reset if this is the first attempt (no existing connection)
    if (!this.mq) {
      this._fallbackAttempted = false;
      log.info('[mqtt] Starting fresh MQTT connection attempt, fallback flag reset');
    }

    // Close existing connection if it exists
    if (this.mq) {
      log.info('[mqtt] Closing existing connection before creating new one');
      log.info('[mqtt] Previous connection state - isConnected:', this.isConnected);
      log.info('[mqtt] Fallback attempted flag:', this._fallbackAttempted);
      try {
        this.mq.removeAllListeners();
        this.mq.end(true); // Force close
      } catch (error) {
        log.warn('[mqtt] Error closing existing connection:', error);
      }
      this.mq = null;
      this.isConnected = false; // Reset connection state
      log.info('[mqtt] Connection state reset - isConnected:', this.isConnected);
    }

    this.user = user;
    const RC = mqttTimeout;
    const id = user.id + "-" + randomString(3);

    // Get token - prioritize this.token (set via setToken) over user.token
    const token = this.token || user.token || "";
    
    // Log connection details (without exposing sensitive data)
    log.info('[mqtt] Connection details:');
    log.info('  URL:', MSG_URL || MQTT_URL);
    log.info('  Client ID:', id);
    log.info('  Username:', user.email || user.username || user.id);
    log.info('  Token available:', token ? "yes" : "no");
    log.info('  Token length:', token ? token.length : 0);
    log.info('  Token starts with:', token ? token.substring(0, 20) + "..." : "(empty)");

    if (!token) {
      log.error('[mqtt] No token available for authentication');
      if (callback) callback(false, true);
      return;
    }

    // Validate token format (JWT tokens typically have 3 parts separated by dots)
    if (token.split('.').length !== 3) {
      log.warn('[mqtt] Token does not appear to be a valid JWT format (expected 3 parts separated by dots)');
    }

    const transformUrl = (url, options, client) => {
      // Ensure token is set in client options
      client.options.clientId = id;
      client.options.password = token;
      return url;
    };

    // Determine username - use email (like galaxy3) as MQTT server expects email
    // Fallback to username, then user ID
    const username = user.email || user.username || user.id;
    
    let options = {
      keepalive: mqttKeepalive,
      clientId: id,
      protocolId: "MQTT",
      protocolVersion: 5,
      clean: true,
      username: username,
      password: token, // Use token directly - this is the correct way
      transformWsUrl: transformUrl,
      connectTimeout: 10000, // 10 seconds timeout for CONNACK
      reconnectPeriod: 0, // Disable auto-reconnect (we handle it manually)
      properties: {
        sessionExpiryInterval: mqttTimeout,
        maximumPacketSize: 256000,
        requestResponseInformation: true,
        requestProblemInformation: true,
      },
    };

    // Try MSG_URL first, then MQTT_URL as fallback
    const url = MSG_URL || MQTT_URL;
    if (!url) {
      log.error('[mqtt] No MQTT URL configured! MSG_URL and MQTT_URL are both empty.');
      if (callback) callback(false, true);
      return;
    }
    
    log.info('[mqtt] Connecting to:', `wss://${url}`);
    log.info('[mqtt] MSG_URL:', MSG_URL || '(not set)');
    log.info('[mqtt] MQTT_URL:', MQTT_URL || '(not set)');
    log.info('[mqtt] Using URL:', url);
    log.info('[mqtt] Using username:', username);
    log.info('[mqtt] Using client ID:', id);
    log.info('[mqtt] Connection timeout:', options.connectTimeout, 'ms');
    
    try {
      // Try connecting with the URL
      const wsUrl = `wss://${url}`;
      log.info('[mqtt] Attempting WebSocket connection to:', wsUrl);
      this.mq = mqtt.connect(wsUrl, options);
    } catch (error) {
      log.error('[mqtt] Failed to create MQTT connection:', error);
      this.isConnected = false;
      if (callback) callback(false, true);
      return;
    }
    this.mq.setMaxListeners(50)

    this.mq.on("connect", (data) => {
      log.info('[mqtt] Connect event received:', data);
      if (data && !this.isConnected) {
        log.info('[mqtt] Connected to server (first time): ', data);
        this.isConnected = true;
        if (typeof callback === "function") {
          log.info('[mqtt] Calling callback with connected=true');
          callback(false, false);
        }
      } else {
        log.info("[mqtt] Connected (reconnection): ", data);
        this.isConnected = true;
        if (this.reconnect_count > RC) {
          if (typeof callback === "function") {
            log.info('[mqtt] Calling callback with reconnected=true');
            callback(true, false);
          }
        }
        this.reconnect_count = 0;
      }
    });

    this.mq.on("error", (error) => {
      log.error('[mqtt] Connection error:', error);
      log.error('[mqtt] Error details:', {
        message: error.message,
        code: error.code,
        reasonCode: error.reasonCode,
        stack: error.stack
      });
      
      // Handle WebSocket connection failures and connack timeout
      const errorMessage = error.message || '';
      const isWebSocketError = errorMessage.includes('WebSocket is closed') ||
                               errorMessage.includes('WebSocket connection') ||
                               errorMessage.includes('connack timeout') ||
                               errorMessage.includes('CONNACK');
      
      log.info('[mqtt] Checking if error is WebSocket/CONNACK error:', isWebSocketError);
      log.info('[mqtt] Error message contains:', {
        'WebSocket is closed': errorMessage.includes('WebSocket is closed'),
        'WebSocket connection': errorMessage.includes('WebSocket connection'),
        'connack timeout': errorMessage.includes('connack timeout'),
        'CONNACK': errorMessage.includes('CONNACK')
      });
      
      if (isWebSocketError) {
        log.error('[mqtt] WebSocket/CONNACK error - MQTT broker connection failed');
        log.error('[mqtt] Current URL:', `wss://${url}`);
        log.info('[mqtt] MSG_URL:', MSG_URL || '(not set)');
        log.info('[mqtt] MQTT_URL:', MQTT_URL || '(not set)');
        log.info('[mqtt] Fallback attempted flag:', this._fallbackAttempted);
        
        // Try fallback URL if current one failed
        const fallbackUrl = (url === MSG_URL && MQTT_URL) ? MQTT_URL : null;
        log.info('[mqtt] Fallback URL determined:', fallbackUrl || '(none)');
        
        if (fallbackUrl && fallbackUrl !== url && !this._fallbackAttempted) {
          this._fallbackAttempted = true; // Prevent infinite retry loop
          log.warn('[mqtt] Attempting fallback to MQTT_URL:', `wss://${fallbackUrl}`);
          // Close current connection
          if (this.mq) {
            try {
              this.mq.removeAllListeners();
              this.mq.end(true);
            } catch (e) {
              log.warn('[mqtt] Error closing connection:', e);
            }
            this.mq = null;
          }
          
          // Retry with fallback URL
          setTimeout(() => {
            log.info('[mqtt] Retrying connection with fallback URL:', `wss://${fallbackUrl}`);
            this._fallbackAttempted = false; // Reset for next attempt
            this.init(user, callback);
          }, 1000);
          return;
        } else {
          log.warn('[mqtt] Cannot use fallback:', {
            hasFallbackUrl: !!fallbackUrl,
            fallbackDifferent: fallbackUrl !== url,
            notAttempted: !this._fallbackAttempted
          });
        }
        
        log.error('[mqtt] Possible causes:');
        log.error('  1. MQTT broker is not accessible at:', `wss://${url}`);
        log.error('  2. Network connectivity issues');
        log.error('  3. Firewall blocking WebSocket connections');
        log.error('  4. MQTT broker is down or not responding');
      }
      
      // Log authentication details for debugging (without exposing sensitive data)
      if (error.code === 135 || error.message?.includes('Not authorized')) {
        log.error('[mqtt] Authentication failed. Details:');
        log.error('  Username used:', username);
        log.error('  Token length:', token.length);
        log.error('  Token format valid:', token.split('.').length === 3 ? 'Yes (JWT)' : 'No');
        log.error('  Client ID:', id);
        log.error('  Server URL:', `wss://${url}`);
        log.error('[mqtt] Possible causes:');
        log.error('  1. Token may be expired or invalid');
        log.error('  2. Username may not match MQTT server expectations');
        log.error('  3. MQTT server may require different authentication format');
        log.error('  4. User may not have permission to connect to MQTT server');
      }
      
      this.isConnected = false;
      if (typeof callback === "function") {
        callback(false, true);
      }
    });

    this.mq.on("offline", () => {
      log.warn('[mqtt] Client went offline');
      this.isConnected = false;
    });

    this.mq.on("close", () => {
      log.debug("[mqtt] Connection closed");
      this.isConnected = false;
      if (this.reconnect_count < RC + 2) {
        this.reconnect_count++;
        log.debug("[mqtt] reconnecting counter: " + this.reconnect_count)
      }
      if (this.reconnect_count === RC) {
        this.reconnect_count++;
        log.warn("[mqtt] - disconnected - after: " + this.reconnect_count + " seconds")
        if (typeof callback === "function") callback(false, true);
      }
    });

  };

  join = (topic, chat) => {
    if (!this.mq) return;
    log.info("[mqtt] Subscribe to: ", topic);
    let options = chat ? {qos: 0, nl: false} : {qos: 1, nl: true};
    this.mq.subscribe(topic, {...options}, (err) => {
      err && log.error("[mqtt] Error: ", err);
    });
  };

  sub = (topic, qos) => {
    if (!this.mq) {
      log.warn("[mqtt] Cannot subscribe - MQTT client not initialized");
      return;
    }
    if (!this.isConnected) {
      log.warn("[mqtt] Cannot subscribe - MQTT not connected. Topic:", topic);
      return;
    }
    log.info("[mqtt] Subscribe to: ", topic);
    let options = {qos, nl: true};
    this.mq.subscribe(topic, {...options}, (err) => {
      err && log.error("[mqtt] Error: ", err);
    });
  };

  exit = (topic) => {
    if (!this.mq) return;
    let options = {};
    log.info("[mqtt] Unsubscribe from: ", topic);
    this.mq.unsubscribe(topic, {...options}, (err) => {
      err && log.error("[mqtt] Error: ", err);
    });
  };

  send = (message, retain, topic, rxTopic, user) => {
    if (!this.mq) {
      log.warn("[mqtt] Cannot send - MQTT client not initialized");
      return;
    }
    if (!this.isConnected) {
      log.warn("[mqtt] Cannot send - MQTT not connected. Topic:", topic);
      return;
    }
    let correlationData = null;
    try {
      const parsed = JSON.parse(message);
      correlationData = parsed?.transaction;
    } catch (e) {
      // Not JSON, ignore
    }
    let cd = correlationData ? " | transaction: " + correlationData : ""
    log.debug("%c[mqtt] --> send message" + cd + " | topic: " + topic + " | data: " + message, "color: darkgrey");
    let properties = !!rxTopic ? {
      userProperties: user || this.user,
      responseTopic: rxTopic,
      correlationData
    } : {userProperties: user || this.user};
    let options = {qos: 1, retain, properties};
    this.mq.publish(topic, message, {...options}, (err) => {
      err && log.error("[mqtt] Error: ", err);
    });
  };

  watch = (callback) => {
    this.mq.on("message", (topic, data, packet) => {
      log.trace("[mqtt] <-- receive packet: ", packet)
      let cd = packet?.properties?.correlationData ? " | transaction: " + packet?.properties?.correlationData?.toString() : ""
      log.info("[mqtt] <-- receive message" + cd + " | topic : " + topic);
      log.info("[mqtt] Message data (first 200 chars):", data.toString().substring(0, 200));
      const t = topic.split("/")
      if (t[0] === "msg") t.shift()
      const [root, service, id, target] = t
      log.info("[mqtt] Parsed topic - root:", root, "service:", service, "id:", id, "target:", target);
      switch (root) {
        case "janus":
          try {
            const json = JSON.parse(data)
            log.info("[mqtt] Janus message parsed - janus type:", json.janus, "session_id:", json.session_id);
            const mit = json?.session_id || packet?.properties?.userProperties?.mit || service
            log.info("[mqtt] Emitting to:", mit, "with data type:", json.janus);
            this.mq.emit(mit, data, id);
          } catch (e) {
            log.error("[mqtt] Error parsing Janus message:", e);
            log.error("[mqtt] Raw data:", data.toString());
          }
          break;
        default:
          if (typeof callback === "function")
            try {
              callback(JSON.parse(data.toString()), topic);
            } catch (e) {
              log.error("[mqtt] Error parsing message", e);
            }
      }
    });
  };

  setToken = (token) => {
    this.token = token;
  };

}

const defaultMqtt = new MqttMsg();

export default defaultMqtt;
