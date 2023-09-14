import axios from "axios";

export const getUserPreviousPayments = (email) => {
  return axios
    .get(`${window.APP_CONFIG.VH_API_BASE_URL}/pay/payments/all/${email}`)
    .then((res) => res.data.data);
};


