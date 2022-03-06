import React, { FunctionComponent, useContext } from "react";
import { ColorScheme } from "./providers/ColorScheme";
import { StyleSheet, Text, ViewStyle } from "react-native";
import { ThemeContext } from "./providers/ThemeProvider";
import { M3Constants } from "./utils/M3Constants";

interface AvatarProps {
  initials?: string;
  containerStyle?: ViewStyle;
}

export const Avatar: FunctionComponent<AvatarProps> = ({
  initials,
  containerStyle,
}) => {
  const { scheme } = useContext(ThemeContext);
  const styles = createStyles(scheme);

  initials = !initials ? "A" : initials;

  const render = () => {
    return renderTextAvatar();
  };

  const renderTextAvatar = () => {
    return (
      <Text style={{ ...styles.avatar, ...containerStyle }}>{initials}</Text>
    );
  };

  return render();
};

const createStyles = (scheme: ColorScheme) =>
  StyleSheet.create({
    avatar: {
      width: 40,
      height: 40,
      backgroundColor: scheme.primaryHex,
      borderRadius: 100,
      color: scheme.surfaceHex,
      textAlign: "center",
      textAlignVertical: "center",
      ...M3Constants.titleMediumText,
    },
  });
