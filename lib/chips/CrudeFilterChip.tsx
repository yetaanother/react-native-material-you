import React, { FunctionComponent, useContext } from "react";
import {
  ImageStyle,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { SchemeAdapter } from "../providers/SchemeAdapter";
import { ThemeContext } from "../providers/ThemeProvider";
import { rgbaWithOpacity } from "../utils/colorUtils";
import { Ionicons } from "@expo/vector-icons";

interface CrudeFilterChipProps {
  label: string;
  selected?: boolean;
  elevated?: boolean;
  state?: FilterChipState;
  containerStyle?: ViewStyle | TextStyle | ImageStyle;
  dropdown?: boolean;
}

export const CrudeFilterChip: FunctionComponent<CrudeFilterChipProps> = ({
  label,
  selected,
  elevated,
  state,
  containerStyle,
  dropdown,
}) => {
  const scheme = useContext(ThemeContext);
  const styles = createStyles(scheme);

  state = !state ? "enabled" : state;

  const render = () => {
    return (
      <View style={getContainerStyles()}>
        <View style={getStateStyles()}>{renderContent()}</View>
      </View>
    );
  };

  // NOTE: Because of three combinations: state, selected, and elevated keeping thing separated here instead of a 3 layer
  // nested if-else chain
  const getContainerStyles = () => {
    let containerStyles = selected
      ? getSelectedContainerStyles()
      : getUnselectedContainerStyles();
    if (containerStyle) {
      return { ...containerStyles, ...containerStyle };
    }
    return containerStyles;
  };

  const getSelectedContainerStyles = () => {
    let containerStyles: ViewStyle = { ...styles.chipSelected };
    if (state === "hovered") {
      containerStyles = { ...containerStyles, ...styles.boxShadowElevation1 };
    } else if (state === "dragged") {
      containerStyles = { ...containerStyles, ...styles.boxShadowElevation4 };
    } else if (state === "disabled") {
      containerStyles = { ...containerStyles, ...styles.chipSelectedDisabled };
    }
    return containerStyles;
  };

  const getUnselectedContainerStyles = () => {
    let containerStyles: ViewStyle = { ...styles.chip };
    if (state === "disabled") {
      delete containerStyles["backgroundColor"];
      containerStyles = { ...containerStyles, ...styles.chipStateDisabled };
    } else if (state === "focused") {
      containerStyles = { ...containerStyles, ...styles.chipStateFocused };
    } else if (state === "dragged") {
      containerStyles = { ...containerStyles, ...styles.boxShadowElevation4 };
    }
    return containerStyles;
  };

  const getStateStyles = () => {
    return selected ? getSelectedStateStyles() : getUnselectedStateStyles();
  };

  const getSelectedStateStyles = () => {
    let stateStyles = { ...styles.innerSelected };
    if (state === "hovered") {
      stateStyles = { ...stateStyles, ...styles.innerSelectedStateHovered };
    } else if (state === "pressed" || state === "focused") {
      stateStyles = {
        ...stateStyles,
        ...styles.innerSelectedStateFocusedOrPressed,
      };
    } else if (state === "dragged") {
      stateStyles = { ...stateStyles, ...styles.innerSelectedStateDragged };
    }
    return stateStyles;
  };

  const getUnselectedStateStyles = () => {
    let stateStyles = { ...styles.inner };
    if (state === "hovered") {
      stateStyles = { ...stateStyles, ...styles.innerStateHovered };
    } else if (state === "pressed" || state === "focused") {
      stateStyles = { ...stateStyles, ...styles.innerStateFocusedOrPressed };
    } else if (state === "dragged") {
      stateStyles = { ...stateStyles, ...styles.innerStateDragged };
    }
    return stateStyles;
  };

  const renderContent = () => {
    return (
      <>
        {selected && (
          <View style={getLeadingIconStyles()}>
            <Ionicons
              name={"checkmark-sharp"}
              size={18}
              color={
                state === "disabled"
                  ? scheme.onSurfaceHex
                  : scheme.onSecondaryContainerHex
              }
            />
          </View>
        )}
        <Text style={getTextStyles()}>{label}</Text>
      </>
    );
  };

  const getLeadingIconStyles = () => {
    let iconStyles = { ...styles.leadingIcon };
    if (state === "disabled") {
      iconStyles = { ...iconStyles, ...styles.leadingIconStateDisabled };
    }
    return iconStyles;
  };

  const getTextStyles = () => {
    return selected ? getSelectedTextStyles() : getUnselectedTextStyles();
  };

  const getSelectedTextStyles = () => {
    let textStyles = { ...styles.textSelected };
    if (state === "disabled") {
      textStyles = { ...textStyles, ...styles.textSelectedStateDisabled };
    }
    return textStyles;
  };

  const getUnselectedTextStyles = () => {
    let textStyles = { ...styles.text };
    if (
      state === "hovered" ||
      state === "pressed" ||
      state === "dragged" ||
      state === "focused"
    ) {
      textStyles = {
        ...textStyles,
        ...styles.textStateHoveredOrFocussedOrPressedOrDragged,
      };
    } else if (state === "disabled") {
      textStyles = { ...textStyles, ...styles.textStateDisabled };
    }
    return textStyles;
  };

  return render();
};

const createStyles = (scheme: SchemeAdapter) =>
  StyleSheet.create({
    chip: {
      backgroundColor: scheme.surfaceHex,
      borderColor: scheme.outlineHex,
      borderWidth: 1,
      borderStyle: "solid",
      borderRadius: 8,
    },
    chipStateFocused: {
      borderColor: scheme.onSurfaceHex,
    },
    chipStateDisabled: {
      borderColor: rgbaWithOpacity(scheme.onSurfaceRGB, 0.12),
    },
    chipSelected: {
      backgroundColor: scheme.secondaryContainerHex,
      borderRadius: 8,
    },
    chipSelectedDisabled: {
      backgroundColor: rgbaWithOpacity(scheme.onSurfaceRGB, 0.12),
    },
    inner: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 8,
      justifyContent: "center",
    },
    innerStateHovered: {
      backgroundColor: rgbaWithOpacity(scheme.onSurfaceRGB, 0.08),
    },
    innerStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(scheme.onSurfaceRGB, 0.12),
    },
    innerStateDragged: {
      backgroundColor: rgbaWithOpacity(scheme.onSurfaceRGB, 0.16),
    },
    innerSelected: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 6,
      paddingRight: 16,
      paddingLeft: 8,
      borderRadius: 8,
      justifyContent: "center",
    },
    innerSelectedStateHovered: {
      backgroundColor: rgbaWithOpacity(scheme.onSecondaryContainerRGB, 0.08),
    },
    innerSelectedStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(scheme.onSecondaryContainerRGB, 0.12),
    },
    innerSelectedStateDragged: {
      backgroundColor: rgbaWithOpacity(scheme.onSecondaryContainerRGB, 0.16),
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
    boxShadowElevation4: {
      ...Platform.select({
        ios: {
          shadowColor: scheme.shadowHex,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
        },
        android: {
          elevation: 4,
          shadowColor: scheme.shadowHex,
        },
      }),
    },
    text: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "500",
      letterSpacing: 0.1,
      color: scheme.onSurfaceVariantHex,
    },
    textStateHoveredOrFocussedOrPressedOrDragged: {
      color: scheme.onSurfaceHex,
    },
    textStateDisabled: {
      color: scheme.onSurfaceHex,
      opacity: 0.38,
    },
    textSelected: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "500",
      letterSpacing: 0.1,
      color: scheme.onSecondaryContainerHex,
    },
    textSelectedStateDisabled: {
      color: scheme.onSurfaceHex,
      opacity: 0.38,
    },
    leadingIcon: {
      marginRight: 8,
    },
    leadingIconStateDisabled: {
      opacity: 0.38,
    },
  });
