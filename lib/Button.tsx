import React, { FunctionComponent } from "react";
import {
  Platform,
  Pressable as NativePressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface ButtonProps {
  theme?: "light" | "dark";
  type?: "filled" | "outlined" | "text" | "elevated" | "tonal";
  icon?: any;
  state?: "enabled" | "hovered" | "focused" | "pressed" | "disabled";
  title: string;
  onPress: () => void;
}

export const Button: FunctionComponent<ButtonProps> = ({
  theme,
  type,
  icon,
  state,
  title,
  onPress,
}: ButtonProps) => {
  state = !state ? "enabled" : state;
  type = !type ? "filled" : type;
  theme = !theme ? "light" : theme;

  const render = () => {
    let buttonStyles = { ...styles.button };
    if (state === "disabled") {
      buttonStyles = { ...buttonStyles, ...styles.buttonDisabled };
    } else if (state === "hovered") {
      buttonStyles = { ...buttonStyles, ...styles.boxShadow };
    }

    let opacityLayerStyles = {};
    if (state === "hovered") {
      opacityLayerStyles = { ...opacityLayerStyles, ...styles.opacity92 };
    } else if (state === "focused" || state === "pressed") {
      opacityLayerStyles = { ...opacityLayerStyles, ...styles.opacity96 };
    }

    let textStyles = { ...styles.text };
    if (state === "disabled") {
      textStyles = { ...textStyles, ...styles.textDisabled };
    }

    return (
      <View style={opacityLayerStyles}>
        <NativePressable style={buttonStyles} onPress={onPress}>
          <Text style={textStyles}>{title}</Text>
        </NativePressable>
      </View>
    );
  };

  return render();
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 100,
    backgroundColor: "#6750A4",
  },
  buttonDisabled: {
    backgroundColor: "rgba(31,31,31, 0.12)",
  },
  text: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    letterSpacing: 0.1,
    color: "white",
  },
  textDisabled: {
    color: "#1C1B1F",
    opacity: 0.38,
  },
  opacity92: {
    opacity: 0.92,
  },
  opacity96: {
    opacity: 0.96,
  },
  // https://ethercreative.github.io/react-native-shadow-generator/
  boxShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
