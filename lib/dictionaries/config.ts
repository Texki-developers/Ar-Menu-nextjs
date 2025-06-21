import 'server-only';

const dictionaries = {
  en: () => import('./json/en.json').then(module => module.default),
  ar: () => import('./json/ar.json').then(module => module.default),
};

export const getDictionary = async (locale: ILocale) => dictionaries[locale]();

export type ILocale = 'en' | 'ar';
