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
      } else if (state === "hovered") {
        layer2Styles = { ...layer2Styles, ...styles.fabLayer2TypeHovered };
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
      if (state === "hovered") {
        stateStyles = { ...stateStyles, ...styles.innerStateHovered };
      } else if (state === "focused" || state === "pressed") {
        stateStyles = { ...stateStyles, ...styles.innerStateFocusedOrPressed };
      }
    } else if (type === "primary") {
      if (state === "hovered") {
        stateStyles = {
          ...stateStyles,
          ...styles.innerTypePrimaryStateHovered,
        };
      } else if (state === "focused" || state === "pressed") {
        stateStyles = {
          ...stateStyles,
          ...styles.innerTypePrimaryStateFocusedOrPressed,
        };
      }
    } else if (type === "secondary") {
      if (state === "hovered") {
        stateStyles = {
          ...stateStyles,
          ...styles.innerTypeSecondaryStateHovered,
        };
      } else if (state === "focused" || state === "pressed") {
        stateStyles = {
          ...stateStyles,
          ...styles.innerTypeSecondaryStateFocusedOrPressed,
        };
      }
    } else if (type === "tertiary") {
      if (state === "hovered") {
        stateStyles = {
          ...stateStyles,
          ...styles.innerTypeTertiaryStateHovered,
        };
      } else if (state === "focused" || state === "pressed") {
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

// NOTE: Container height and width will be 56 = paddingTop(16) + paddingBottom(16) + iconSize(24)
// NOTE: Container height and width for large FAB will be 96 = paddingTop(30) + paddingBottom(30) + iconSize(36)
// todo check, minimum width of the extended fab is 80 here: https://m3.material.io/components/extended-fab/specs
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
    fabLayer2TypeHovered: {
      backgroundColor: rgbaWithOpacity(scheme.primaryRGB, 0.12),
    },
    inner: {
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      borderRadius: 16,
      padding: 16,
    },
    innerLarge: {
      borderRadius: 28,
      padding: 30,
    },
    innerWithText: {
      paddingVertical: 16,
      paddingLeft: 16,
      paddingRight: 20,
      display: "flex",
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
    innerStateHovered: {
      backgroundColor: rgbaWithOpacity(scheme.primaryRGB, 0.08),
    },
    innerStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(scheme.primaryRGB, 0.12),
    },
    innerTypePrimaryStateHovered: {
      backgroundColor: rgbaWithOpacity(scheme.onPrimaryContainerRGB, 0.08),
    },
    innerTypePrimaryStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(scheme.onPrimaryContainerRGB, 0.12),
    },
    innerTypeSecondaryStateHovered: {
      backgroundColor: rgbaWithOpacity(scheme.onSecondaryContainerRGB, 0.08),
    },
    innerTypeSecondaryStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(scheme.onSecondaryContainerRGB, 0.12),
    },
    innerTypeTertiaryStateHovered: {
      backgroundColor: rgbaWithOpacity(scheme.onTertiaryContainerRGB, 0.08),
    },
    innerTypeTertiaryStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(scheme.onTertiaryContainerRGB, 0.12),
    },
  });
