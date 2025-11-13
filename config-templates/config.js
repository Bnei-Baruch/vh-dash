window.APP_CONFIG = {
  BUILD_TIME: "{{ (time.Now).UTC }}",
  REG_BRANCH: '{{env.Getenv "CI_COMMIT_REF_NAME" "-"}}',
  REF_VERSION: '{{env.Getenv "CI_COMMIT_SHA" "-"}}',
  VH_API_BASE_URL: '{{env.Getenv "VH_API_BASE_URL" "https://api.eurokab.info"}}',
  BASE_STATIC_PATH: "/static",
  PROFILE_URL: '{{env.Getenv "KEYCLOAK_PROFILE_URL" "https://api.eurokab.info/profile/v1/profile"}}',
  KEYCLOAK_CONFIG: {
    realm: '{{env.Getenv "KEYCLOAK_REALM" "master"}}',
    url: '{{env.Getenv "KEYCLOAK_URL" "https://auth.2serv.eu/auth/"}}',
    clientId: '{{env.Getenv "KEYCLOAK_CLIENT_ID" "membership_pay_dev"}}',
  },
  GLASSIX_API_KEY: '{{env.Getenv "GLASSIX_API_KEY" ""}}',
  STUDY_MATERIALS_API_URL: '{{env.Getenv "STUDY_MATERIALS_API_URL" "https://stmat.kab.sh/api/units"}}'
};
