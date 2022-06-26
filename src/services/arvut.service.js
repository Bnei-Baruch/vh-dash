import axios from "axios";

export const getArvutStatus = (keycloakId) => {
  return axios
    .get(
      `${window.APP_CONFIG.VH_API_BASE_URL}/profile/v1/requests?kid=${keycloakId}`
    )
    .then((res) => res.data.data);
};

export const requestAccessToArvut = (body) => {
  return axios
    .post(`${window.APP_CONFIG.VH_API_BASE_URL}/profile/v1/request`, body)
    .then((res) => res.data);
};
