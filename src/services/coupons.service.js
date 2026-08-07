import axios from "axios";

// The member's own coupon redemptions (keycloak comes from the auth token,
// attached by the global axios interceptor). Dates are inclusive Asia/Jerusalem
// "YYYY-MM-DD" strings — no timezone handling needed on the client.
export const getMyCoupons = () =>
  axios
    .get(`${window.APP_CONFIG.VH_API_BASE_URL}/pay/v2/coupon/mine`)
    .then((res) => res.data.data);
