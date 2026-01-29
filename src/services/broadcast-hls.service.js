import axios from "axios";

// Constants
const STREAMS_CACHE_KEY = "VH_STREAMS_CACHE";
const STREAMS_CACHE_TIMESTAMP_KEY = "VH_STREAMS_CACHE_TIMESTAMP";
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

// IMPORTANT:
// We intentionally create a separate axios instance without auth interceptors
// The app's global axios adds Authorization headers automatically,
// but the streams.kab.tv endpoint is public and rejects authenticated requests.
// Using the default axios would cause CORS errors.
const publicAxios = axios.create();

/**
 * Fetch streams JSON with caching
 * Returns streams data from cache if valid, otherwise fetches fresh data
 */
export const fetchStreamsJSON = async () => {
  // Check cache
  const cachedData = localStorage.getItem(STREAMS_CACHE_KEY);
  const cachedTimestamp = localStorage.getItem(STREAMS_CACHE_TIMESTAMP_KEY);

  if (cachedData && cachedTimestamp) {
    const cacheAge = Date.now() - parseInt(cachedTimestamp, 10);
    if (cacheAge < CACHE_DURATION_MS) {
      try {
        return JSON.parse(cachedData);
      } catch {
        localStorage.removeItem(STREAMS_CACHE_KEY);
        localStorage.removeItem(STREAMS_CACHE_TIMESTAMP_KEY);
      }
    }
  }

  // Fetch fresh data
  try {
    const response = await publicAxios.get("https://streams.kab.tv/live1.json");

    let data = response.data;

    // Cache the result
    localStorage.setItem(STREAMS_CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(STREAMS_CACHE_TIMESTAMP_KEY, Date.now().toString());

    return data;
  } catch (error) {
    console.error("Failed to fetch streams JSON:", error);
    // Fallback to expired cache if available
    if (cachedData) {
      try {
        return JSON.parse(cachedData);
      } catch {
        throw error;
      }
    }
    throw error;
  }
};

/**
 * Find default quality (360p if available, otherwise first)
 */
export const getDefaultQuality = (qualities) => {
  if (!qualities || qualities.length === 0) return null;
  const quality360p = qualities.find((q) => q.quiality === "360p" || q.quality === "360p");
  return quality360p || qualities[0];
};
