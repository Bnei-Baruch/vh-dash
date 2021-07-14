import axios from 'axios';
import i18next from 'i18next';
import { PROFILE_URL } from '../../shared/constants';
import {
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILED,
  TOGGLE_PROFILE_WINDOW,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
} from '../constants';

export const updateProfile = data => {
  return (dispatch, getState) => {
    const { subject, token } = getState().userReducer.info.keycloak;
    const { isProfileExist } = getState().profileReducer;
    const patchURL = `${PROFILE_URL}/${subject}`;

    const sendProfile = (method, url, data) => {
      return axios[method](url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    };

    isProfileExist
      ? sendProfile('patch', patchURL, data)
          .then(res => {
            dispatch({
              type: UPDATE_PROFILE_SUCCESS,
              payload: i18next.t('Dashboard.Profile.updatedProfile'),
            });
            console.log('Success patch response:', res);
          })
          .catch(error => {
            dispatch({
              type: UPDATE_PROFILE_FAILED,
              payload: i18next.t('Global.requestError'),
            });
            console.error('Failed patch response:', error);
          })
          .finally(() =>
            dispatch({ type: TOGGLE_PROFILE_WINDOW, payload: true }),
          )
      : sendProfile('post', PROFILE_URL, data)
          .then(res => console.log('Success post response:', res))
          .catch(error => {
            dispatch({
              type: UPDATE_PROFILE_SUCCESS,
              payload: i18next.t('Global.requestError'),
            });
            console.error('Failed post response:', error);
          });
  };
};

export const fetchProfile = () => {
  return (dispatch, getState) => {
    const { subject, token, profile } = getState().userReducer.info.keycloak;

    return axios
      .get(`${PROFILE_URL}/${subject}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(
        ({ data }) => dispatch({ type: FETCH_PROFILE_SUCCESS, payload: data }),
        ({ message, response }) => {
          if (response && response.status === 400) {
            const data = {
              first_name_latin: profile.firstName,
              last_name_latin: profile.lastName,
              country: 'Germany',
              gender: 'male',
              marital_status: 'Single',
              primary_email: profile.email,
              first_language: 'English',
              has_ten_group: 'No',
              wants_ten_group: 'Yes',
            };

            updateProfile(data);
          }

          dispatch({ type: FETCH_PROFILE_FAILED, payload: message });
        },
      );
  };
};
