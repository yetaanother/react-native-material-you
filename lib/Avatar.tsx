import React, { FunctionComponent, useContext } from "react";
import { SchemeAdapter } from "./providers/SchemeAdapter";
import { StyleSheet, Text, ViewStyle } from "react-native";
import { ThemeContext } from "./providers/ThemeProvider";

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

const createStyles = (scheme: SchemeAdapter) =>
  StyleSheet.create({
    avatar: {
      width: 40,
      height: 40,
      backgroundColor: scheme.primaryHex,
      borderRadius: 100,
      color: scheme.surfaceHex,
      textAlign: "center",
      textAlignVertical: "center",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "500",
      letterSpacing: 0.1,
    },
  });
