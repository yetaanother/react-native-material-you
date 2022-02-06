import React, { FunctionComponent, useContext } from "react";
import { StyleSheet, View, ViewStyle, Text } from "react-native";
import { ThemeContext } from "../providers/ThemeProvider";
import { SchemeAdapter } from "../providers/SchemeAdapter";
import { Settings } from "../providers/Settings";
import { rgbaWithOpacity } from "../utils/colorUtils";
import { Ionicons } from "@expo/vector-icons";

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
        <View style={getLayer2Styles()}>
          <View style={getStateStyles()}>
            <Ionicons
              name={!icon ? "pencil-sharp" : icon}
              size={large ? 36 : 24}
              color={getIconColor()}
              style={state === "disabled" ? { opacity: 0.38 } : {}}
            />
            {label && <Text style={getTextStyles()}>{label}</Text>}
          </View>
        </View>
      </View>
    );
  };

  const getContainerStyles = () => {
    let containerStyles: ViewStyle = { ...styles.fab };
    if (large) {
      containerStyles = { ...containerStyles, ...styles.fabLarge };
    }

    if (type === "primary") {
      containerStyles = { ...containerStyles, ...styles.fabTypePrimary };
    } else if (type === "secondary") {
      containerStyles = { ...containerStyles, ...styles.fabTypeSecondary };
    } else if (type === "tertiary") {
      containerStyles = { ...containerStyles, ...styles.fabTypeTertiary };
    }

    if (state === "disabled") {
      containerStyles = { ...containerStyles, ...styles.fabStateDisabled };
    } else if (
      state === "enabled" ||
      state === "focused" ||
      state === "pressed"
    ) {
      containerStyles = { ...containerStyles, ...styles.boxShadowElevation3 };
    } else if (state === "hovered") {
      containerStyles = { ...containerStyles, ...styles.boxShadowElevation4 };
    }

    return containerStyle
      ? { ...containerStyles, ...containerStyle }
      : containerStyles;
  };

  const getLayer2Styles = () => {
    let layer2Styles = { ...styles.fabLayer2 };
    if (large) {
      layer2Styles = { ...layer2Styles, ...styles.fabLayer2Large };
    }

    if (type === "surface") {
      if (state == "enabled" || state === "pressed" || state === "focused") {
        layer2Styles = {
          ...layer2Styles,
          ...styles.fabLayer2TypeEnabledOrPressedOrFocused,
        };
      }
    }
    return layer2Styles;
  };

  const getStateStyles = () => {
    let stateStyles = { ...styles.inner };
    if (large) {
      stateStyles = { ...stateStyles, ...styles.innerLarge };
    } else if (label) {
      stateStyles = { ...stateStyles, ...styles.innerWithText };
    }

    if (type === "surface") {
      if (state === "focused" || state === "pressed") {
        stateStyles = { ...stateStyles, ...styles.innerStateFocusedOrPressed };
      }
    } else if (type === "primary") {
      if (state === "focused" || state === "pressed") {
        stateStyles = {
          ...stateStyles,
          ...styles.innerTypePrimaryStateFocusedOrPressed,
        };
      }
    } else if (type === "secondary") {
      if (state === "focused" || state === "pressed") {
        stateStyles = {
          ...stateStyles,
          ...styles.innerTypeSecondaryStateFocusedOrPressed,
        };
      }
    } else if (type === "tertiary") {
      if (state === "focused" || state === "pressed") {
        stateStyles = {
          ...stateStyles,
          ...styles.innerTypeTertiaryStateFocusedOrPressed,
        };
      }
    }
    return stateStyles;
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

const createStyles = (scheme: SchemeAdapter, settings: Settings) =>
  StyleSheet.create({
    fab: {
      borderRadius: 16,
      backgroundColor: scheme.surfaceHex,
    },
    fabLarge: {
      borderRadius: 28,
    },
    fabStateDisabled: {
      backgroundColor: rgbaWithOpacity(scheme.onSurfaceRGB, 0.12),
    },
    fabTypePrimary: {
      backgroundColor: scheme.primaryContainerHex,
    },
    fabTypeSecondary: {
      backgroundColor: scheme.secondaryContainerHex,
    },
    fabTypeTertiary: {
      backgroundColor: scheme.tertiaryContainerHex,
    },
    boxShadowElevation3: settings.boxShadowElevation3,
    boxShadowElevation4: settings.boxShadowElevation4,
    fabLayer2: {
      borderRadius: 16,
      overflow: "hidden",
    },
    fabLayer2Large: {
      borderRadius: 28,
    },
    fabLayer2TypeEnabledOrPressedOrFocused: {
      backgroundColor: rgbaWithOpacity(scheme.primaryRGB, 0.11),
    },
    inner: {
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      borderRadius: 16,
      paddingHorizontal: 16,
      height: 56,
    },
    innerLarge: {
      borderRadius: 28,
      paddingHorizontal: 30,
      height: 96,
    },
    innerWithText: {
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
      color: rgbaWithOpacity(scheme.onSurfaceRGB, 0.38),
    },
    innerStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(scheme.primaryRGB, 0.12),
    },
    innerTypePrimaryStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(scheme.onPrimaryContainerRGB, 0.12),
    },
    innerTypeSecondaryStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(scheme.onSecondaryContainerRGB, 0.12),
    },
    innerTypeTertiaryStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(scheme.onTertiaryContainerRGB, 0.12),
    },
  });
