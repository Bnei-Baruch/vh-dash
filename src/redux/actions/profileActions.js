import axios from "axios";
import i18next from "i18next";
import {
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILED,
  TOGGLE_PROFILE_WINDOW,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
} from "../constants";

const apiProfile = (method, url, data, token) => {
  return axios[method](url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfile = (data) => {
  return (dispatch, getState) => {
    const { subject, token } = getState().userReducer.info.keycloak;
    const { isProfileExist } = getState().profileReducer;
    const patchURL = `${window.APP_CONFIG.PROFILE_URL}/${subject}`;

    const sendProfile = (method, url, data) => {
      return axios[method](url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    };

    isProfileExist
      ? sendProfile("patch", patchURL, data)
          .then((res) => {
            dispatch({
              type: UPDATE_PROFILE_SUCCESS,
              payload: i18next.t("Dashboard.Profile.profileUpdated"),
            });
            dispatch(fetchProfile());
            console.log("Success patch response:", res);
          })
          .catch((error) => {
            dispatch({
              type: UPDATE_PROFILE_FAILED,
              payload: i18next.t("Global.requestError"),
            });
            console.error("Failed patch response:", error);
          })
          .finally(() =>
            dispatch({ type: TOGGLE_PROFILE_WINDOW, payload: true })
          )
      : sendProfile("post", window.APP_CONFIG.PROFILE_URL, data)
          .then((res) => {
            dispatch(fetchProfile());
            console.log("Success post response:", res);
          })
          .catch((error) => {
            dispatch({
              type: UPDATE_PROFILE_SUCCESS,
              payload: i18next.t("Global.requestError"),
            });
            console.error("Failed post response:", error);
          });
  };
};

export const fetchProfile = () => {
  return (dispatch, getState) => {
    const { subject, token, profile } = getState().userReducer.info.keycloak;

    return axios
      .get(`${window.APP_CONFIG.PROFILE_URL}/${subject}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(
        ({ data }) => dispatch({ type: FETCH_PROFILE_SUCCESS, payload: data }),
        ({ message, response }) => {
          if (response && response.status === 404) {
            const data = {
              keycloak_id: subject,
              first_name_vernacular: profile.firstName,
              last_name_vernacular: profile.lastName,
              primary_email: profile.email,
            };

            apiProfile("post", window.APP_CONFIG.PROFILE_URL, data, token)
              .then((res) => {
                dispatch(fetchProfile());
                console.log("Success post response:", res);
              })
              .catch((error) => {
                dispatch({
                  type: UPDATE_PROFILE_FAILED,
                  payload: i18next.t("Global.requestError"),
                });
                console.error("Failed post response:", error);
              });
          } else {
            dispatch({ type: FETCH_PROFILE_FAILED, payload: message });
          }
        }
      );
  };
};
