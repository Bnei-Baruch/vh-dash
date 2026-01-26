import { getCountryCode } from "./index";
import { IMAGE_URL } from "../shared/constants";

// Map language names to language codes
const languageNameToCode = {
  "Arabic": "ara",
  "Bulgarian": "bul",
  "Chinese": "chn",
  "Croatian": "hrv",
  "Dutch": "dut",
  "English": "eng",
  "French": "fre",
  "Georgian": "geo",
  "German": "ger",
  "Hebrew": "heb",
  "Hungarian": "hun",
  "Italian": "ita",
  "Japanese": "jpn",
  "Latvian": "lav",
  "Lithuanian": "lit",
  "Norwegian": "nor",
  "Polish": "pol",
  "Portuguese": "por",
  "Romanian": "rum",
  "Russian": "rus",
  "Slovene": "slv",
  "Spanish": "spa",
  "Swedish": "swe",
  "Turkish": "tur",
  "Ukrainian": "ukr",
};

// Map language codes to country codes for flags
const getFlagCode = (langCode) => {
  if (!langCode) return null;
  
  const flagMappings = {
    "ara": "sa",
    "chn": "cn",
    "eng": "en",
    "bul": "bg",
    "hrv": "hr",
    "dut": "nl",
    "fre": "fr",
    "geo": "ge",
    "ger": "de",
    "heb": "he",
    "hun": "hu",
    "ita": "it",
    "jpn": "jp",
    "lav": "lv",
    "lit": "lt",
    "nor": "no",
    "pol": "pl",
    "por": "pt",
    "rum": "ro",
    "rus": "ru",
    "slv": "si",
    "spa": "es",
    "swe": "se",
    "tur": "tr",
    "ukr": "ua",
  };
  
  if (flagMappings[langCode]) {
    return flagMappings[langCode];
  }
  
  const standardCode = getCountryCode(langCode);
  if (standardCode && standardCode !== "en") {
    return standardCode;
  }
  
  return null;
};

// Get language code from language name
export const getLanguageCode = (langName) => {
  return languageNameToCode[langName] || null;
};

// Find language name by code
export const findLanguageNameByCode = (code) => {
  return Object.keys(languageNameToCode).find(
    (name) => languageNameToCode[name] === code
  ) || null;
};

// Get flag URL for a language name
export const getFlag = (langName) => {
  const langCode = languageNameToCode[langName];
  const flagCode = langCode ? getFlagCode(langCode) : null;
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

