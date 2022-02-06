import React, { FunctionComponent, useContext } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { ThemeContext } from "../providers/ThemeProvider";
import { SchemeAdapter } from "../providers/SchemeAdapter";
import { rgbaWithOpacity } from "../utils/colorUtils";
import { Ionicons } from "@expo/vector-icons";
import { Settings } from "../providers/Settings";
import { M3Constants } from "../utils/M3Constants";

// Assistive chips don't have a selected version
interface CrudeAssistiveChipProps {
  label: string;
  state?: AssistiveChipState;
  containerStyle?: ViewStyle;
  icon?: any;
  elevated?: boolean;
}
// M3 docs: https://m3.material.io/components/chips/specs
export const CrudeAssistiveChip: FunctionComponent<CrudeAssistiveChipProps> = ({
  label,
  state,
  containerStyle,
  icon,
  elevated,
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
      containerStyles = { ...containerStyles, ...styles.containerTypeElevated };
      if (state === "enabled" || state === "pressed" || state === "focused") {
        containerStyles = { ...containerStyles, ...styles.boxShadowElevation1 };
      } else if (state === "disabled") {
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

  const getStateOverlayStyles = () => {
    let stateOverlayStyles = { ...styles.stateOverlay };
    if (state === "pressed" || state === "focused") {
      stateOverlayStyles = {
        ...stateOverlayStyles,
        ...styles.stateOverlayStateFocusedOrPressed,
      };
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
    if (state === "disabled") {
      textStyles = { ...textStyles, ...styles.textStateDisabled };
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
      borderColor: scheme.onSurfaceHex,
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
        scheme.onSurfaceRGB,
        M3Constants.focusedOrPressedContainerOpacity
      ),
    },
    stateOverlayWithIcon: {
      paddingLeft: 8,
      paddingRight: 16,
    },
    text: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "500",
      letterSpacing: 0.1,
      color: scheme.onSurfaceHex,
      textAlign: "center",
      textAlignVertical: "center",
    },
    textStateDisabled: {
      opacity: 0.38,
    },
    boxShadowElevation1: settings.boxShadowElevation1,
    boxShadowElevation2: settings.boxShadowElevation2,
    boxShadowElevation4: settings.boxShadowElevation4,
    icon: {
      marginRight: 8,
    },
    iconStateDisabled: {
      opacity: M3Constants.disabledContentOpacity,
    },
  });
