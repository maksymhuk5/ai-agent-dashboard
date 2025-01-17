import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const SUPPORTED_LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' },
    { code: 'ru', name: 'Русский' },
    { code: 'zh', name: '中文' }
];

i18n
    .use(initReactI18next)
    .init({
        resources: SUPPORTED_LANGUAGES.reduce((acc, lang) => {
            try {
                acc[lang.code] = {
                    translation: require(`./locales/${lang.code}.json`)
                };
            } catch (error) {
                // If language file not found, use English as fallback
                acc[lang.code] = {
                    translation: require('./locales/en.json')
                };
            }
            return acc;
        }, {}),
        lng: "en", // default language
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;