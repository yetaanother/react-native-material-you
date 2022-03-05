import React, {createContext, FunctionComponent, ReactElement} from "react";
import {argbFromHex, Scheme} from "@material/material-color-utilities/dist";
import {SchemeAdapter} from "./SchemeAdapter";
import {Settings} from "./Settings";

const coreLightScheme = SchemeAdapter.from(Scheme.light(argbFromHex("#6650a4")));
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
    ? Scheme.light(argbFromHex(hexColor))
    : Scheme.dark(argbFromHex(hexColor));
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
