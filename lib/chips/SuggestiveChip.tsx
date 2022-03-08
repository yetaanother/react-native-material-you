import React, { FunctionComponent, useContext, useState } from "react";
import {
  Pressable as NativePressable,
  GestureResponderEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TargetedEvent,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { ThemeContext } from "../providers/ThemeProvider";
import { ColorScheme } from "../providers/ColorScheme";
import { Shadows } from "../providers/Shadows";
import { rgbaWithOpacity } from "../utils/colorUtils";
import { Ionicons } from "@expo/vector-icons";
import { M3Constants } from "../utils/M3Constants";

// Guidelines for 'selected' version are not given in specs
interface SuggestiveChipProps {
  label: string;
  selected?: boolean;
  elevated?: boolean;
  stateOverride?: SuggestiveChipState; // For library testing, don't use it
  icon?: any;
  containerStyle?: ViewStyle;
  onPress?: (event: GestureResponderEvent) => void;
  onPressIn?: (event: GestureResponderEvent) => void;
  onPressOut?: (event: GestureResponderEvent) => void;
  onFocus?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
  onBlur?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
  disabled?: boolean;
}

// M3 docs: https://m3.material.io/components/chips/specs
export const SuggestiveChip: FunctionComponent<SuggestiveChipProps> = ({
  label,
  selected,
  elevated,
  stateOverride,
  icon,
  containerStyle,
  onPress,
  onFocus,
  onBlur,
  onPressIn,
  onPressOut,
  disabled,
}) => {
  const { scheme, shadows } = useContext(ThemeContext);
  const styles = createStyles(scheme, shadows);

  if (!__DEV__ && stateOverride) {
    console.error(
      "state prop is only used for testing as it will override any interaction with the component. Don't use it"
    );
  }
  const [state, setState] = useState<SuggestiveChipState>(
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
        <View style={getStateOverlayStyles()}>{renderContent()}</View>
      </NativePressable>
    );
  };

  const getContainerStyles = () => {
    let containerStyles: ViewStyle = { ...styles.container };
    if (!selected) {
      if (!elevated) {
        if (state === "disabled") {
          containerStyles = {
            ...containerStyles,
            ...styles.containerStateDisabled,
          };
        } else if (state === "focused") {
          containerStyles = {
            ...containerStyles,
            ...styles.containerStateFocused,
          };
        }
      } else {
        containerStyles = getElevatedContainerStyles(containerStyles);
      }
    } else {
      containerStyles = { ...containerStyles, ...styles.containerSelected };
      if (!elevated) {
        if (state === "disabled") {
          containerStyles = {
            ...containerStyles,
            ...styles.containerStateDisabled,
          };
        }
      } else {
        containerStyles = getElevatedContainerStyles(containerStyles);
      }
    }

    if (containerStyle) {
      return { ...containerStyles, ...containerStyle };
    }
    return containerStyles;
  };

  const getElevatedContainerStyles = (containerStyles: ViewStyle) => {
    containerStyles = { ...containerStyles, ...styles.containerTypeElevated };
    if (state === "enabled" || state === "pressed" || state === "focused") {
      containerStyles = { ...containerStyles, ...styles.boxShadowElevation1 };
    } else if (state === "disabled") {
      containerStyles = {
        ...containerStyles,
        ...styles.containerStateDisabled,
      };
    }
    return containerStyles;
  };

  const getStateOverlayStyles = () => {
    let stateOverlayStyles = { ...styles.stateOverlay };
    if (!selected) {
      if (state === "pressed" || state === "focused") {
        stateOverlayStyles = {
          ...stateOverlayStyles,
          ...styles.stateOverlayStateFocusedOrPressed,
        };
      }
    } else {
      if (state === "pressed" || state === "focused") {
        stateOverlayStyles = {
          ...stateOverlayStyles,
          ...styles.stateOverlaySelectedStateFocusedOrPressed,
        };
      }
    }
    if (icon) {
      stateOverlayStyles = {
        ...stateOverlayStyles,
        ...styles.stateOverlayWithIcon,
      };
    }
    return stateOverlayStyles;
  };

  const renderContent = () => {
    return (
      <>
        {icon && (
          <View style={getIconStyles()}>
            <Ionicons
              name={icon}
              size={iconSize}
              color={
                state === "disabled" ? scheme.onSurfaceHex : scheme.primaryHex
              }
            />
          </View>
        )}
        <Text style={getTextStyles()}>{label}</Text>
      </>
    );
  };

  const getIconStyles = () => {
    let iconStyles = { ...styles.icon };
    if (state === "disabled") {
      iconStyles = { ...iconStyles, ...styles.iconStateDisabled };
    }
    return iconStyles;
  };

  const getTextStyles = () => {
    let textStyles = { ...styles.text };
    if (!selected) {
      if (state === "disabled") {
        textStyles = { ...textStyles, ...styles.textStateDisabled };
      }
    } else {
      textStyles = { ...textStyles, ...styles.textSelected };
      if (state === "disabled") {
        textStyles = { ...textStyles, ...styles.textStateDisabled };
      }
    }
    return textStyles;
  };

  return render();
};

const iconSize = 18;

const createStyles = (scheme: ColorScheme, shadows: Shadows) =>
  StyleSheet.create({
    container: {
      backgroundColor: scheme.surfaceHex,
      borderColor: scheme.outlineHex,
      borderWidth: 1,
      borderStyle: "solid",
      borderRadius: 8,
    },
    containerStateFocused: {
      borderColor: scheme.onSurfaceVariantHex,
    },
    containerStateDisabled: {
      borderColor: rgbaWithOpacity(
        scheme.onSurfaceRGB,
        M3Constants.disabledContainerOpacity
      ),
      backgroundColor: undefined,
    },
    containerTypeElevated: {
      borderColor: undefined,
      borderWidth: undefined,
      borderStyle: undefined,
    },
    containerSelected: {
      backgroundColor: scheme.secondaryContainerHex,
      borderColor: undefined,
      borderWidth: undefined,
      borderStyle: undefined,
    },
    stateOverlay: {
      flexDirection: "row",
      alignItems: "center",
      height: 32,
      paddingHorizontal: 16,
      borderRadius: 8,
      justifyContent: "center",
    },
    stateOverlayStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(
        scheme.onSurfaceVariantRGB,
        M3Constants.focusedOrPressedContainerOpacity
      ),
    },
    stateOverlaySelectedStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(
        scheme.onSecondaryContainerRGB,
        M3Constants.focusedOrPressedContainerOpacity
      ),
    },
    stateOverlayWithIcon: {
      paddingLeft: 8,
      paddingRight: 16,
    },
    text: {
      ...M3Constants.labelLargeText,
      color: scheme.onSurfaceVariantHex,
      textAlign: "center",
      textAlignVertical: "center",
    },
    textStateDisabled: {
      color: scheme.onSurfaceHex,
      opacity: M3Constants.disabledContentOpacity,
    },
    textSelected: {
      color: scheme.onSecondaryContainerHex,
    },
    boxShadowElevation1: shadows.boxShadowElevation1,
    icon: {
      marginRight: 8,
    },
    iconStateDisabled: {
      opacity: M3Constants.disabledContentOpacity,
    },
  });
