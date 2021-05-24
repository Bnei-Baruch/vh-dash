import i18next from 'i18next';

export const DAY_NAMES = [
  i18next.t('Global.Days.monday'),
  i18next.t('Global.Days.tuesday'),
  i18next.t('Global.Days.wednesday'),
  i18next.t('Global.Days.thursday'),
  i18next.t('Global.Days.friday'),
  i18next.t('Global.Days.saturday'),
  i18next.t('Global.Days.sunday'),
];
export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const ARVUT_URL = 'https://arvut.kli.one';
export const QUESTION_URL = 'https://qst.kli.one';

export const GOOGLE_CALENDAR_API_KEY =
  process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY;
export const GOOGLE_CALENDAR_HE = process.env.REACT_APP_GOOGLE_CALENDAR_ID_HE;
export const GOOGLE_CALENDAR_RU = process.env.REACT_APP_GOOGLE_CALENDAR_ID_RU;
export const GOOGLE_CALENDAR_EN = process.env.REACT_APP_GOOGLE_CALENDAR_ID_EN;
export const GOOGLE_CALENDAR_ES = process.env.REACT_APP_GOOGLE_CALENDAR_ID_ES;

// Variables to toggle components
export const CHAT_AND_NOTIFICATION_ICONS =
  process.env.NODE_ENV === 'development' ? false : false;
export const SEARCH_BAR =
  process.env.NODE_ENV === 'development' ? false : false;
