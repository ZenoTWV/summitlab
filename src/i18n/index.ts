import nl from './locales/nl.json';
import en from './locales/en.json';

const translations: Record<string, typeof nl> = { nl, en };

type TranslationValue = string | Record<string, unknown>;

export function getI18n(locale: string | undefined) {
  const lang = locale || 'nl';
  const t = translations[lang] || translations.nl;

  return function translate(key: string): string {
    const keys = key.split('.');
    let value: TranslationValue = t;

    for (const k of keys) {
      if (typeof value === 'object' && value !== null && k in value) {
        value = (value as Record<string, TranslationValue>)[k];
      } else {
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };
}

export function getLocales() {
  return Object.keys(translations);
}

export function getDefaultLocale() {
  return 'nl';
}
