import React, { FunctionComponent, useContext } from "react";
import { StyleSheet, View, ViewStyle, Text } from "react-native";
import { ThemeContext } from "../providers/ThemeProvider";
import { SchemeAdapter } from "../providers/SchemeAdapter";
import { Settings } from "../providers/Settings";
import { rgbaWithOpacity } from "../utils/colorUtils";
import { Ionicons } from "@expo/vector-icons";
import { M3Constants } from "../utils/M3Constants";

interface CrudeFABProps {
  type?: FABType;
  icon?: any;
  large?: boolean;
  label?: string;
  containerStyle?: ViewStyle;
  state?: FABState;
}

// M3 docs: https://m3.material.io/components/floating-action-button/specs
// M3 docs: https://m3.material.io/components/extended-fab/specs
export const CrudeFAB: FunctionComponent<CrudeFABProps> = ({
  type,
  icon,
  large,
  label,
  containerStyle,
  state,
}) => {
  const { scheme, settings } = useContext(ThemeContext);
  const styles = createStyles(scheme, settings);

  type = !type ? "surface" : type;
  state = !state ? "enabled" : state;

  if (large && label) {
    console.warn("We can't have a large FAB with a label");
    large = false;
  }

  const render = () => {
    return (
      <View style={getContainerStyles()}>
        <View style={getSurfaceOverlayStyles()}>
          <View style={getStateOverlayStyles()}>{renderContent()}</View>
        </View>
      </View>
    );
  };

  const getContainerStyles = () => {
    let containerStyles: ViewStyle = { ...styles.container };
    if (large) {
      containerStyles = { ...containerStyles, ...styles.containerLarge };
    }

    if (type === "primary") {
      containerStyles = { ...containerStyles, ...styles.containerTypePrimary };
    } else if (type === "secondary") {
      containerStyles = {
        ...containerStyles,
        ...styles.containerTypeSecondary,
      };
    } else if (type === "tertiary") {
      containerStyles = { ...containerStyles, ...styles.containerTypeTertiary };
    }

    if (state === "disabled") {
      containerStyles = {
        ...containerStyles,
        ...styles.containerStateDisabled,
      };
    } else if (
      state === "enabled" ||
      state === "focused" ||
      state === "pressed"
    ) {
      containerStyles = { ...containerStyles, ...styles.boxShadowElevation3 };
    } else if (state === "hovered") {
      containerStyles = { ...containerStyles, ...styles.boxShadowElevation4 };
    }

    if (containerStyle) {
      return { ...containerStyles, ...containerStyle };
    }
    return containerStyles;
  };

  const getSurfaceOverlayStyles = () => {
    let surfaceOverlayStyles = { ...styles.surfaceOverlay };
    if (large) {
      surfaceOverlayStyles = {
        ...surfaceOverlayStyles,
        ...styles.surfaceOverlayLarge,
      };
    }

    if (type === "surface") {
      if (state == "enabled" || state === "pressed" || state === "focused") {
        surfaceOverlayStyles = {
          ...surfaceOverlayStyles,
          ...styles.surfaceOverlayTypeEnabledOrPressedOrFocused,
        };
      }
    }
    return surfaceOverlayStyles;
  };

  const getStateOverlayStyles = () => {
    let stateStyles = { ...styles.stateOverlay };
    if (large) {
      stateStyles = { ...stateStyles, ...styles.stateOverlayLarge };
    } else if (label) {
      stateStyles = { ...stateStyles, ...styles.stateOverlayWithText };
    }

    if (type === "surface") {
      if (state === "focused" || state === "pressed") {
        stateStyles = {
          ...stateStyles,
          ...styles.stateOverlayStateFocusedOrPressed,
        };
      }
    } else if (type === "primary") {
      if (state === "focused" || state === "pressed") {
        stateStyles = {
          ...stateStyles,
          ...styles.stateOverlayTypePrimaryStateFocusedOrPressed,
        };
      }
    } else if (type === "secondary") {
      if (state === "focused" || state === "pressed") {
        stateStyles = {
          ...stateStyles,
          ...styles.stateOverlayTypeSecondaryStateFocusedOrPressed,
        };
      }
    } else if (type === "tertiary") {
      if (state === "focused" || state === "pressed") {
        stateStyles = {
          ...stateStyles,
          ...styles.stateOverlayTypeTertiaryStateFocusedOrPressed,
        };
      }
    }
    return stateStyles;
  };

  const renderContent = () => {
    return (
      <>
        <Ionicons
          name={!icon ? "pencil-sharp" : icon}
          size={large ? iconSizeLarge : iconSize}
          color={getIconColor()}
          style={
            state === "disabled"
              ? { opacity: M3Constants.disabledContentOpacity }
              : {}
          }
        />
        {label && <Text style={getTextStyles()}>{label}</Text>}
      </>
    );
  };

  const getIconColor = () => {
    if (state === "disabled") {
      return scheme.onSurfaceHex;
    } else if (type === "surface") {
      return scheme.primaryHex;
    } else if (type === "primary") {
      return scheme.onPrimaryContainerHex;
    } else if (type === "secondary") {
      return scheme.onSecondaryContainerHex;
    } else if (type === "tertiary") {
      return scheme.onTertiaryContainerHex;
    }
  };

  const getTextStyles = () => {
    let textStyles = { ...styles.text };
    if (state === "disabled") {
      textStyles = { ...textStyles, ...styles.textDisabled };
    } else if (type === "primary") {
      textStyles = { ...textStyles, ...styles.textPrimary };
    } else if (type === "secondary") {
      textStyles = { ...textStyles, ...styles.textSecondary };
    } else if (type === "tertiary") {
      textStyles = { ...textStyles, ...styles.textTertiary };
    }
    return textStyles;
  };

  return render();
};

