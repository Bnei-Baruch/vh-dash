import axios from "axios";

export const getArvutStatus = (keycloakId) => {
  return axios
    .get(`${window.APP_CONFIG.VH_API_BASE_URL}/v1/request?kid=${keycloakId}`)
    .then((res) => res.data);
};

export const requestAccessToArvut = (body) => {
  return axios
    .post(`${window.APP_CONFIG.VH_API_BASE_URL}/v1/request`, body)
    .then((res) => res.data);
};
