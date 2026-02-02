import axios from "axios";

// Constants
const STREAMS_STORAGE_KEY = "VH_STREAMS";
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes
const DEFAULT_QUALITY = "360p";

// IMPORTANT:
// We intentionally create a separate axios instance without auth interceptors
// The app's global axios adds Authorization headers automatically,
// but the streams.kab.tv endpoint is public and rejects authenticated requests.
// Using the default axios would cause CORS errors.
const publicAxios = axios.create();

/**
 * Fetch streams JSON with caching
 */
export const getStreams = async () => {
  // Check cache
  let cachedData = null;
  let cachedTimestamp = null;

  try {
    const cache = JSON.parse(localStorage.getItem(STREAMS_STORAGE_KEY));
    cachedData = cache?.data;
    cachedTimestamp = cache?.timestamp;
  } catch {
    localStorage.removeItem(STREAMS_STORAGE_KEY);
  }

  // Check if cache is valid
  if (cachedData && typeof cachedTimestamp === "number") {
    const cacheAge = Date.now() - cachedTimestamp;
    if (cacheAge < CACHE_DURATION_MS) {
      return cachedData;
    }
  }

  // Fetch fresh data
  try {
    const response = await publicAxios.get("https://streams.kab.tv/live1.json");

    let data = response.data;

    // Cache the result as a single object
    const cacheObject = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(STREAMS_STORAGE_KEY, JSON.stringify(cacheObject));

    return data;
  } catch (error) {
    // Fallback to expired cache if available
    if (cachedData) {
      return cachedData;
    }
    throw error;
  }
};

/**
 * Find default quality (360p if available, otherwise first)
 */
export const getDefaultQuality = (qualities) => {
  if (!Array.isArray(qualities) || qualities.length === 0) return null;
  const quality360p = qualities.find((q) => q.quality === DEFAULT_QUALITY);
  return quality360p || qualities[0];
};
