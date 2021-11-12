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

interface CrudeButtonProps {
  type?: "filled" | "outlined" | "text" | "elevated" | "tonal";
  icon?: any;
  state?: "enabled" | "hovered" | "focused" | "pressed" | "disabled";
  title: string;
  onPress: () => void;
  style?: ViewStyle | TextStyle | ImageStyle;
}

export const CrudeButton: FunctionComponent<CrudeButtonProps> = ({
  type,
  icon,
  state,
  title,
  onPress,
  style,
}: CrudeButtonProps) => {
  const scheme = useContext(ThemeContext);
  const styles = createStyles(scheme);

  state = !state ? "enabled" : state;
  type = !type ? "filled" : type;
  style = !style ? {} : style;

  //todo remove
  console.log(state, type, style);
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
    if (type === "filled") {
      if (state === "disabled") {
        buttonStyles = { ...buttonStyles, ...styles.buttonStateDisabled };
      } else if (state === "hovered") {
        buttonStyles = { ...buttonStyles, ...styles.boxShadow };
      }
    } else if (type === "outlined") {
      buttonStyles = { ...buttonStyles, ...styles.buttonTypeOutlined };
      delete buttonStyles["backgroundColor"];
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
      delete buttonStyles["backgroundColor"];
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
    return { ...buttonStyles, ...style };
  };

  const getInnerStyles = () => {
    let innerStyles = { ...styles.inner };
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
        return scheme.onSurfaceHex;
      } else {
        return scheme.onPrimaryHex;
      }
    } else if (type === "outlined" || type === "text") {
      if (state === "disabled") {
        return scheme.onSurfaceHex;
      } else {
        return scheme.primaryHex;
      }
    } else if (type === "elevated") {
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
      // This field is optional. Right now not including it to be in sync with Figma design kit
      // backgroundColor: scheme.surfaceHex,
      borderStyle: "solid",
      borderColor: scheme.outlineHex,
      borderWidth: 1,
    },
    buttonTypeOutlinedStateFocused: {
      borderColor: scheme.primaryHex,
    },
    buttonTypeOutlinedStateDisabled: {
      borderColor: rgbaWithOpacity(scheme.onSurfaceRGB, 0.12),
    },
    buttonTypeTextStateHovered: {
      backgroundColor: rgbaWithOpacity(scheme.primaryRGB, stateHoveredOpacity),
    },
    buttonTypeTextStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(
        scheme.primaryRGB,
        statePressedOrFocusedOpacity
      ),
    },
    buttonTypeElevated: {
      backgroundColor: "#FFFFFF",
    },
    buttonTypeTonal: {
      backgroundColor: "#E8DEF8",
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
      backgroundColor: rgbaWithOpacity(scheme.primaryRGB, stateHoveredOpacity),
    },
    innerTypeOutlinedOrElevatedStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(
        scheme.primaryRGB,
        statePressedOrFocusedOpacity
      ),
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
      color: scheme.primaryHex,
    },
    textTypeTonal: {
      color: "#1D192B",
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