const iconSize = 24;
const iconSizeLarge = 36;

const createStyles = (scheme: SchemeAdapter, settings: Settings) =>
  StyleSheet.create({
    container: {
      borderRadius: 16,
      backgroundColor: scheme.surfaceHex,
    },
    containerLarge: {
      borderRadius: 28,
    },
    containerStateDisabled: {
      backgroundColor: rgbaWithOpacity(
        scheme.onSurfaceRGB,
        M3Constants.disabledContainerOpacity
      ),
    },
    containerTypePrimary: {
      backgroundColor: scheme.primaryContainerHex,
    },
    containerTypeSecondary: {
      backgroundColor: scheme.secondaryContainerHex,
    },
    containerTypeTertiary: {
      backgroundColor: scheme.tertiaryContainerHex,
    },
    boxShadowElevation3: settings.boxShadowElevation3,
    boxShadowElevation4: settings.boxShadowElevation4,
    surfaceOverlay: {
      borderRadius: 16,
      overflow: "hidden",
    },
    surfaceOverlayLarge: {
      borderRadius: 28,
    },
    surfaceOverlayTypeEnabledOrPressedOrFocused: {
      backgroundColor: rgbaWithOpacity(
        scheme.primaryRGB,
        M3Constants.surface3ContainerOpacity
      ),
    },
    stateOverlay: {
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      borderRadius: 16,
      paddingHorizontal: 16,
      height: 56,
    },
    stateOverlayLarge: {
      borderRadius: 28,
      paddingHorizontal: 30,
      height: 96,
    },
    stateOverlayWithText: {
      paddingLeft: 16,
      paddingRight: 20,
      flexDirection: "row",
    },
    text: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "500",
      letterSpacing: 0.1,
      color: scheme.primaryHex,
      marginLeft: 12,
      textAlign: "center",
      textAlignVertical: "center",
    },
    textPrimary: {
      color: scheme.onPrimaryContainerHex,
    },
    textSecondary: {
      color: scheme.onSecondaryContainerHex,
    },
    textTertiary: {
      color: scheme.onTertiaryContainerHex,
    },
    textDisabled: {
      color: rgbaWithOpacity(
        scheme.onSurfaceRGB,
        M3Constants.disabledContentOpacity
      ),
    },
    stateOverlayStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(
        scheme.primaryRGB,
        M3Constants.focusedOrPressedContainerOpacity
      ),
    },
    stateOverlayTypePrimaryStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(
        scheme.onPrimaryContainerRGB,
        M3Constants.focusedOrPressedContainerOpacity
      ),
    },
    stateOverlayTypeSecondaryStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(
        scheme.onSecondaryContainerRGB,
        M3Constants.focusedOrPressedContainerOpacity
      ),
    },
    stateOverlayTypeTertiaryStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(
        scheme.onTertiaryContainerRGB,
        M3Constants.focusedOrPressedContainerOpacity
      ),
    },
  });
