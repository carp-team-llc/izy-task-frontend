export interface Theme {
  background: string,
  background2: string,
  primaryBtn: string,
  primaryTxt: string,
}

export const COLOR_KEYS_DARK: Theme = {
  background: "#05051F",
  background2: "#0F0F35",
  primaryBtn: "#7260E6",
  primaryTxt: "#FFFFFF",
}

export const COLOR_KEYS_LIGHT: Theme = {
  background: "#FFFFFF",
  background2: "#F0F0F5",
  primaryBtn: "#7260E6",
  primaryTxt: "#000000",
}

export const getTheme = (isDarkMode: boolean): Theme => {
  return isDarkMode ? COLOR_KEYS_DARK : COLOR_KEYS_LIGHT;
};
