import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import englishTranslation from './assets/translations/en.json';
import spanishTranslation from './assets/translations/es.json';
import ukrainianTranslation from './assets/translations/uk.json';
import { enFlag, esFlag, ukFlag } from './assets/images';

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
  [Languages.EN]: { originalName: 'English', image: `${enFlag}` },
  [Languages.UK]: {
    originalName: 'Українська',
    image: `${ukFlag}`,
  },
  [Languages.ES]: {
    originalName: 'Español',
    image: `${esFlag}`,
  },
};

i18n.use(initReactI18next).init({
  fallbackLng: Languages.EN,
  lng: Languages.EN,
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
