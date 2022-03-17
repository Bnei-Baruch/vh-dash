import axios from "axios";
import {
  CHANGE_BITRATE,
  CHANGE_VOLUME,
  REQUEST_STREAMS,
  RECEIVE_STREAMS,
  REQUEST_HEARTBEAT,
  RECEIVE_HEARTBEAT,
  CHANGE_LANGUAGE,
} from "../constants";

const API_URL = "https://kab.tv/live/api/";
const TIMEOUT = 10000;

export const changeLanguage = (lang) => {
  return {
    type: CHANGE_LANGUAGE,
    lang: lang,
  };
};

export const changeBitrate = (bitrate) => {
  return {
    type: CHANGE_BITRATE,
    bitrate: bitrate,
  };
};

export const changeVolume = (volume) => {
  return {
    type: CHANGE_VOLUME,
    volume: volume,
  };
};

const requestHeartbeat = (lang, bitrate) => {
  return {
    type: REQUEST_HEARTBEAT,
    lang: lang,
    bitrate: bitrate,
  };
};

export const receiveHeartbeat = (lang, bitrate, data) => {
  return {
    type: RECEIVE_HEARTBEAT,
    lang: lang,
    bitrate: bitrate,
    data: data,
  };
};

const requestStreams = (lang) => {
  return {
    type: REQUEST_STREAMS,
    lang: lang,
  };
};

export const receiveStreams = (lang, data) => {
  return {
    type: RECEIVE_STREAMS,
    lang: lang,
    data: data,
  };
};

// Backend api related stuff

const apiRequest = (path, payload) => {
  return axios.post(API_URL + path, payload, { timeout: TIMEOUT });
};

export const asyncHeartbeat = (lang, bitrate) => {
  console.log("Heartbeat:", lang, bitrate);
  return (dispatch) => {
    dispatch(requestHeartbeat(lang, bitrate));

    return apiRequest("heartbeat", { lang, bitrate }).then((res) => {
      console.log(res);
      return dispatch(receiveHeartbeat(lang, bitrate, res.body));
    });
  };
};

export const asyncFetchStreams = (lang) => {
  return (dispatch) => {
    dispatch(requestStreams(lang));

    return apiRequest("streams", { lang }).then((res) => {
      return dispatch(receiveStreams(lang, res));
    });
  };
};
