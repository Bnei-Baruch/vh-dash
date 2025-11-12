/**
 * Janus Gateway Configuration
 * Handles gateway settings and server selection for WebRTC streaming
 */

const DEFAULT_STUN_SERVER = "stun:stun.l.google.com:19302";

class JanusConfig {
  constructor() {
    this.globalConfig = null;
  }

  /**
   * Set global configuration (similar to galaxy3's GxyJanus.setGlobalConfig)
   * @param {Object} config - Configuration object
   */
  setGlobalConfig(config) {
    this.globalConfig = config;
  }

  /**
   * Get instance config for a specific gateway
   * @param {string} gatewayName - Gateway name
   * @returns {Object} Config with url, iceServers, token
   */
  instanceConfig(gatewayName) {
    if (!this.globalConfig) {
      return this.getDefaultConfig(gatewayName);
    }

    let gateway = null;
    
    // Look for gateway in streaming gateways
    if (this.globalConfig.gateways && this.globalConfig.gateways.streaming) {
      gateway = this.globalConfig.gateways.streaming[gatewayName];
    }

    if (!gateway) {
      // Fallback to default
      return this.getDefaultConfig(gatewayName);
    }

    const iceServers = [];
    if (this.globalConfig.ice_servers && this.globalConfig.ice_servers.streaming) {
      iceServers.push(...this.globalConfig.ice_servers.streaming.map(url => ({ urls: url })));
    } else {
      // Default STUN server
      iceServers.push({ urls: DEFAULT_STUN_SERVER });
    }

    return {
      ...gateway,
      iceServers
    };
  }

  /**
   * Get default config when no global config is set
   * @param {string} gatewayName 
   */
  getDefaultConfig(gatewayName) {
    const serverUrl = process.env.REACT_APP_JANUS_SRV_STR || "";
    const stunServer = process.env.REACT_APP_STUN_SRV_STR || DEFAULT_STUN_SERVER;

    return {
      name: gatewayName || "str",
      url: serverUrl,
      type: "streaming",
      token: "",
      iceServers: [{ urls: stunServer }]
    };
  }

  /**
   * Get list of gateway names for a type
   * @param {string} type - Gateway type (e.g., "streaming")
   * @returns {string[]} Array of gateway names
   */
  gatewayNames(type = "streaming") {
    if (!this.globalConfig || !this.globalConfig.gateways) {
      return ["str"]; // Default gateway name
    }

    const gateways = this.globalConfig.gateways[type];
    if (!gateways) {
      return ["str"];
    }

    return Object.keys(gateways);
  }

  /**
   * Get a random gateway for a type (for load balancing)
   * @param {string} type 
   * @returns {string} Gateway name
   */
  getRandomGateway(type = "streaming") {
    const gateways = this.gatewayNames(type);
    return gateways[Math.floor(Math.random() * gateways.length)];
  }
}

const defaultJanusConfig = new JanusConfig();

export default defaultJanusConfig;
