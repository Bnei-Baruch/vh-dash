import mqtt from 'mqtt';
import {randomString} from "./utils";
import log from "loglevel";

const mqttTimeout = 30 // Seconds
const mqttKeepalive = 10 // Seconds

// Environment variables - should be set in .env
const MQTT_URL = process.env.REACT_APP_MQTT_URL || "";
const MSG_URL = process.env.REACT_APP_MSG_URL || process.env.REACT_APP_MQTT_URL || "";

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
  }

  init = (user, callback) => {
    if (!MQTT_URL && !MSG_URL) {
      log.error('[mqtt] MQTT_URL or MSG_URL must be configured');
      if (callback) callback(false, true);
      return;
    }

    this.user = user;
    const RC = mqttTimeout;
    const id = user.id + "-" + randomString(3);

    const transformUrl = (url, options, client) => {
      client.options.clientId = id;
      client.options.password = this.token;
      return url;
    };

    let options = {
      keepalive: mqttKeepalive,
      clientId: id,
      protocolId: "MQTT",
      protocolVersion: 5,
      clean: true,
      username: user.email || user.username || user.id,
      password: this.token || user.token || "",
      transformWsUrl: transformUrl,
      properties: {
        sessionExpiryInterval: mqttTimeout,
        maximumPacketSize: 256000,
        requestResponseInformation: true,
        requestProblemInformation: true,
      },
    };

    const url = MSG_URL || MQTT_URL;
    this.mq = mqtt.connect(`wss://${url}`, options);
    this.mq.setMaxListeners(50)

    this.mq.on("connect", (data) => {
      if (data && !this.isConnected) {
        log.info('[mqtt] Connected to server: ', data);
        this.isConnected = true;
        if (typeof callback === "function") callback(false, false);
      } else {
        log.info("[mqtt] Connected: ", data);
        this.isConnected = true;
        if (this.reconnect_count > RC) {
          if (typeof callback === "function") callback(true, false);
        }
        this.reconnect_count = 0;
      }
    });

    this.mq.on("close", () => {
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
    if (!this.mq) return;
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
    if (!this.mq) return;
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
      log.debug("%c[mqtt] <-- receive message" + cd + " | topic : " + topic, "color: darkgrey");
      const t = topic.split("/")
      if (t[0] === "msg") t.shift()
      const [root, service, id, target] = t
      switch (root) {
        case "janus":
          const json = JSON.parse(data)
          const mit = json?.session_id || packet?.properties?.userProperties?.mit || service
          this.mq.emit(mit, data, id);
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
