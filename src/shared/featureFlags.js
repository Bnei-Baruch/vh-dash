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
