export const ARVUT_URL = "https://arvut.kli.one";

export const GOOGLE_CALENDAR_API_KEY = process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY;
export const GOOGLE_CALENDAR_HE = process.env.REACT_APP_GOOGLE_CALENDAR_ID_HE;
export const GOOGLE_CALENDAR_RU = process.env.REACT_APP_GOOGLE_CALENDAR_ID_RU;
export const GOOGLE_CALENDAR_EN = process.env.REACT_APP_GOOGLE_CALENDAR_ID_EN;
export const GOOGLE_CALENDAR_ES = process.env.REACT_APP_GOOGLE_CALENDAR_ID_ES;

// Variables to toggle components
export const CHAT_AND_NOTIFICATION_ICONS =
    process.env.NODE_ENV === "development" ? false : false;
export const SEARCH_BAR =
  process.env.NODE_ENV === "development" ? false : false;

// Variable for the flag images located in src/img
export const IMAGE_URL = process.env.NODE_ENV === "development" ? "/static" : "/dash/static";
