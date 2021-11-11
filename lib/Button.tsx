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
      <NativePressable style={getButtonStyles()} onPress={onPress}>
        <View style={getInnerStyles()}>{renderContent()}</View>
      </NativePressable>
    );
  };

  const getButtonStyles = () => {
    let buttonStyles: ViewStyle | TextStyle | ImageStyle = { ...styles.button };

    if (type === "filled") {
      if (state === "disabled") {
        buttonStyles = { ...buttonStyles, ...styles.buttonDisabled };
      } else if (state === "hovered") {
        buttonStyles = { ...buttonStyles, ...styles.boxShadow };
      }
    } else if (type === "outlined") {
      buttonStyles = { ...buttonStyles, ...styles.buttonOutlined };
      if (state === "focused") {
        buttonStyles = { ...buttonStyles, ...styles.buttonOutlinedFocused };
      } else if (state === "disabled") {
        buttonStyles = { ...buttonStyles, ...styles.buttonOutlinedDisabled };
      }
    } else if (type === "text") {
      buttonStyles = { ...buttonStyles, ...styles.buttonText };
      if (state === "hovered") {
        buttonStyles = { ...buttonStyles, ...styles.buttonTextHovered };
      } else if (state === "focused" || state === "pressed") {
        buttonStyles = {
          ...buttonStyles,
          ...styles.buttonTextFocusedOrPressed,
        };
      }
    }
    return { ...buttonStyles, ...style };
  };

  const getInnerStyles = () => {
    let innerStyles = { ...styles.inner };
    if (type == "filled") {
      if (state === "hovered") {
        innerStyles = { ...innerStyles, ...styles.innerHovered };
      } else if (state === "focused" || state === "pressed") {
        innerStyles = { ...innerStyles, ...styles.innerFocusedOrPressed };
      }
    } else if (type === "outlined") {
      if (state === "hovered") {
        innerStyles = { ...innerStyles, ...styles.innerOutlinedHovered };
      } else if (state === "focused" || state === "pressed") {
        innerStyles = {
          ...innerStyles,
          ...styles.innerOutlinedFocusedOrPressed,
        };
      }
    } else if (type === "text") {
      innerStyles = { ...innerStyles, ...styles.inner };
    }

    if (icon) {
      innerStyles = { ...innerStyles, ...styles.innerWithIcon };
    }
    return innerStyles;
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
            color={getIconColor()}
            style={getIconStyles()}
          />
          <Text style={textStyles}>{title}</Text>
        </>
      );
    }
    return <Text style={textStyles}>{title}</Text>;
  };

  const getIconColor = () => {
    if (type === "filled") {
      if (state === "disabled") {
        return "#1C1B1F";
      } else {
        return "#FFFFFF";
      }
    } else if (type === "outlined") {
      if (state === "disabled") {
        return "#1C1B1F";
      } else if (state === "pressed") {
        return "#625B71";
      } else {
        return "#6750A4";
      }
    } else if (type === "text") {
      if (state === "disabled") {
        return "#1C1B1F";
      } else {
        return "#6750A4";
      }
    }

    return "#FFFFFF";
  };

  const getTextStyles = () => {
    let textStyles = { ...styles.text };
    if (type === "filled") {
      if (state === "disabled") {
        textStyles = { ...textStyles, ...styles.textDisabled };
      }
    } else if (type === "outlined") {
      textStyles = { ...textStyles, ...styles.textOutlined };
      if (state === "disabled") {
        textStyles = { ...textStyles, ...styles.textOutlinedDisabled };
      }
    } else if (type === "text") {
      textStyles = { ...textStyles, ...styles.textText };
      if (state === "disabled") {
        textStyles = { ...textStyles, ...styles.textTextDisabled };
      }
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
  button: {
    borderRadius: 100,
    backgroundColor: "#6750A4",
  },
  buttonDisabled: {
    backgroundColor: "rgba(31,31,31, 0.12)",
  },
  buttonOutlined: {
    backgroundColor: "#FFFFFF",
    borderStyle: "solid",
    borderColor: "#79747E",
    borderWidth: 1,
  },
  buttonOutlinedFocused: {
    borderColor: "#6750A4",
  },
  buttonOutlinedDisabled: {
    borderColor: "rgba(31, 31, 31, 0.12)",
  },
  buttonText: {
    backgroundColor: "#FFFFFF",
  },
  buttonTextHovered: {
    backgroundColor: "rgba(103, 80, 164, 0.08)",
  },
  buttonTextFocusedOrPressed: {
    backgroundColor: "rgba(103, 80, 164, 0.12)",
  },
  inner: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 100,
  },
  innerHovered: {
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  innerFocusedOrPressed: {
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  innerOutlinedHovered: {
    backgroundColor: "rgba(103, 80, 164, 0.08)",
  },
  innerOutlinedFocusedOrPressed: {
    backgroundColor: "rgba(103, 80, 164, 0.12)",
  },
  innerText: {
    paddingHorizontal: 24,
  },
  innerWithIcon: {
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
    color: "#FFFFFF",
  },
  textDisabled: {
    color: "#1C1B1F",
    opacity: 0.38,
  },
  textOutlined: {
    color: "#6750A4",
  },
  textOutlinedDisabled: {
    color: "#1C1B1F",
    opacity: 0.38,
  },
  textText: {
    color: "#6750A4",
  },
  textTextDisabled: {
    color: "#1C1B1F",
    opacity: 0.38,
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
