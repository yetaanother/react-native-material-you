import React, { FunctionComponent, useContext } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { ThemeContext } from "../providers/ThemeProvider";
import { SchemeAdapter } from "../providers/SchemeAdapter";
import { Settings } from "../providers/Settings";
import { rgbaWithOpacity } from "../utils/colorUtils";
import { Ionicons } from "@expo/vector-icons";
import { M3Constants } from "../utils/M3Constants";

// Guidelines for 'selected' version are not given in specs
interface CrudeSuggestiveChipProps {
  label: string;
  selected?: boolean;
  elevated?: boolean;
  state?: SuggestiveChipState;
  icon?: any;
  containerStyle?: ViewStyle;
}

// M3 docs: https://m3.material.io/components/chips/specs
export const CrudeSuggestiveChip: FunctionComponent<
  CrudeSuggestiveChipProps
> = ({ label, selected, elevated, state, icon, containerStyle }) => {
  const { scheme, settings } = useContext(ThemeContext);
  const styles = createStyles(scheme, settings);

  state = !state ? "enabled" : state;

  const render = () => {
    return (
      <View style={getContainerStyles()}>
        <View style={getStateOverlayStyles()}>{renderContent()}</View>
      </View>
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

const createStyles = (scheme: SchemeAdapter, settings: Settings) =>
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
    boxShadowElevation1: settings.boxShadowElevation1,
    icon: {
      marginRight: 8,
    },
    iconStateDisabled: {
      opacity: M3Constants.disabledContentOpacity,
    },
  });
