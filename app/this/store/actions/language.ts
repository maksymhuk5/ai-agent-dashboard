export const LANGUAGE_CHANGE = 'LANGUAGE_CHANGE';

export const languageChange = (language: string) => ({
    type: LANGUAGE_CHANGE,
    payload: { language }
});