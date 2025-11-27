import axios from "axios";

export const getMembershipStatusV2 = (kc_id) => {

    if (process.env.NODE_ENV === "development" || window.location.hostname === "localhost") {
        console.warn("[membership.service] Development mode: Returning mock active membership");
        return Promise.resolve({ active: true });
    }
    
    return axios
        .get(`${window.APP_CONFIG.VH_API_BASE_URL}/profile/v1/membership/kcid/${kc_id}`)
        .then((res) => {
            return res.data.data
        }).catch(err => {
            if (err?.response?.status === 404) {
                return {} // 404 means no membership info. That's fine
            } else {
                return {"error": err.toJSON()} // we got some unexpected error
            }
        });
}
