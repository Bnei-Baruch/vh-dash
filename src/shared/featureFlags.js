/**
 * Get debug user keycloak ID from URL parameter
 * Used for testing different users' data without logging in as them
 *
 * @returns {string|null} Debug user keycloak ID or null if not set
 */
export const getDebugUser = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const debugUser = urlParams.get("debug_user");

  if (debugUser) {
    console.warn('[Debug Mode] Using debug_user:', debugUser);
    console.warn('[Debug Mode] This should ONLY be used in development!');
  }

  return debugUser;
};

/**
 * Get forced pricing version from URL parameter
 * Used to override backend pricing version determination for testing
 *
 * @returns {string|null} Pricing version (v1, v2, t1) or null if not set (backend decides)
 *
 * Note: null (default) means backend determines pricing automatically (recommended approach)
 */
export const getForcedPricingVersion = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const version = urlParams.get("pricing_version");

  if (version) {
    console.warn('[Debug Mode] Forcing pricing_version:', version);
    console.warn('[Debug Mode] This overrides backend pricing logic!');
  }

  return version;
};
