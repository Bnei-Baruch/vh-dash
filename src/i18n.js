import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./translations/en.json";
import ru from "./translations/ru.json";
import he from "./translations/he.json";
import es from "./translations/es.json";

const HTML_LANGS = { en: "en", ru: "ru", es: "es", he: "he" }; // app language → <html lang>, as in index.html

const resources = {
  en, //English
  ru, //Russian
  he, //Hebrew
  es, //Spanish
};

const lng =
  process.env.REACT_APP_LANGUAGE || localStorage.getItem("i18nextLng") || "en";

i18next
  .use(initReactI18next) // Passes i18n down to react-i18next
  .use(LanguageDetector)
  .on("languageChanged", (l) => { const h = HTML_LANGS[l.split("-")[0]]; document.documentElement.lang = typeof h === "string" ? h : "en"; }) // CookieYes picks its banner language from <html lang>
  .init({
    detection: {
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
      lookupQuerystring: "lang",
      order: ["querystring", "localStorage", "header"],
    },
    fallbackLng: lng,
    resources,
    interpolation: {
      escapeValue: false,
    },
    react: {
      transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p", "ul", "li"],
    },
  });

export default resources;
