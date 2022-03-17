import {
  RECEIVE_HEARTBEAT,
  RECEIVE_STREAMS,
  CHANGE_BITRATE,
  CHANGE_VOLUME,
  CHANGE_LANGUAGE,
} from "../constants";

const initialState = {
  streams: {},
  languages: {},
  selectedBitrate: localStorage.getItem("live.selectedBitrate") || 500,
  selectedVolume: localStorage.getItem("live.selectedVolume") || 80,
  selectedLanguage: localStorage.getItem("live.selectedLanguage") || "eng",
};

const streamReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      localStorage.setItem("live.selectedLanguage", action.lang);
      return {
        ...state,
        selectedLanguage: action.lang,
      };
    case CHANGE_BITRATE:
      localStorage.setItem("live.selectedBitrate", action.bitrate);
      return {
        ...state,
        selectedBitrate: action.bitrate,
      };
    case CHANGE_VOLUME:
      localStorage.setItem("live.selectedVolume", action.volume);
      return {
        ...state,
        selectedVolume: action.volume,
      };
    case RECEIVE_HEARTBEAT:
      return {
        ...state,
        languages: action.data.Languages,
        broadcast: action.data.Broadcast,
      };
    case RECEIVE_STREAMS:
      const streams = new Map(
        action.data.Streams.map((item) => {
          const hls = item.hlsUrl,
            rtmp = item.netUrl + "/" + item.streamName;
          return [item.bitRate, { hls, rtmp }];
        })
      );
      return {
        ...state,
        streams: { [action.lang]: streams },
      };
    default:
      return state;
  }
};

export default streamReducer;
