import { IMAGE_URL } from "../shared/constants";

// Map full language names directly to flag country codes (2-letter codes)
// This is the only conversion needed: language name → flag code
const languageNameToFlagCode = Object.freeze({
  Arabic: "sa",
  Bulgarian: "bg",
  Chinese: "cn",
  Croatian: "hr",
  Dutch: "nl",
  English: "en",
  French: "fr",
  Georgian: "ge",
  German: "de",
  Hebrew: "he",
  Hungarian: "hu",
  Italian: "it",
  Japanese: "jp",
  Latvian: "lv",
  Lithuanian: "lt",
  Norwegian: "no",
  Polish: "pl",
  Portuguese: "pt", 
  Romanian: "ro",
  Russian: "ru",
  Slovene: "si",
  Spanish: "es",
  Swedish: "se",
  Turkish: "tr",
  Ukrainian: "ua",
});

/**
 * Get flag URL for a full language name
 * Converts language name (e.g., "Hebrew") directly to flag URL
 * @param {string} langName - Full language name (e.g., "Hebrew", "English")
 * @returns {string|null} - Flag URL or null if not found
 */
export const getFlag = (langName) => {
  if (!langName) return null;
  
  const flagCode = languageNameToFlagCode[langName];
  if (!flagCode) return null;
  
  let flagPath = IMAGE_URL;
  if (process.env.NODE_ENV === 'development' && IMAGE_URL === '/static') {
    flagPath = '/dash/static';
  }
  return `${flagPath}/img/flags/${flagCode}.png`;
};

// Handle flag image error - hide the flag if it fails to load
export const handleFlagError = (e) => {
  e.target.style.display = "none";
};

