import React, { FunctionComponent, useContext } from "react";
import { SchemeAdapter } from "./SchemeAdapter";
import { ImageSourcePropType, StyleSheet, Text } from "react-native";
import { ThemeContext } from "./ThemeProvider";

interface AvatarProps {
  imageSrc?: ImageSourcePropType;
  initials?: string;
}

export const Avatar: FunctionComponent<AvatarProps> = ({
  imageSrc,
  initials,
}) => {
  const scheme = useContext(ThemeContext);
  const styles = createStyles(scheme);

  initials = !initials ? "A" : initials;

  const render = () => {
    if (imageSrc) {
      return renderImageAvatar();
    }
    return renderTextAvatar();
  };

  const renderTextAvatar = () => {
    return <Text style={{ ...styles.avatar }}>{initials}</Text>;
  };

  const renderImageAvatar = () => {
    // todo implement
    return <></>;
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
      // todo this should be passed from parent
      marginRight: 16,
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "500",
      letterSpacing: 0.1,
    },
  });
