import React, { createContext, FunctionComponent, ReactElement } from "react";
import { argbFromHex, Scheme } from "@material/material-color-utilities/dist";
import { ColorScheme } from "./ColorScheme";
import { Shadows } from "./Shadows";

const coreLightScheme = ColorScheme.from(Scheme.light(argbFromHex("#6650a4")));
const defaultSettings = Shadows.default(coreLightScheme);
export const ThemeContext = createContext({
  scheme: coreLightScheme,
  settings: defaultSettings,
});

interface ThemeProviderProps {
  dark?: boolean;
  hexColor: string;
  children?: ReactElement;
  settingsFn?: (scheme: ColorScheme) => Shadows;
}

export const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({
  children,
  dark,
  hexColor,
  settingsFn,
}) => {
  const scheme = !dark
    ? Scheme.light(argbFromHex(hexColor))
    : Scheme.dark(argbFromHex(hexColor));
  const schemeAdapter = ColorScheme.from(scheme);
  const settings = settingsFn
    ? settingsFn(schemeAdapter)
    : Shadows.default(schemeAdapter);
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
