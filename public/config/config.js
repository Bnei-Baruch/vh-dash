window.APP_CONFIG = {
    BASE_STATIC_PATH: "/static",
    PROFILE_URL: "https://api.eurokab.info/profile/v1/profile",
    KEYCLOAK_CONFIG: {
        realm: 'master',
        url: 'https://auth.2serv.eu/auth/',
        clientId: 'membership_pay_dev'
    },
    STUDY_MATERIALS_WIDGET_URL: "https://study.kli.one/widget/widget.js",
    STUDY_MATERIALS_API_URL: "https://study.kli.one/",
    MQTT_URL: " ",
    MSG_URL: " ",
    JANUS_SRV_STR: " ",
    STRDB_BACKEND: 'https://strdb.kab.sh/',
    STUN_SRV_STR: 'stun:stun1.kab.sh:3478',
    ENABLE_MOCK_MEMBERSHIP: 'false'
};