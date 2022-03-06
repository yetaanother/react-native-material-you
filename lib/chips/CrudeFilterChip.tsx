import React, { FunctionComponent, useContext } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { SchemeAdapter } from "../providers/SchemeAdapter";
import { ThemeContext } from "../providers/ThemeProvider";
import { rgbaWithOpacity } from "../utils/colorUtils";
import { Ionicons } from "@expo/vector-icons";
import { Settings } from "../providers/Settings";
import { M3Constants } from "../utils/M3Constants";

interface CrudeFilterChipProps {
  label: string;
  selected?: boolean;
  elevated?: boolean;
  state?: FilterChipState;
  containerStyle?: ViewStyle;
  dropdown?: boolean;
}

// M3 docs: https://m3.material.io/components/chips/specs
export const CrudeFilterChip: FunctionComponent<CrudeFilterChipProps> = ({
  label,
  selected,
  elevated,
  state,
  containerStyle,
  dropdown,
}) => {
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
    if (state === "enabled" || state === "focused" || state === "pressed") {
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
      stateOverlayStyles = {
        ...stateOverlayStyles,
        ...styles.stateOverlaySelected,
      };
      if (state === "pressed" || state === "focused") {
        stateOverlayStyles = {
          ...stateOverlayStyles,
          ...styles.stateOverlaySelectedStateFocusedOrPressed,
        };
      }
    }
    if (dropdown) {
      if (selected) {
        stateOverlayStyles = {
          ...stateOverlayStyles,
          ...styles.stateOverlaySelectedDropDown,
        };
      } else {
        stateOverlayStyles = {
          ...stateOverlayStyles,
          ...styles.stateOverlayDropDown,
        };
      }
    }
    return stateOverlayStyles;
  };

  const renderContent = () => {
    let textStyles = getTextStyles();
    let iconColor = textStyles.color;
    return (
      <>
        {selected && (
          <View style={getLeadingIconStyles()}>
            <Ionicons
              name={"checkmark-sharp"}
              size={iconSize}
              color={iconColor}
            />
          </View>
        )}
        <Text style={textStyles}>{label}</Text>

        {dropdown && (
          <View style={getTrailingIconStyles()}>
            <Ionicons
              name={"caret-down-sharp"}
              size={iconSize}
              color={
                state === "enabled" ? scheme.onSurfaceVariantHex : iconColor
              }
            />
          </View>
        )}
      </>
    );
  };

  const getLeadingIconStyles = () => {
    let iconStyles = { ...styles.leadingIcon };
    if (state === "disabled") {
      iconStyles = { ...iconStyles, ...styles.iconStateDisabled };
    }
    return iconStyles;
  };

  const getTrailingIconStyles = () => {
    let iconStyles = { ...styles.trailingIcon };
    if (state === "disabled") {
      iconStyles = { ...iconStyles, ...styles.iconStateDisabled };
    }
    return iconStyles;
  };

  const getTextStyles = () => {
    let textStyles = { ...styles.text };
    if (!selected) {
      if (state === "pressed" || state === "focused") {
        textStyles = {
          ...textStyles,
          ...styles.textStateFocussedOrPressed,
        };
      } else if (state === "disabled") {
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
    stateOverlayDropDown: {
      paddingRight: 8,
      paddingLeft: 16,
    },
    stateOverlaySelected: {
      paddingRight: 16,
      paddingLeft: 8,
    },
    stateOverlaySelectedDropDown: {
      paddingRight: 8,
      paddingLeft: 8,
    },
    stateOverlaySelectedStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(
        scheme.onSecondaryContainerRGB,
        M3Constants.focusedOrPressedContainerOpacity
      ),
    },
    boxShadowElevation1: settings.boxShadowElevation1,
    boxShadowElevation2: settings.boxShadowElevation2,
    boxShadowElevation4: settings.boxShadowElevation4,
    text: {
      ...M3Constants.labelLargeText,
      color: scheme.onSurfaceVariantHex,
      textAlign: "center",
      textAlignVertical: "center",
    },
    textStateFocussedOrPressed: {
      color: scheme.onSurfaceVariantHex,
    },
    textStateDisabled: {
      color: scheme.onSurfaceHex,
      opacity: M3Constants.disabledContentOpacity,
    },
    textSelected: {
      color: scheme.onSecondaryContainerHex,
    },
    leadingIcon: {
      marginRight: 8,
    },
    trailingIcon: {
      marginLeft: 8,
    },
    iconStateDisabled: {
      opacity: M3Constants.disabledContentOpacity,
    },
  });
