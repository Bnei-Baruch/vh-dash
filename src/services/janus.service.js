import axios from "axios";
import janusConfig from "../shared/janus-config";
import log from "loglevel";

// Normalize API URL - remove trailing slash and add it when needed
const getApiUrl = () => {
  const url = (window.APP_CONFIG && window.APP_CONFIG.STRDB_BACKEND) || "https://kab.tv/live/api/";
  return url.endsWith('/') ? url.slice(0, -1) : url;
};

const API_URL = getApiUrl();
const TIMEOUT = 10000;


/**
 * Service for Janus Gateway configuration and stream management
 */
class JanusService {
  /**
   * Fetch streaming server configuration from backend
   * @param {Object} user - User object
   * @returns {Promise<Object>} Server configuration
   */
  async fetchStreamingServer(user) {
    try {
      // Try different possible endpoints
      // In galaxy3, the endpoint is /server (not /streaming-server)
      const endpoints = [
        `${API_URL}/server`,           // galaxy3 style: /server
        `${API_URL}/streaming-server`, // alternative: /streaming-server
        `${API_URL}/api/server`,        // with /api prefix
      ];
      
      let lastError = null;
      for (const endpoint of endpoints) {
        try {
          const response = await axios.post(
            endpoint,
            { userId: user.id },
            { timeout: TIMEOUT }
          );
          log.info(`[janus-service] Successfully fetched from: ${endpoint}`);
          log.debug(`[janus-service] Server config response:`, JSON.stringify(response.data, null, 2));
          return response.data;
        } catch (err) {
          lastError = err;
          // If 404, try next endpoint
          if (err.response?.status === 404) {
            log.debug(`[janus-service] Endpoint ${endpoint} returned 404, trying next...`);
            continue;
          }
          // For other errors, throw immediately
          throw err;
        }
      }
      
      // If all endpoints failed, throw last error
      throw lastError;
    } catch (error) {
      log.error("[janus-service] Error fetching streaming server:", error);
      log.info("[janus-service] Using fallback default config");
      // Fallback to default config
      return this.getDefaultServerConfig();
    }
  }

  /**
   * Get default server configuration
   * @returns {Object} Default server config
   */
  getDefaultServerConfig() {
    // JANUS_SRV_STR can be either:
    // 1. A gateway name (e.g., "str") - used for MQTT topics
    // 2. A URL (e.g., "janus.example.com") - used for Janus connection
    // If it looks like a URL (contains dots or starts with http), extract name from it
    const janusSrvStr = (window.APP_CONFIG && window.APP_CONFIG.JANUS_SRV_STR) || "str";
    
    // If it's a URL, use "str" as default gateway name (for MQTT topics)
    // Otherwise, use it as the gateway name
    const serverName = (janusSrvStr.includes(".") || janusSrvStr.startsWith("http")) 
      ? "str"  // Default gateway name for MQTT topics
      : janusSrvStr;  // Use as gateway name
    
    return {
      server: serverName,
      config: janusConfig.getDefaultConfig(serverName)
    };
  }

  /**
   * Initialize Janus global configuration
   * This should be called on app startup if you have a config API
   * @param {Object} config - Full Janus gateway configuration
   */
  setGlobalConfig(config) {
    janusConfig.setGlobalConfig(config);
  }

  /**
   * Get stream IDs for a language
   * Maps vh-dash language codes to Janus stream IDs
   * 
   * IMPORTANT NOTES:
   * - Video stream ID is the SAME for all languages (same video source)
   *   The video ID represents quality/resolution (1 = 360p, 11 = 240p, 16 = 720p)
   * 
   * - Audio stream ID is DIFFERENT for each language (different translators)
   *   These are SOURCE streams (main lesson broadcast), NOT workshop streams
   *   If a language has no translation, it falls back to Hebrew (ID 15) - the original
   * 
   * @param {string} langCode - Language code (e.g., "eng", "heb", "rus", "spa")
   * @returns {Object} { video: videoStreamId, audio: audioStreamId }
   */
  getStreamIdsForLanguage(langCode) {
    // Video stream ID - same for all languages (quality: 1 = 360p, 11 = 240p, 16 = 720p)
    const VIDEO_STREAM_ID = 1;
    
    // Audio stream IDs - Source streams from main lesson (galaxy3 sourceStream section)
    // Language codes match vh-dash language codes (from utils/index.js)
    const audioStreamMapping = {
      heb: 15,   // Hebrew (original)
      rus: 23,   // Russian
      eng: 24,   // English
      fre: 25,   // French
      spa: 26,   // Spanish
      ger: 27,   // German
      ita: 28,   // Italian
      tur: 42,   // Turkish
      por: 41,   // Portuguese
      bul: 43,   // Bulgarian
      geo: 44,   // Georgian
      rum: 45,   // Romanian
      hun: 46,   // Hungarian
      swe: 47,   // Swedish
      lit: 48,   // Lithuanian
      hrv: 49,   // Croatian
      jpn: 50,   // Japanese
      slv: 51,   // Slovenian
      pol: 52,   // Polish
      nor: 53,   // Norwegian
      lav: 54,   // Latvian
      ukr: 55,   // Ukrainian
      dut: 56,   // Dutch
      
      // Additional languages from galaxy3 (need vh-dash codes):
      // Chinese: 57, Amharic: 58, Hindi: 59, Persian: 60, Arabic: 62,
      // Indonesian: 63, Armenian: 65, Danish: 66, Estonian: 67,
      // Greek: 68, Tagalog: 69, Azerbaijani: 70
    };

    const audioStreamId = audioStreamMapping[langCode];
    
    // If language not found, fallback to Hebrew (original) - same as galaxy3 behavior
    if (audioStreamId === undefined) {
      log.warn(`[janus-service] No audio stream mapping for language: ${langCode}, using Hebrew (original)`);
      return {
        video: VIDEO_STREAM_ID,
        audio: audioStreamMapping.heb || 15  // Hebrew is the original source
      };
    }

    return {
      video: VIDEO_STREAM_ID,  // Same video for all languages
      audio: audioStreamId     // Different audio per language
    };
  }

  /**
   * Get stream IDs using a full language name (e.g. "English", "Russian")
   * as provided by useBroadcastStream / the streams JSON.
   * Maps full name → 3-letter code → stream IDs.
   *
   * @param {string} fullName - Full language name (e.g. "English", "Hebrew")
   * @returns {Object} { video: videoStreamId, audio: audioStreamId }
   */
  getStreamIdsForLanguageName(fullName) {
    const fullNameToCode = {
      Arabic: "ara",
      Bulgarian: "bul",
      Chinese: "chi",
      Croatian: "hrv",
      Dutch: "dut",
      English: "eng",
      French: "fre",
      Georgian: "geo",
      German: "ger",
      Hebrew: "heb",
      Hungarian: "hun",
      Italian: "ita",
      Japanese: "jpn",
      Latvian: "lav",
      Lithuanian: "lit",
      Norwegian: "nor",
      Polish: "pol",
      Portuguese: "por",
      Romanian: "rum",
      Russian: "rus",
      Slovene: "slv",
      Spanish: "spa",
      Swedish: "swe",
      Turkish: "tur",
      Ukrainian: "ukr",
    };

    const code = fullNameToCode[fullName];
    if (!code) {
      log.warn(`[janus-service] No language code mapping for: "${fullName}", using Hebrew (original)`);
      return this.getStreamIdsForLanguage("heb");
    }
    return this.getStreamIdsForLanguage(code);
  }
}

const janusService = new JanusService();
export default janusService;
