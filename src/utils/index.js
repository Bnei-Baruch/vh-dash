export function setDirection(dir) {
  document.body.style.direction = dir;
}

// Map app language codes (i18nextLng) to full language names for broadcast streams
// Only includes the 4 languages supported by the app: he, en, ru, es
const appLanguageToFullName = {
  he: "Hebrew",
  en: "English",
  ru: "Russian",
  es: "Spanish",
};

/**
 * Convert app language code (2-letter, e.g., "he", "en") to full language name (e.g., "Hebrew", "English")
 * Used for converting i18nextLng to broadcast stream language names
 * @param {string} appLangCode - 2-letter app language code from i18nextLng (e.g., "he", "en", "ru", "es")
 * @returns {string|null} - Full language name or null if not found
 */
export function getLanguageNameFromAppCode(appLangCode) {
  if (!appLangCode) return null;
  const normalizedCode = appLangCode.toLowerCase();
  return appLanguageToFullName[normalizedCode] || null;
}
