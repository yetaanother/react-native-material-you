import { createContext, FunctionComponent, ReactElement } from "react";
import { Scheme } from "./material-color-utilities/scheme/scheme";
import { intFromHex } from "./material-color-utilities/utils/color_utils";

export const coreLightScheme = Scheme.light(intFromHex("#6650a4"));

export const ThemeContext = createContext(coreLightScheme);

interface ThemeProviderProps {
  dark?: boolean;
  hexColor: string;
  children?: ReactElement;
}

export const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({
  children,
  dark,
  hexColor,
}) => {
  const scheme = !dark
    ? Scheme.light(intFromHex(hexColor))
    : Scheme.dark(intFromHex(hexColor));
  return (
    <ThemeContext.Provider value={scheme}>{children}</ThemeContext.Provider>
  );
};