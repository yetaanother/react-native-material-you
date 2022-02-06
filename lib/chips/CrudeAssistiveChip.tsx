import React, { FunctionComponent, useContext } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { ThemeContext } from "../providers/ThemeProvider";
import { SchemeAdapter } from "../providers/SchemeAdapter";
import { rgbaWithOpacity } from "../utils/colorUtils";
import { Ionicons } from "@expo/vector-icons";
import { Settings } from "../providers/Settings";

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
        <View style={getStateStyles()}>{renderContent()}</View>
      </View>
    );
  };

  const getContainerStyles = () => {
    let containerStyles: ViewStyle = { ...styles.chip };
    if (!elevated) {
      if (state === "disabled") {
        containerStyles = { ...containerStyles, ...styles.chipStateDisabled };
      } else if (state === "focused") {
        containerStyles = { ...containerStyles, ...styles.chipStateFocused };
      }
    } else {
      containerStyles = { ...containerStyles, ...styles.chipTypeElevated };
      if (state === "enabled" || state === "pressed" || state === "focused") {
        containerStyles = { ...containerStyles, ...styles.boxShadowElevation1 };
      } else if (state === "disabled") {
        containerStyles = {
          ...containerStyles,
          ...styles.chipElevatedStateDisabled,
        };
      }
    }

    if (containerStyle) {
      return { ...containerStyles, ...containerStyle };
    }
    return containerStyles;
  };

  const getStateStyles = () => {
    let stateStyles = { ...styles.inner };
    if (state === "pressed" || state === "focused") {
      stateStyles = { ...stateStyles, ...styles.innerStateFocusedOrPressed };
    }
    if (icon) {
      stateStyles = { ...stateStyles, ...styles.innerWithIcon };
    }
    return stateStyles;
  };

  const renderContent = () => {
    return (
      <>
        {icon && (
          <View style={getIconStyles()}>
            <Ionicons
              name={icon}
              size={18}
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

const createStyles = (scheme: SchemeAdapter, settings: Settings) =>
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
      backgroundColor: undefined,
    },
    chipTypeElevated: {
      borderColor: undefined,
      borderWidth: undefined,
      borderStyle: undefined,
    },
    chipElevatedStateDisabled: {
      backgroundColor: rgbaWithOpacity(scheme.onSurfaceRGB, 0.12),
    },
    inner: {
      flexDirection: "row",
      alignItems: "center",
      height: 32,
      paddingHorizontal: 16,
      borderRadius: 8,
      justifyContent: "center",
    },
    innerStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(scheme.onSurfaceRGB, 0.12),
    },
    innerStateDragged: {
      backgroundColor: rgbaWithOpacity(scheme.onSurfaceRGB, 0.16),
    },
    innerWithIcon: {
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
      opacity: 0.38,
    },
  });
