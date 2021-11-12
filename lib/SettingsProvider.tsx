import React, { createContext, FunctionComponent } from "react";
import { Settings } from "./Settings";

export const SettingsContext = createContext(Settings.default());

interface SettingsProviderProps {
  settings: Settings;
}

export const SettingsProvider: FunctionComponent<SettingsProviderProps> = ({
  settings,
  children,
}) => {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};
