export const THEME_CHANGE = "THEME_CHANGE";

export const themeChange = (theme: any) => {
  return {
    type: THEME_CHANGE,
    payload: theme,
  };
};

