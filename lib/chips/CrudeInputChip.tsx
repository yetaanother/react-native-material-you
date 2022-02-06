import React, { FunctionComponent, useContext } from "react";
import { SchemeAdapter } from "../providers/SchemeAdapter";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { ThemeContext } from "../providers/ThemeProvider";
import { rgbaWithOpacity } from "../utils/colorUtils";
import { Ionicons } from "@expo/vector-icons";
import { Settings } from "../providers/Settings";
import { M3Constants } from "../utils/M3Constants";

// Input chips don't have an elevated version
// In the specs it is mentioned that we an also use an icon instead of avatar. If it is the case then paddingLeft
// will change to 8 instead of 4. But right now I am not implementing it.
// Guidelines for 'selected' version are not given in specs
interface CrudeInputChipProps {
  label: string;
  selected?: boolean;
  state?: InputChipState;
  containerStyle?: ViewStyle;
  closeable?: boolean;
  onClosePress?: () => void;
  avatar?: boolean;
}

// M3 docs: https://m3.material.io/components/chips/specs
export const CrudeInputChip: FunctionComponent<CrudeInputChipProps> = ({
  label,
  selected,
  state,
  containerStyle,
  closeable,
  onClosePress,
  avatar,
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
    let containerStyles: ViewStyle = {
      ...styles.container,
    };
    if (!selected) {
      if (state === "focused") {
        containerStyles = {
          ...containerStyles,
          ...styles.containerStateFocused,
        };
      }
    } else {
      containerStyles = { ...containerStyles, ...styles.containerSelected };
    }

    if (containerStyle) {
      return { ...containerStyles, ...containerStyle };
    }
    return containerStyles;
  };

  const getStateOverlayStyles = () => {
    let stateOverlayStyles = { ...styles.stateOverlay };
    if (!selected) {
      if (state === "focused") {
        stateOverlayStyles = {
          ...stateOverlayStyles,
          ...styles.stateOverlayStateFocused,
        };
      }
    } else {
      if (state === "focused") {
        stateOverlayStyles = {
          ...stateOverlayStyles,
          ...styles.stateOverlaySelectedStateFocused,
        };
      }
    }

    if (closeable && avatar) {
      stateOverlayStyles = {
        ...stateOverlayStyles,
        ...styles.stateOverlayWithTrailingAndLeadingIcon,
      };
    } else if (closeable) {
      stateOverlayStyles = {
        ...stateOverlayStyles,
        ...styles.stateOverlayWithTrailingIcon,
      };
    } else if (avatar) {
      stateOverlayStyles = {
        ...stateOverlayStyles,
        ...styles.stateOverlayWithLeadingIcon,
      };
    }
    return stateOverlayStyles;
  };

  const renderContent = () => {
    return (
      <>
        {avatar && (
          <View
            style={selected ? styles.leadingIconSelected : styles.leadingIcon}
          >
            <Ionicons
              name={selected ? "checkmark-sharp" : "person-sharp"}
              size={iconSize}
              color={scheme.onPrimaryHex}
            />
          </View>
        )}
        <Text style={getTextStyles()}>{label}</Text>
        {closeable && (
          <View style={styles.trailingIcon}>
            <Ionicons
              name={"close"}
              size={iconSize}
              color={getIconColor()}
              onPress={onClosePress}
            />
          </View>
        )}
      </>
    );
  };

  const getIconColor = () => {
    // Usually icon color follows text color but here it is not
    return selected
      ? scheme.onSecondaryContainerHex
      : scheme.onSurfaceVariantHex;
  };

  const getTextStyles = () => {
    let textStyles = { ...styles.text };
    if (selected) {
      textStyles = { ...textStyles, ...styles.textSelected };
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
      paddingHorizontal: 12,
      borderRadius: 8,
      justifyContent: "center",
    },
    stateOverlayStateFocused: {
      backgroundColor: rgbaWithOpacity(
        scheme.onSurfaceVariantRGB,
        M3Constants.focusedOrPressedContainerOpacity
      ),
    },
    stateOverlaySelectedStateFocused: {
      backgroundColor: rgbaWithOpacity(
        scheme.onSecondaryContainerRGB,
        M3Constants.focusedOrPressedContainerOpacity
      ),
    },
    stateOverlayWithTrailingIcon: {
      paddingLeft: 12,
      paddingRight: 8,
    },
    stateOverlayWithLeadingIcon: {
      paddingLeft: 4,
      paddingRight: 12,
    },
    stateOverlayWithTrailingAndLeadingIcon: {
      paddingLeft: 4,
      paddingRight: 8,
    },
    text: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "500",
      letterSpacing: 0.1,
      color: scheme.onSurfaceVariantHex,
      textAlign: "center",
      textAlignVertical: "center",
    },
    textSelected: {
      color: scheme.onSecondaryContainerHex,
    },
    boxShadowElevation4: settings.boxShadowElevation4,
    trailingIcon: {
      marginLeft: 8,
    },
    leadingIcon: {
      marginRight: 8,
      backgroundColor: scheme.onSurfaceVariantHex,
      borderRadius: 100,
      height: 24,
      width: 24,
      alignItems: "center",
      justifyContent: "center",
    },
    leadingIconSelected: {
      marginRight: 8,
      backgroundColor: scheme.onSecondaryContainerHex,
      borderRadius: 100,
      height: 24,
      width: 24,
      alignItems: "center",
      justifyContent: "center",
    },
  });
