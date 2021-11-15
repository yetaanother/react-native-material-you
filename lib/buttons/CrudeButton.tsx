import React, { FunctionComponent, useContext } from "react";
import {
  GestureResponderEvent,
  ImageStyle,
  NativeSyntheticEvent,
  Platform,
  Pressable as NativePressable,
  StyleSheet,
  TargetedEvent,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeContext } from "../providers/ThemeProvider";
import { SchemeAdapter } from "../providers/SchemeAdapter";
import { rgbaWithOpacity } from "../utils/colorUtils";

interface CrudeButtonProps {
  type?: ButtonType;
  icon?: any;
  state?: ButtonState;
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  containerStyle?: ViewStyle | TextStyle | ImageStyle;
  onPressIn?: (event: GestureResponderEvent) => void;
  onPressOut?: (event: GestureResponderEvent) => void;
  onFocus?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
  onBlur?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
}

export const CrudeButton: FunctionComponent<CrudeButtonProps> = ({
  type,
  icon,
  state,
  title,
  onPress,
  containerStyle,
  onPressIn,
  onPressOut,
  onFocus,
  onBlur,
}: CrudeButtonProps) => {
  const scheme = useContext(ThemeContext);
  const styles = createStyles(scheme);

  state = !state ? "enabled" : state;
  type = !type ? "filled" : type;

  const render = () => {
    if (type === "elevated" && getGradientColors().length > 1) {
      return (
        <NativePressable
          style={getContainerStyles()}
          onPress={onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={state === "disabled"}
        >
          <LinearGradient
            style={styles.linearGradient}
            colors={getGradientColors()}
          >
            <View style={getStateStyles()}>{renderContent()}</View>
          </LinearGradient>
        </NativePressable>
      );
    }
    return (
      <NativePressable
        style={getContainerStyles()}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={state === "disabled"}
      >
        <View style={getStateStyles()}>{renderContent()}</View>
      </NativePressable>
    );
  };

  const getGradientColors = () => {
    if (type === "elevated") {
      if (state === "hovered") {
        return [
          rgbaWithOpacity(scheme.primaryRGB, 0.08),
          rgbaWithOpacity(scheme.primaryRGB, 0.08),
        ];
      } else if (
        state === "enabled" ||
        state == "pressed" ||
        state === "focused"
      ) {
        return [
          rgbaWithOpacity(scheme.primaryRGB, 0.05),
          rgbaWithOpacity(scheme.primaryRGB, 0.05),
        ];
      }
    }
    return [];
  };

  const getContainerStyles = () => {
    let containerStyles: ViewStyle | TextStyle | ImageStyle = {
      ...styles.button,
    };
    if (type === "filled") {
      if (state === "disabled") {
        containerStyles = { ...containerStyles, ...styles.buttonStateDisabled };
      } else if (state === "hovered") {
        containerStyles = { ...containerStyles, ...styles.boxShadowElevation1 };
      }
    } else if (type === "outlined") {
      containerStyles = { ...containerStyles, ...styles.buttonTypeOutlined };
      delete containerStyles["backgroundColor"];
      if (state === "focused") {
        containerStyles = {
          ...containerStyles,
          ...styles.buttonTypeOutlinedStateFocused,
        };
      } else if (state === "disabled") {
        containerStyles = {
          ...containerStyles,
          ...styles.buttonTypeOutlinedStateDisabled,
        };
      }
    } else if (type === "text") {
      delete containerStyles["backgroundColor"];
      if (state === "hovered") {
        containerStyles = {
          ...containerStyles,
          ...styles.buttonTypeTextStateHovered,
        };
      } else if (state === "focused" || state === "pressed") {
        containerStyles = {
          ...containerStyles,
          ...styles.buttonTypeTextStateFocusedOrPressed,
        };
      }
    } else if (type === "elevated") {
      containerStyles = {
        ...containerStyles,
        ...styles.buttonTypeElevated,
      };
      if (state == "disabled") {
        containerStyles = { ...containerStyles, ...styles.buttonStateDisabled };
      } else if (state === "hovered") {
        containerStyles = { ...containerStyles, ...styles.boxShadowElevation2 };
      } else {
        containerStyles = { ...containerStyles, ...styles.boxShadowElevation1 };
      }
    } else if (type === "tonal") {
      containerStyles = { ...containerStyles, ...styles.buttonTypeTonal };
      if (state === "disabled") {
        containerStyles = { ...containerStyles, ...styles.buttonStateDisabled };
      } else if (state === "hovered") {
        containerStyles = { ...containerStyles, ...styles.boxShadowElevation1 };
      }
    }
    if (containerStyle) {
      return { ...containerStyles, ...containerStyle };
    }
    return containerStyles;
  };

  const getStateStyles = () => {
    let stateStyles = { ...styles.inner };
    if (type == "filled") {
      if (state === "hovered") {
        stateStyles = { ...stateStyles, ...styles.innerStateHovered };
      } else if (state === "focused" || state === "pressed") {
        stateStyles = {
          ...stateStyles,
          ...styles.innerStateFocusedOrPressed,
        };
      }
    } else if (type === "outlined" || type === "elevated") {
      if (state === "hovered") {
        stateStyles = {
          ...stateStyles,
          ...styles.innerTypeOutlinedOrElevatedStateHovered,
        };
      } else if (state === "focused" || state === "pressed") {
        stateStyles = {
          ...stateStyles,
          ...styles.innerTypeOutlinedOrElevatedStateFocusedOrPressed,
        };
      }
    } else if (type === "text") {
      stateStyles = { ...stateStyles, ...styles.innerTypeText };
    } else if (type === "tonal") {
      if (state === "hovered") {
        stateStyles = {
          ...stateStyles,
          ...styles.innerTypeTonalStateHovered,
        };
      } else if (state === "focused" || state === "pressed") {
        stateStyles = {
          ...stateStyles,
          ...styles.innerTypeTonalStateFocusedOrPressed,
        };
      }
    }
    if (icon) {
      if (type === "text") {
        stateStyles = { ...stateStyles, ...styles.innerWithIconTypeText };
      } else {
        stateStyles = { ...stateStyles, ...styles.innerWithIcon };
      }
    }

    return stateStyles;
  };

  const renderContent = () => {
    //https://icons.expo.fyi/
    return (
      <>
        {icon && (
          <Ionicons
            name={icon}
            size={18}
            color={getIconColor()}
            style={getIconStyles()}
          />
        )}
        <Text style={getTextStyles()}>{title}</Text>
      </>
    );
  };

  const getIconColor = () => {
    if (type === "filled") {
      if (state === "disabled") {
        return scheme.onSurfaceHex;
      } else {
        return scheme.onPrimaryHex;
      }
    } else if (type === "outlined" || type === "text" || type === "elevated") {
      if (state === "disabled") {
        return scheme.onSurfaceHex;
      } else {
        return scheme.primaryHex;
      }
    } else if (type === "tonal") {
      if (state === "disabled") {
        return scheme.onSurfaceHex;
      } else {
        return scheme.onSecondaryContainerHex;
      }
    }

    // should not happen
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
const defaultStateHoveredOpacity = 0.08;
const defaultStatePressedOrFocusedOpacity = 0.12;
const defaultStateDisabledOpacity = 0.12;
const defaultContentStateDisabledOpacity = 0.38;

const createStyles = (scheme: SchemeAdapter) =>
  StyleSheet.create({
    button: {
      borderRadius: defaultBorderRadius,
      backgroundColor: scheme.primaryHex,
    },
    buttonStateDisabled: {
      backgroundColor: rgbaWithOpacity(
        scheme.onSurfaceRGB,
        defaultStateDisabledOpacity
      ),
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
      borderColor: rgbaWithOpacity(
        scheme.onSurfaceRGB,
        defaultStateDisabledOpacity
      ),
    },
    // todo move as inner style
    buttonTypeTextStateHovered: {
      backgroundColor: rgbaWithOpacity(
        scheme.primaryRGB,
        defaultStateHoveredOpacity
      ),
    },
    // todo move as inner style
    buttonTypeTextStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(
        scheme.primaryRGB,
        defaultStatePressedOrFocusedOpacity
      ),
    },
    buttonTypeElevated: {
      backgroundColor: scheme.surfaceHex,
    },
    buttonTypeTonal: {
      backgroundColor: scheme.secondaryContainerHex,
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
        defaultStateHoveredOpacity
      ),
    },
    innerStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(
        scheme.onPrimaryRGB,
        defaultStatePressedOrFocusedOpacity
      ),
    },
    innerTypeOutlinedOrElevatedStateHovered: {
      backgroundColor: rgbaWithOpacity(
        scheme.primaryRGB,
        defaultStateHoveredOpacity
      ),
    },
    innerTypeOutlinedOrElevatedStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(
        scheme.primaryRGB,
        defaultStatePressedOrFocusedOpacity
      ),
    },
    innerTypeTonalStateHovered: {
      backgroundColor: rgbaWithOpacity(
        scheme.onSecondaryContainerRGB,
        defaultStateHoveredOpacity
      ),
    },
    innerTypeTonalStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(
        scheme.onSecondaryContainerRGB,
        defaultStatePressedOrFocusedOpacity
      ),
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
      opacity: defaultContentStateDisabledOpacity,
    },
    textTypeOutlinedOrTextOrElevated: {
      color: scheme.primaryHex,
    },
    textTypeTonal: {
      color: scheme.onSecondaryContainerHex,
    },
    // https://ethercreative.github.io/react-native-shadow-generator/
    boxShadowElevation1: {
      ...Platform.select({
        ios: {
          shadowColor: scheme.shadowHex,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 1,
        },
        android: {
          elevation: 1,
          shadowColor: scheme.shadowHex,
        },
      }),
    },
    boxShadowElevation2: {
      ...Platform.select({
        ios: {
          shadowColor: scheme.shadowHex,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
        },
        android: {
          elevation: 2,
          shadowColor: scheme.shadowHex,
        },
      }),
    },
    icon: {
      marginRight: 8,
    },
    iconStateDisabled: {
      opacity: defaultContentStateDisabledOpacity,
    },
  });
