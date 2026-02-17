
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
//   GLASSIX_API_KEY: 'glassix-api-key
// };

// production
// window.APP_CONFIG = {
//   VH_API_BASE_URL: 'https://api.kli.one',
//   PROFILE_URL: 'https://api.kli.one/profile/v1/profile',
//   KEYCLOAK_CONFIG: {
//     realm: 'main',
//     url: 'https://accounts.kab.info/auth/',
//     clientId: 'membership_pay',
//   },
//   GLASSIX_API_KEY: 'glassix-api-key'
// };

// local backend, production keycloak
window.APP_CONFIG = {
  VH_API_BASE_URL: 'http://localhost:9000',
  PROFILE_URL: 'http://localhost:9000/profile/v1/profile',
  KEYCLOAK_CONFIG: {
    realm: 'main',
    url: 'https://accounts.kab.info/auth/',
    clientId: 'membership_pay',
  },
  GLASSIX_API_KEY: 'glassix-api-key',
  STUDY_MATERIALS_WIDGET_URL: 'https://study.kli.one/widget/widget.js',
  STUDY_MATERIALS_API_URL: 'https://study.kli.one/'
<<<<<<< HEAD
};
=======
};
>>>>>>> master
