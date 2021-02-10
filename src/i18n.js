import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import eng from './translations/eng.json';
import rus from './translations/rus.json';
import heb from './translations/heb.json';
import spa from './translations/spa.json';

const resources = {
  eng, //English
  rus, //Russian
  heb, //Hebrew
  spa, //Spanish
};

const lng = process.env.REACT_APP_LANGUAGE || 'eng';

i18next
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    // Default language
    lng,

    interpolation: {
      escapeValue: false,
    },
    react: {
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'ul', 'li'],
    },
  });

export default resources;
