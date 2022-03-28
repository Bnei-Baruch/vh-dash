import axios from "axios";

export const getEventsListWithParticipationDetail = (email) => {
  return axios
    .get(`${window.APP_CONFIG.VH_API_BASE_URL}/events/v1/events?email=${email}`)
    .then((res) => res.data);
};
