import React, { FunctionComponent, useContext } from "react";
import {
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { ThemeContext } from "../providers/ThemeProvider";
import { SchemeAdapter } from "../providers/SchemeAdapter";
import { rgbaWithOpacity } from "../utils/colorUtils";
import { Ionicons } from "@expo/vector-icons";
import { Settings } from "../providers/Settings";

interface CrudeAssistiveChipProps {
  label: string;
  state?: AssistiveChipState;
  containerStyle?: ViewStyle | TextStyle | ImageStyle;
  icon?: any;
  elevated?: boolean;
}

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
        delete containerStyles["backgroundColor"];
        containerStyles = { ...containerStyles, ...styles.chipStateDisabled };
      } else if (state === "focused") {
        containerStyles = { ...containerStyles, ...styles.chipStateFocused };
      }
    } else {
      delete containerStyles["borderColor"];
      delete containerStyles["borderWidth"];
      delete containerStyles["borderStyle"];
      if (state === "enabled" || state === "hovered" || state === "focused") {
        containerStyles = { ...containerStyles, ...styles.boxShadowElevation1 };
      } else if (state === "pressed" || state === "dragged") {
        containerStyles = { ...containerStyles, ...styles.boxShadowElevation2 };
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
    if (state === "hovered") {
      stateStyles = { ...stateStyles, ...styles.innerStateHovered };
    } else if (state === "pressed" || state === "focused") {
      stateStyles = { ...stateStyles, ...styles.innerStateFocusedOrPressed };
    } else if (state === "dragged") {
      stateStyles = { ...stateStyles, ...styles.innerStateDragged };
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
    },
    chipElevatedStateDisabled: {
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
    },
    textStateDisabled: {
      opacity: 0.38,
    },
    boxShadowElevation1: settings.boxShadowElevation1,
    boxShadowElevation2: settings.boxShadowElevation2,
    icon: {
      marginRight: 8,
    },
    iconStateDisabled: {
      opacity: 0.38,
    },
  });
