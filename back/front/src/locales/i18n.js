import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "./en/translation.json";
import translationKo from "./ko/translation.json";
import translationJa from "./ja/translation.json";
const resources = {
  en: {
    translation: translationEn
  },
  ko: {
    translation: translationKo
  },
  ja: {
    translation: translationJa
  }
};
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: navigator.language.split('-')[0], 
    fallbackLng: "en", 
    supportedLngs: ['ko', 'en', 'ja'],
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false  
    }
  });
export default i18n;
