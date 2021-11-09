import React, { FunctionComponent } from "react";
import {
  ImageStyle,
  Platform,
  Pressable as NativePressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ButtonProps {
  theme?: "light" | "dark";
  type?: "filled" | "outlined" | "text" | "elevated" | "tonal";
  icon?: any;
  state?: "enabled" | "hovered" | "focused" | "pressed" | "disabled";
  title: string;
  onPress: () => void;
  style?: ViewStyle | TextStyle | ImageStyle;
}

export const Button: FunctionComponent<ButtonProps> = ({
  theme,
  type,
  icon,
  state,
  title,
  onPress,
  style,
}: ButtonProps) => {
  state = !state ? "enabled" : state;
  type = !type ? "filled" : type;
  theme = !theme ? "light" : theme;
  style = !style ? {} : style;

  const render = () => {
    return (
      <View style={getOpacityLayerStyles()}>
        <NativePressable style={getButtonStyles()} onPress={onPress}>
          {renderContent()}
        </NativePressable>
      </View>
    );
  };

  const getButtonStyles = () => {
    let buttonStyles: ViewStyle | TextStyle | ImageStyle = { ...styles.parent };
    // States
    if (state === "disabled") {
      buttonStyles = { ...buttonStyles, ...styles.buttonDisabled };
    } else if (state === "hovered") {
      buttonStyles = { ...buttonStyles, ...styles.boxShadow };
    }
    //Icon
    if (icon) {
      buttonStyles = { ...buttonStyles, ...styles.buttonWithIcon };
    }
    return { ...buttonStyles, ...style };
  };

  const getOpacityLayerStyles = () => {
    if (state === "hovered") {
      return { ...styles.opacity92 };
    } else if (state === "focused" || state === "pressed") {
      return { ...styles.opacity96 };
    } else {
      return {};
    }
  };

  const renderContent = () => {
    let textStyles = getTextStyles();

    //https://icons.expo.fyi/
    if (icon) {
      return (
        <>
          <Ionicons
            name={icon}
            size={18}
            color={state === "disabled" ? "#1C1B1F" : "white"}
            style={getIconStyles()}
          />
          <Text style={textStyles}>{title}</Text>
        </>
      );
    }
    return <Text style={textStyles}>{title}</Text>;
  };

  const getTextStyles = () => {
    let textStyles = { ...styles.text };
    if (state === "disabled") {
      textStyles = { ...textStyles, ...styles.textDisabled };
    }
    return textStyles;
  };

  const getIconStyles = () => {
    let iconStyles = { ...styles.icon };
    if (state === "disabled") {
      iconStyles = { ...iconStyles, ...styles.iconDisabled };
    }
    return iconStyles;
  };

  return render();
};

const styles = StyleSheet.create({
  parent: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 100,
    backgroundColor: "#6750A4",
  },
  buttonDisabled: {
    backgroundColor: "rgba(31,31,31, 0.12)",
  },
  buttonWithIcon: {
    paddingLeft: 16,
    paddingRight: 24,
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
  icon: {
    marginRight: 8,
  },
  iconDisabled: {
    opacity: 0.38,
  },
});
