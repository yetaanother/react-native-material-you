import React, { FunctionComponent, useContext, useState } from "react";
import {
  GestureResponderEvent,
  NativeSyntheticEvent,
  Pressable as NativePressable,
  StyleSheet,
  TargetedEvent,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../providers/ThemeProvider";
import { ColorScheme } from "../providers/ColorScheme";
import { rgbaWithOpacity } from "../utils/colorUtils";
import { Shadows } from "../providers/Shadows";
import { M3Constants } from "../utils/M3Constants";

interface ButtonProps {
  type?: ButtonType;
  icon?: any;
  stateOverride?: ButtonState; // For library testing, don't use it
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  containerStyle?: ViewStyle;
  onPressIn?: (event: GestureResponderEvent) => void;
  onPressOut?: (event: GestureResponderEvent) => void;
  onFocus?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
  onBlur?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
  disabled?: boolean;
}

// M3 docs: https://m3.material.io/components/buttons/specs
export const Button: FunctionComponent<ButtonProps> = ({
  type,
  icon,
  stateOverride,
  title,
  onPress,
  containerStyle,
  onPressIn,
  onPressOut,
  onFocus,
  onBlur,
  disabled,
}: ButtonProps) => {
  const { scheme, shadows } = useContext(ThemeContext);
  const styles = createStyles(scheme, shadows);

  type = !type ? "filled" : type;
  if (!__DEV__ && stateOverride) {
    console.error(
      "state prop is only used for testing as it will override any interaction with the component. Don't use it"
    );
  }
  const [state, setState] = useState<ButtonState>(
    !!stateOverride ? stateOverride : disabled ? "disabled" : "enabled"
  );
  const stateCanBeSet = !disabled && !stateOverride;

  const render = () => {
    return (
      <NativePressable
        onPress={(event) => {
          if (!disabled && onPress) {
            onPress(event);
          }
        }}
        onPressIn={(event) => {
          if (stateCanBeSet) {
            setState("pressed");
          }
          onPressIn && onPressIn(event);
        }}
        onPressOut={(event) => {
          if (stateCanBeSet) {
            setState("enabled");
          }
          onPressOut && onPressOut(event);
        }}
        onFocus={(event) => {
          if (stateCanBeSet) {
            setState("focused");
          }
          onFocus && onFocus(event);
        }}
        onBlur={(event) => {
          if (stateCanBeSet) {
            setState("enabled");
          }
          onBlur && onBlur(event);
        }}
        style={getContainerStyles()}
      >
        <View style={getSurfaceOverlayStyles()}>
          <View style={getStateOverlayStyles()}>{renderContent()}</View>
        </View>
      </NativePressable>
    );
  };

  const getContainerStyles = () => {
    let containerStyles: ViewStyle = {
      ...styles.container,
    };
    if (type === "filled") {
      if (state === "disabled") {
        containerStyles = {
          ...containerStyles,
          ...styles.containerStateDisabled,
        };
      }
    } else if (type === "outlined") {
      containerStyles = { ...containerStyles, ...styles.containerTypeOutlined };
      if (state === "focused") {
        containerStyles = {
          ...containerStyles,
          ...styles.containerTypeOutlinedStateFocused,
        };
      } else if (state === "disabled") {
        containerStyles = {
          ...containerStyles,
          ...styles.containerTypeOutlinedStateDisabled,
        };
      }
    } else if (type === "text") {
      containerStyles = {
        ...containerStyles,
        ...styles.containerTypeText,
      };
    } else if (type === "elevated") {
      containerStyles = {
        ...containerStyles,
        ...styles.containerTypeElevated,
      };
      if (state == "disabled") {
        containerStyles = {
          ...containerStyles,
          ...styles.containerStateDisabled,
        };
      } else {
        containerStyles = { ...containerStyles, ...styles.boxShadowElevation1 };
      }
    } else if (type === "tonal") {
      containerStyles = { ...containerStyles, ...styles.containerTypeTonal };
      if (state === "disabled") {
        containerStyles = {
          ...containerStyles,
          ...styles.containerStateDisabled,
        };
      }
    }
    if (containerStyle) {
      return { ...containerStyles, ...containerStyle };
    }
    return containerStyles;
  };

  // It is not part of the spec but used in the Figma design kit
  const getSurfaceOverlayStyles = () => {
    let surfaceOverlayStyles = styles.surfaceOverlayTypeElevated;
    if (type === "elevated") {
      if (state === "enabled" || state == "pressed" || state === "focused") {
        surfaceOverlayStyles = {
          ...surfaceOverlayStyles,
          ...styles.surfaceOverlayTypeElevatedStateEnabledOrPressedOrFocused,
        };
      }
    }
    return surfaceOverlayStyles;
  };

  const getStateOverlayStyles = () => {
    let stateOverlayStyles = { ...styles.stateOverlay };
    if (type == "filled") {
      if (state === "focused" || state === "pressed") {
        stateOverlayStyles = {
          ...stateOverlayStyles,
          ...styles.stateOverlayTypeFilledStateFocusedOrPressed,
        };
      }
    } else if (type === "outlined" || type === "elevated" || type === "text") {
      if (type === "text") {
        stateOverlayStyles = {
          ...stateOverlayStyles,
          ...styles.stateOverlayTypeText,
        };
      }
      if (state === "focused" || state === "pressed") {
        stateOverlayStyles = {
          ...stateOverlayStyles,
          ...styles.stateOverlayTypeOutlinedOrElevatedOrTextStateFocusedOrPressed,
        };
      }
    } else if (type === "tonal") {
      if (state === "focused" || state === "pressed") {
        stateOverlayStyles = {
          ...stateOverlayStyles,
          ...styles.stateOverlayTypeTonalStateFocusedOrPressed,
        };
      }
    }
    if (icon) {
      if (type === "text") {
        stateOverlayStyles = {
          ...stateOverlayStyles,
          ...styles.stateOverlayWithIconTypeText,
        };
      } else {
        stateOverlayStyles = {
          ...stateOverlayStyles,
          ...styles.stateOverlayWithIcon,
        };
      }
    }

    return stateOverlayStyles;
  };

  const renderContent = () => {
    let textStyles = getTextStyles();
    return (
      <>
        {icon && (
          <Ionicons
            name={icon}
            size={iconSize}
            color={textStyles.color}
            style={getIconStyles()}
          />
        )}
        <Text style={textStyles}>{title}</Text>
      </>
    );
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

const borderRadius = 20;
const iconSize = 18;

const createStyles = (scheme: ColorScheme, shadows: Shadows) =>
  StyleSheet.create({
    container: {
      borderRadius: borderRadius,
      backgroundColor: scheme.primaryHex,
    },
    containerStateDisabled: {
      backgroundColor: rgbaWithOpacity(
        scheme.onSurfaceRGB,
        M3Constants.disabledContainerOpacity
      ),
    },
    containerTypeOutlined: {
      borderStyle: "solid",
      borderColor: scheme.outlineHex,
      borderWidth: 1,
      backgroundColor: undefined,
    },
    containerTypeOutlinedStateFocused: {
      borderColor: scheme.primaryHex,
    },
    containerTypeOutlinedStateDisabled: {
      borderColor: rgbaWithOpacity(
        scheme.onSurfaceRGB,
        M3Constants.disabledContainerOpacity
      ),
    },
    containerTypeText: {
      backgroundColor: undefined,
    },
    containerTypeElevated: {
      backgroundColor: scheme.surfaceHex,
    },
    surfaceOverlayTypeElevated: {
      // Added this because even though after adding borderRadius the backgroundColor was overflowing
      // https://stackoverflow.com/questions/35030758/react-native-border-radius-with-background-color
      overflow: "hidden",
      borderRadius: borderRadius,
    },
    surfaceOverlayTypeElevatedStateEnabledOrPressedOrFocused: {
      backgroundColor: rgbaWithOpacity(
        scheme.primaryRGB,
        M3Constants.surface1ContainerOpacity
      ),
    },
    containerTypeTonal: {
      backgroundColor: scheme.secondaryContainerHex,
    },
    stateOverlay: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      height: 40,
      paddingHorizontal: 24,
      borderRadius: borderRadius,
      // Added this because even though after adding borderRadius the backgroundColor was overflowing
      // https://stackoverflow.com/questions/35030758/react-native-border-radius-with-background-color
      overflow: "hidden",
    },
    stateOverlayTypeFilledStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(
        scheme.onPrimaryRGB,
        M3Constants.focusedOrPressedContainerOpacity
      ),
    },
    stateOverlayTypeOutlinedOrElevatedOrTextStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(
        scheme.primaryRGB,
        M3Constants.focusedOrPressedContainerOpacity
      ),
    },
    stateOverlayTypeTonalStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(
        scheme.onSecondaryContainerRGB,
        M3Constants.focusedOrPressedContainerOpacity
      ),
    },
    stateOverlayTypeText: {
      paddingHorizontal: 12,
    },
    stateOverlayWithIcon: {
      paddingLeft: 16,
      paddingRight: 24,
    },
    stateOverlayWithIconTypeText: {
      paddingLeft: 12,
      paddingRight: 16,
    },
    text: {
      ...M3Constants.labelLargeText,
      color: scheme.onPrimaryHex,
      textAlign: "center",
      textAlignVertical: "center",
    },
    textStateDisabled: {
      color: scheme.onSurfaceHex,
      opacity: M3Constants.disabledContentOpacity,
    },
    textTypeOutlinedOrTextOrElevated: {
      color: scheme.primaryHex,
    },
    textTypeTonal: {
      color: scheme.onSecondaryContainerHex,
    },
    boxShadowElevation1: shadows.boxShadowElevation1,
    boxShadowElevation2: shadows.boxShadowElevation2,
    icon: {
      marginRight: 8,
    },
    iconStateDisabled: {
      opacity: M3Constants.disabledContentOpacity,
    },
  });
