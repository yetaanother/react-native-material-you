import React, { FunctionComponent, useContext } from "react";
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
import { ThemeContext } from "./ThemeProvider";
import { SchemeAdapter } from "./SchemeAdapter";
import { rgbaWithOpacity } from "./utils";

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
  const scheme = useContext(ThemeContext);
  const styles = createStyles(scheme);

  state = !state ? "enabled" : state;
  type = !type ? "filled" : type;
  theme = !theme ? "light" : theme;
  style = !style ? {} : style;

  //todo remove
  console.log(state, type, theme, style);
  console.log(scheme);

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
    if (theme === "light") {
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
            ...styles.buttonTypeOutlinedStateDisabled,
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
      } else if (type === "tonal") {
        buttonStyles = { ...buttonStyles, ...styles.buttonTypeTonal };
        if (state === "disabled") {
          buttonStyles = { ...buttonStyles, ...styles.buttonStateDisabled };
        } else if (state === "hovered") {
          buttonStyles = { ...buttonStyles, ...styles.boxShadow };
        }
      }
    } else if (theme === "dark") {
      buttonStyles = { ...buttonStyles, ...styles.buttonThemeDark };
      if (type === "filled") {
        if (state === "disabled") {
          buttonStyles = {
            ...buttonStyles,
            ...styles.buttonThemeDarkStateDisabled,
          };
        } else if (state === "hovered") {
          buttonStyles = { ...buttonStyles, ...styles.boxShadow };
        }
      }
    }
    return { ...buttonStyles, ...style };
  };

  const getInnerStyles = () => {
    let innerStyles = { ...styles.inner };
    if (theme === "light") {
      if (type == "filled") {
        if (state === "hovered") {
          innerStyles = { ...innerStyles, ...styles.innerStateHovered };
        } else if (state === "focused" || state === "pressed") {
          innerStyles = {
            ...innerStyles,
            ...styles.innerStateFocusedOrPressed,
          };
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
      } else if (type === "tonal") {
        if (state === "hovered") {
          innerStyles = {
            ...innerStyles,
            ...styles.innerTypeTonalStateHovered,
          };
        } else if (state === "focused" || state === "pressed") {
          innerStyles = {
            ...innerStyles,
            ...styles.innerTypeTonalStateFocusedOrPressed,
          };
        }
      }
    } else if (theme === "dark") {
      if (type == "filled") {
        if (state === "hovered") {
          innerStyles = {
            ...innerStyles,
            ...styles.innerThemeDarkStateHovered,
          };
        } else if (state === "focused" || state === "pressed") {
          innerStyles = {
            ...innerStyles,
            ...styles.innerThemeDarkStateFocusedOrPressed,
          };
        } else if (state === "disabled") {
          innerStyles = {
            ...innerStyles,
            ...styles.innerThemeDarkStateDisabled,
          };
        }
      }
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
    if (theme === "light") {
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
      } else if (type === "tonal") {
        if (state === "disabled") {
          return "#1C1B1F";
        } else {
          return "#1D192B";
        }
      }
    } else if (theme === "dark") {
      if (type === "filled") {
        if (state === "disabled") {
          return "#E6E1E5";
        } else {
          return "#381E72";
        }
      }
    }

    return "#FFFFFF";
  };

  const getTextStyles = () => {
    let textStyles = { ...styles.text };
    if (theme === "light") {
      if (type === "filled") {
        if (state === "disabled") {
          textStyles = { ...textStyles, ...styles.textStateDisabled };
        }
      } else if (
        type === "outlined" ||
        type === "text" ||
        type === "elevated"
      ) {
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
      } else if (type === "tonal") {
        textStyles = {
          ...textStyles,
          ...styles.textTypeTonal,
        };
        if (state === "disabled") {
          textStyles = {
            ...textStyles,
            ...styles.textStateDisabled,
          };
        }
      }
    } else if (theme === "dark") {
      textStyles = { ...textStyles, ...styles.textThemeDark };
      if (type === "filled") {
        if (state === "disabled") {
          textStyles = { ...textStyles, ...styles.textThemeDarkStateDisabled };
        }
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

const defaultBorderRadius = 100;
const stateHoveredOpacity = 0.08;
const statePressedOrFocusedOpacity = 0.12;
const stateDisabledOpacity = 0.38;

const createStyles = (scheme: SchemeAdapter) =>
  StyleSheet.create({
    button: {
      borderRadius: defaultBorderRadius,
      backgroundColor: scheme.primaryHex,
    },
    buttonStateDisabled: {
      backgroundColor: rgbaWithOpacity(scheme.onSurfaceRGB, 0.12),
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
    buttonTypeOutlinedStateDisabled: {
      backgroundColor: "#FFFFFF",
      borderColor: "rgba(31, 31, 31, 0.12)",
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
    buttonTypeTonal: {
      backgroundColor: "#E8DEF8",
    },
    buttonThemeDark: {
      backgroundColor: "#D0BCFF",
    },
    buttonThemeDarkStateDisabled: {
      backgroundColor: "#1F1F1F",
    },
    linearGradient: {
      borderRadius: defaultBorderRadius,
    },
    inner: {
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      flexDirection: "row",
      paddingVertical: 10,
      paddingHorizontal: 24,
      borderRadius: defaultBorderRadius,
    },
    innerStateHovered: {
      backgroundColor: rgbaWithOpacity(
        scheme.onPrimaryRGB,
        stateHoveredOpacity
      ),
    },
    innerStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(
        scheme.onPrimaryRGB,
        statePressedOrFocusedOpacity
      ),
    },
    innerTypeOutlinedOrElevatedStateHovered: {
      backgroundColor: "rgba(103, 80, 164, 0.08)",
    },
    innerTypeOutlinedOrElevatedStateFocusedOrPressed: {
      backgroundColor: "rgba(103, 80, 164, 0.12)",
    },
    innerTypeTonalStateHovered: {
      backgroundColor: "rgba(29, 25, 43, 0.08)",
    },
    innerTypeTonalStateFocusedOrPressed: {
      backgroundColor: "rgba(29, 25, 43, 0.12)",
    },
    innerTypeText: {
      paddingHorizontal: 12,
    },
    innerThemeDarkStateHovered: {
      backgroundColor: "rgba(208, 188, 255, 0.08)",
    },
    innerThemeDarkStateFocusedOrPressed: {
      backgroundColor: "rgba(208, 188, 255, 0.12)",
    },
    innerThemeDarkStateDisabled: {
      backgroundColor: "rgba(227, 227, 227, 0.12)",
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
      color: scheme.onPrimaryHex,
    },
    textStateDisabled: {
      color: scheme.onSurfaceHex,
      opacity: stateDisabledOpacity,
    },
    textTypeOutlinedOrTextOrElevated: {
      color: "#6750A4",
    },
    textTypeTonal: {
      color: "#1D192B",
    },
    textThemeDark: {
      color: "#381E72",
    },
    textThemeDarkStateDisabled: {
      color: "#E6E1E5",
      opacity: stateDisabledOpacity,
    },
    // https://ethercreative.github.io/react-native-shadow-generator/
    boxShadow: {
      ...Platform.select({
        ios: {
          shadowColor: scheme.shadowHex,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.3,
          shadowRadius: 2,
        },
        android: {
          elevation: 3,
          shadowColor: scheme.shadowHex,
        },
      }),
    },
    boxShadowDouble: {
      ...Platform.select({
        ios: {
          shadowColor: scheme.shadowHex,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.3,
          shadowRadius: 5,
        },
        android: {
          elevation: 5,
          shadowColor: scheme.shadowHex,
        },
      }),
    },
    icon: {
      marginRight: 8,
    },
    iconStateDisabled: {
      opacity: stateDisabledOpacity,
    },
  });
