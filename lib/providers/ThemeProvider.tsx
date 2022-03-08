import React, { createContext, FunctionComponent, ReactElement } from "react";
import { argbFromHex, Scheme } from "@material/material-color-utilities/dist";
import { ColorScheme } from "./ColorScheme";
import { Shadows } from "./Shadows";

const googleDefaultThemeHex = "#6650a4";
const defaultLightScheme = ColorScheme.from(
  Scheme.light(argbFromHex(googleDefaultThemeHex))
);
const defaultShadows = Shadows.default(defaultLightScheme);
export const ThemeContext = createContext({
  scheme: defaultLightScheme,
  shadows: defaultShadows,
});

interface ThemeProviderProps {
  dark?: boolean;
  hexColor?: string;
  children?: ReactElement;
  shadowsFn?: (scheme: ColorScheme) => Shadows;
}

export const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({
  children,
  dark,
  hexColor,
  shadowsFn,
}) => {
  hexColor = !!hexColor ? hexColor : googleDefaultThemeHex;
  const scheme = !dark
    ? Scheme.light(argbFromHex(hexColor))
    : Scheme.dark(argbFromHex(hexColor));
  const colorScheme = ColorScheme.from(scheme);
  const shadows = shadowsFn
    ? shadowsFn(colorScheme)
    : Shadows.default(colorScheme);
  return (
    <ThemeContext.Provider
      value={{
        scheme: colorScheme,
        shadows,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
