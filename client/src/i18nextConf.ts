import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import englishTranslation from './assets/translations/en.json';
import spanishTranslation from './assets/translations/es.json';
import ukrainianTranslation from './assets/translations/uk.json';

// !!! DO NOT FORGET TO IMPORT this file in App.tsx or main.tsx

// the elements like placeholder (input fields) dont accept null
declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

export enum Languages {
  EN = 'en',
  UK = 'uk',
  ES = 'es',
}

export type LanguageType = {
  [key in Languages]: { originalName: string; image: string };
};
export const availableLanguages: LanguageType = {
  [Languages.EN]: { originalName: 'English', image: '/src/assets/images/en.png' },
  [Languages.UK]: { originalName: 'Українська', image: '/src/assets/images/uk.png' },
  [Languages.ES]: { originalName: 'Español', image: '/src/assets/images/es.png' },
};

i18n.use(initReactI18next).init({
  fallbackLng: Languages.EN,
  lng: Languages.ES,
  returnNull: false,

  resources: {
    [Languages.EN]: {
      translation: englishTranslation,
    },
    [Languages.ES]: {
      translation: spanishTranslation,
    },
    [Languages.UK]: {
      translation: ukrainianTranslation,
    },
  },
});

export default i18n;
