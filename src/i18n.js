import en from './translations/en.json';
import ru from './translations/ru.json';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Create configuration of language resources
const resources = {
  en,
  ru,
};

const lng = process.env.REACT_APP_LANGUAGE || 'en';

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
