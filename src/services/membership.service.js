import axios from "axios";

export const getMembershipStatus = (email) => {
  return axios
    .get(`${window.APP_CONFIG.VH_API_BASE_URL}/pay/status/${email}`)
    .then((res) => res.data);
};

export const getMembershipStatusv2 = (email) => {
  let data = {
    active: false,
    user_id: "XXXXX",
    type: "new",
    month: 6,
    year: 2022,
    expiry: null,
    id: 1212312,
    created_at: "2022-10-10 14:00:49.319729+01",
    updated_at: "2022-10-10 14:00:49.319729+01",
    deleted_at: null,
    notifications: [
      {
        slug: "mb_new",
      },
    ],
  };
  return Promise.resolve(data);
};
