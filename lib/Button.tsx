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
import { LinearGradient } from "expo-linear-gradient";

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
    if (type === "elevated" && getGradientColors().length > 1) {
      return (
        <NativePressable style={getButtonStyles()} onPress={onPress}>
          <LinearGradient
            style={styles.linearGradient}
            colors={getGradientColors()}
          >
            <View style={getInnerStyles()}>{renderContent()}</View>
          </LinearGradient>
        </NativePressable>
      );
    }
    return (
      <NativePressable style={getButtonStyles()} onPress={onPress}>
        <View style={getInnerStyles()}>{renderContent()}</View>
      </NativePressable>
    );
  };

  const getGradientColors = () => {
    if (type === "elevated") {
      if (state === "hovered") {
        return ["rgba(103, 80, 164, 0.08)", "rgba(103, 80, 164, 0.08)"];
      } else if (
        state === "enabled" ||
        state == "pressed" ||
        state === "focused"
      ) {
        return ["rgba(103, 80, 164, 0.05)", "rgba(103, 80, 164, 0.05)"];
      }
    }
    return [];
  };

  const getButtonStyles = () => {
    let buttonStyles: ViewStyle | TextStyle | ImageStyle = { ...styles.button };

    if (type === "filled") {
      if (state === "disabled") {
        buttonStyles = { ...buttonStyles, ...styles.buttonStateDisabled };
      } else if (state === "hovered") {
        buttonStyles = { ...buttonStyles, ...styles.boxShadow };
      }
    } else if (type === "outlined") {
      buttonStyles = { ...buttonStyles, ...styles.buttonTypeOutlined };
      if (state === "focused") {
        buttonStyles = {
          ...buttonStyles,
          ...styles.buttonTypeOutlinedStateFocused,
        };
      } else if (state === "disabled") {
        buttonStyles = {
          ...buttonStyles,
          ...styles.buttonStateDisabled,
        };
      }
    } else if (type === "text") {
      buttonStyles = { ...buttonStyles, ...styles.buttonTypeText };
      if (state === "hovered") {
        buttonStyles = {
          ...buttonStyles,
          ...styles.buttonTypeTextStateHovered,
        };
      } else if (state === "focused" || state === "pressed") {
        buttonStyles = {
          ...buttonStyles,
          ...styles.buttonTypeTextStateFocusedOrPressed,
        };
      }
    } else if (type === "elevated") {
      buttonStyles = {
        ...buttonStyles,
        ...styles.buttonTypeElevated,
      };
      if (state == "disabled") {
        buttonStyles = { ...buttonStyles, ...styles.buttonStateDisabled };
      } else if (state === "hovered") {
        buttonStyles = { ...buttonStyles, ...styles.boxShadowDouble };
      } else {
        buttonStyles = { ...buttonStyles, ...styles.boxShadow };
      }
    }
    return { ...buttonStyles, ...style };
  };

  const getInnerStyles = () => {
    let innerStyles = { ...styles.inner };
    if (type == "filled") {
      if (state === "hovered") {
        innerStyles = { ...innerStyles, ...styles.innerStateHovered };
      } else if (state === "focused" || state === "pressed") {
        innerStyles = { ...innerStyles, ...styles.innerStateFocusedOrPressed };
      }
    } else if (type === "outlined" || type === "elevated") {
      if (state === "hovered") {
        innerStyles = {
          ...innerStyles,
          ...styles.innerTypeOutlinedOrElevatedStateHovered,
        };
      } else if (state === "focused" || state === "pressed") {
        innerStyles = {
          ...innerStyles,
          ...styles.innerTypeOutlinedOrElevatedStateFocusedOrPressed,
        };
      }
    } else if (type === "text") {
      innerStyles = { ...innerStyles, ...styles.innerTypeText };
    }

    if (icon) {
      if (type === "text") {
        innerStyles = { ...innerStyles, ...styles.innerWithIconTypeText };
      } else {
        innerStyles = { ...innerStyles, ...styles.innerWithIcon };
      }
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
    } else if (type === "text" || type === "elevated") {
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
        textStyles = { ...textStyles, ...styles.textStateDisabled };
      }
    } else if (type === "outlined" || type === "text" || type === "elevated") {
      textStyles = {
        ...textStyles,
        ...styles.textTypeOutlinedOrTextOrElevated,
      };
      if (state === "disabled") {
        textStyles = {
          ...textStyles,
          ...styles.textStateDisabled,
        };
      }
    }
    return textStyles;
  };

  const getIconStyles = () => {
    let iconStyles = { ...styles.icon };
    if (state === "disabled") {
      iconStyles = { ...iconStyles, ...styles.iconStateDisabled };
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
  buttonStateDisabled: {
    backgroundColor: "rgba(31,31,31, 0.12)",
  },
  buttonTypeOutlined: {
    backgroundColor: "#FFFFFF",
    borderStyle: "solid",
    borderColor: "#79747E",
    borderWidth: 1,
  },
  buttonTypeOutlinedStateFocused: {
    borderColor: "#6750A4",
  },
  buttonTypeText: {
    backgroundColor: "#FFFFFF",
  },
  buttonTypeTextStateHovered: {
    backgroundColor: "rgba(103, 80, 164, 0.08)",
  },
  buttonTypeTextStateFocusedOrPressed: {
    backgroundColor: "rgba(103, 80, 164, 0.12)",
  },
  buttonTypeElevated: {
    backgroundColor: "#FFFFFF",
  },
  linearGradient: {
    borderRadius: 100,
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
  innerStateHovered: {
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  innerStateFocusedOrPressed: {
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  innerTypeOutlinedOrElevatedStateHovered: {
    backgroundColor: "rgba(103, 80, 164, 0.08)",
  },
  innerTypeOutlinedOrElevatedStateFocusedOrPressed: {
    backgroundColor: "rgba(103, 80, 164, 0.12)",
  },
  innerTypeText: {
    paddingHorizontal: 12,
  },
  innerWithIcon: {
    paddingLeft: 16,
    paddingRight: 24,
  },
  innerWithIconTypeText: {
    paddingLeft: 12,
    paddingRight: 16,
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
  textStateDisabled: {
    color: "#1C1B1F",
    opacity: 0.38,
  },
  textTypeOutlinedOrTextOrElevated: {
    color: "#6750A4",
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
        shadowColor: "#000000",
      },
    }),
  },
  boxShadowDouble: {
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
        shadowColor: "#000000",
      },
    }),
  },
  icon: {
    marginRight: 8,
  },
  iconStateDisabled: {
    opacity: 0.38,
  },
});
