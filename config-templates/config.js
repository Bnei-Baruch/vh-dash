window.APP_CONFIG = {
    BASE_STATIC_PATH: "/static",
    PROFILE_URL: '{{env.Getenv "KEYCLOAK_PROFILE_URL" "https://api.eurokab.info/profile/v1/profile"}}',
    KEYCLOAK_CONFIG: {
        realm: '{{env.Getenv "KEYCLOAK_REALM" "master"}}',
        url: '{{env.Getenv "KEYCLOAK_URL" "https://auth.2serv.eu/auth/"}}',
        clientId: '{{env.Getenv "KEYCLOAK_CLIENT_ID" "membership_pay_dev"}}'
    }
};