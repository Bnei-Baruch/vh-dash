
// staging
// window.APP_CONFIG = {
//     PROFILE_URL: "https://api.eurokab.info/profile/v1/profile",
//     VH_BASE_URL: "https://eurokab.info",
//     VH_API_BASE_URL: "https://api.eurokab.info",
//     KEYCLOAK_CONFIG: {
//         realm: 'master',
//         url: 'https://auth.2serv.eu/auth/',
//         clientId: 'membership_pay_dev'
//     },
//   GLASSIX_API_KEY: 'glassix-api-key',
//   STUDY_MATERIALS_API_URL: 'https://stmat.kab.sh/api/units'
// };

// production
window.APP_CONFIG = {
  VH_API_BASE_URL: 'https://api.kli.one',
  PROFILE_URL: 'https://api.kli.one/profile/v1/profile',
  KEYCLOAK_CONFIG: {
    realm: 'main',
    url: 'https://accounts.kab.info/auth/',
    clientId: 'membership_pay',
  },
  GLASSIX_API_KEY: 'glassix-api-key',
  STUDY_MATERIALS_API_URL: 'https://stmat.kab.sh/api/units',
  MQTT_URL: 'msg.kab.info',
  MSG_URL: 'msg.kab.sh',
  JANUS_SRV_STR: 'https://str1.kab.sh/janusgxy',
  STRDB_BACKEND: 'https://strdb.kab.sh/',
  STUN_SRV_STR: 'stun:stun1.kab.sh:3478',
  ENABLE_MOCK_MEMBERSHIP: 'true'
};

// local backend, production keycloak
// window.APP_CONFIG = {
//   VH_API_BASE_URL: 'http://localhost:9000',
//   PROFILE_URL: 'http://localhost:9000/profile/v1/profile',
//   KEYCLOAK_CONFIG: {
//     realm: 'main',
//     url: 'https://accounts.kab.info/auth/',
//     clientId: 'membership_pay',
//   },
//   GLASSIX_API_KEY: 'glassix-api-key',
//   STUDY_MATERIALS_API_URL: 'https://stmat.kab.sh/api/units'
// };
