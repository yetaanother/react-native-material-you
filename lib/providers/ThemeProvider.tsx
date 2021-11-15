import React, { createContext, FunctionComponent, ReactElement } from "react";
import { Scheme } from "../material-color-utilities/scheme/scheme";
import { intFromHex } from "../material-color-utilities/utils/color_utils";
import { SchemeAdapter } from "./SchemeAdapter";
import { Settings } from "./Settings";

const coreLightScheme = SchemeAdapter.from(Scheme.light(intFromHex("#6650a4")));
const defaultSettings = Settings.default(coreLightScheme);
export const ThemeContext = createContext({
  scheme: coreLightScheme,
  settings: defaultSettings,
});

interface ThemeProviderProps {
  dark?: boolean;
  hexColor: string;
  children?: ReactElement;
  settingsFn?: (scheme: SchemeAdapter) => Settings;
}

export const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({
  children,
  dark,
  hexColor,
  settingsFn,
}) => {
  const scheme = !dark
    ? Scheme.light(intFromHex(hexColor))
    : Scheme.dark(intFromHex(hexColor));
  const schemeAdapter = SchemeAdapter.from(scheme);
  const settings = settingsFn
    ? settingsFn(schemeAdapter)
    : Settings.default(schemeAdapter);
  return (
    <ThemeContext.Provider
      value={{
        scheme: schemeAdapter,
        settings,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
