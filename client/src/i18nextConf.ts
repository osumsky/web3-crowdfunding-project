import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import englishTranslation from './assets/translations/en.json';
import spanishTranslation from './assets/translations/es.json';
import ukrainianTranslation from './assets/translations/uk.json';

// !!! DO NOT FORGET TO IMPORT this file in App.tsx or main.tsx

enum LanguagesType {
  EN = 'en',
  UK = 'uk',
  ES = 'es',
}

const languages = {
  [LanguagesType.EN]: 'English',
  [LanguagesType.UK]: 'Українська',
  [LanguagesType.ES]: 'Español',
};

i18n.use(initReactI18next).init({
  fallbackLng: LanguagesType.EN,
  lng: LanguagesType.UK,

  resources: {
    [LanguagesType.EN]: {
      translation: englishTranslation,
    },
    [LanguagesType.ES]: {
      translation: spanishTranslation,
    },
    [LanguagesType.UK]: {
      translation: ukrainianTranslation,
    },
  },
});

export default i18n;
