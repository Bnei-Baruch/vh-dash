window.APP_CONFIG = {
    BASE_STATIC_PATH: "/static",
    PROFILE_URL: "https://api.eurokab.info/profile/v1/profile",
    KEYCLOAK_CONFIG: {
        realm: 'master',
        url: 'https://auth.2serv.eu/auth/',
        clientId: 'membership_pay_dev'
    },
    STUDY_MATERIALS_API_URL: "https://stmat.kab.sh/api/units",
    MQTT_URL: '',
    MSG_URL: '',
    JANUS_SRV_STR: '',
    STRDB_BACKEND: 'https://kab.tv/live/api/',
    STUN_SRV_STR: 'stun:stun.l.google.com:19302',
    ENABLE_MOCK_MEMBERSHIP: 'false'
};