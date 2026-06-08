window.APP_CONFIG = {
  SHORT_SHA: '{{env.Getenv "SHORT_SHA" "-"}}',
  VH_API_BASE_URL: '{{env.Getenv "VH_API_BASE_URL" "https://api.eurokab.info"}}',
  BASE_STATIC_PATH: "/static",
  PROFILE_URL: '{{env.Getenv "KEYCLOAK_PROFILE_URL" "https://api.eurokab.info/profile/v1/profile"}}',
  KEYCLOAK_CONFIG: {
    realm: '{{env.Getenv "KEYCLOAK_REALM" "master"}}',
    url: '{{env.Getenv "KEYCLOAK_URL" "https://auth.2serv.eu/auth/"}}',
    clientId: '{{env.Getenv "KEYCLOAK_CLIENT_ID" "membership_pay_dev"}}',
  },
  GLASSIX_API_KEY: '{{env.Getenv "GLASSIX_API_KEY" ""}}',
  STUDY_MATERIALS_WIDGET_URL: '{{env.Getenv "STUDY_MATERIALS_WIDGET_URL" "https://study.kli.one/widget/widget.js"}}',
  STUDY_MATERIALS_API_URL: '{{env.Getenv "STUDY_MATERIALS_API_URL" "https://study.kli.one/"}}',
  MQTT_URL: '{{env.Getenv "REACT_APP_MQTT_URL" "msg.kab.info"}}',
  MSG_URL: '{{env.Getenv "REACT_APP_MSG_URL" "msg.kab.sh"}}',
  JANUS_SRV_STR: '{{env.Getenv "REACT_APP_JANUS_SRV_STR" "https://str1.kab.sh/janusgxy"}}',
  STRDB_BACKEND: '{{env.Getenv "REACT_APP_STRDB_BACKEND" "https://strdb.kab.sh/"}}',
  STUN_SRV_STR: '{{env.Getenv "REACT_APP_STUN_SRV_STR" "stun:stun1.kab.sh:3478"}}',
  ENABLE_MOCK_MEMBERSHIP: '{{env.Getenv "REACT_APP_ENABLE_MOCK_MEMBERSHIP" "false"}}'
};
