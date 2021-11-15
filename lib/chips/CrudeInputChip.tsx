import React, { FunctionComponent, useContext } from "react";
import { SchemeAdapter } from "../providers/SchemeAdapter";
import {
  ImageStyle,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { ThemeContext } from "../providers/ThemeProvider";
import { rgbaWithOpacity } from "../utils/colorUtils";
import { Ionicons } from "@expo/vector-icons";

interface ChipProps {
  label: string;
  selected?: boolean;
  state?: ChipState;
  containerStyle?: ViewStyle | TextStyle | ImageStyle;
  leadingIcon?: any;
  trailingIcon?: any;
}

export const CrudeInputChip: FunctionComponent<ChipProps> = ({
  label,
  selected,
  state,
  containerStyle,
  leadingIcon,
  trailingIcon,
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

  const getContainerStyles = () => {
    let containerStyles: ViewStyle = {
      ...styles.chip,
    };
    if (!selected) {
      if (state === "focused") {
        containerStyles = { ...containerStyles, ...styles.chipStateFocused };
      } else if (state === "dragged") {
        containerStyles = { ...containerStyles, ...styles.boxShadowElevation3 };
      }
    } else {
      containerStyles = { ...containerStyles, ...styles.chipSelected };
      delete containerStyles["borderColor"];
      delete containerStyles["borderWidth"];
      delete containerStyles["borderStyle"];

      if (state === "dragged") {
        containerStyles = { ...containerStyles, ...styles.boxShadowElevation3 };
      }
    }

    if (containerStyle) {
      return { ...containerStyles, ...containerStyle };
    }
    return containerStyles;
  };

  const getStateStyles = () => {
    let stateStyles = { ...styles.inner };
    if (!selected) {
      if (state === "hovered") {
        stateStyles = { ...stateStyles, ...styles.innerStateHovered };
      } else if (state === "focused") {
        stateStyles = { ...stateStyles, ...styles.innerStateFocused };
      } else if (state === "dragged") {
        stateStyles = { ...stateStyles, ...styles.innerStateDragged };
      }
    } else {
      if (state === "hovered") {
        stateStyles = { ...stateStyles, ...styles.innerSelectedStateHovered };
      } else if (state === "focused") {
        stateStyles = { ...stateStyles, ...styles.innerSelectedStateFocused };
      } else if (state === "dragged") {
        stateStyles = { ...stateStyles, ...styles.innerSelectedStateDragged };
      }
    }

    if (trailingIcon && leadingIcon) {
      stateStyles = {
        ...stateStyles,
        ...styles.innerWithTrailingAndLeadingIcon,
      };
    } else if (trailingIcon) {
      stateStyles = { ...stateStyles, ...styles.innerWithTrailingIcon };
    } else if (leadingIcon) {
      stateStyles = { ...stateStyles, ...styles.innerWithLeadingIcon };
    }
    return stateStyles;
  };

  const renderContent = () => {
    return (
      <>
        {leadingIcon && (
          <View
            style={selected ? styles.leadingIconSelected : styles.leadingIcon}
          >
            <Ionicons
              name={leadingIcon}
              size={18}
              color={scheme.onPrimaryHex}
            />
          </View>
        )}
        <Text style={getTextStyles()}>{label}</Text>
        {trailingIcon && (
          <View style={styles.trailingIcon}>
            <Ionicons name={trailingIcon} size={18} color={getIconColor()} />
          </View>
        )}
      </>
    );
  };

  const getIconColor = () => {
    return selected ? scheme.onSecondaryContainerHex : scheme.onSurfaceHex;
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
      borderColor: scheme.onSurfaceVariantHex,
    },
    chipSelected: {
      backgroundColor: scheme.secondaryContainerHex,
    },
    inner: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 8,
      justifyContent: "center",
    },
    innerStateHovered: {
      backgroundColor: rgbaWithOpacity(scheme.onSurfaceVariantRGB, 0.08),
    },
    innerStateFocused: {
      backgroundColor: rgbaWithOpacity(scheme.onSurfaceVariantRGB, 0.12),
    },
    innerStateDragged: {
      backgroundColor: rgbaWithOpacity(scheme.onSurfaceVariantRGB, 0.16),
    },
    innerSelectedStateHovered: {
      backgroundColor: rgbaWithOpacity(scheme.onSecondaryContainerRGB, 0.08),
    },
    innerSelectedStateFocused: {
      backgroundColor: rgbaWithOpacity(scheme.onSecondaryContainerRGB, 0.12),
    },
    innerSelectedStateDragged: {
      backgroundColor: rgbaWithOpacity(scheme.onSecondaryContainerRGB, 0.16),
    },
    innerWithTrailingIcon: {
      paddingLeft: 12,
      paddingRight: 8,
    },
    innerWithLeadingIcon: {
      paddingLeft: 4,
      paddingRight: 12,
    },
    innerWithTrailingAndLeadingIcon: {
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
    },
    textSelected: {
      color: scheme.onSecondaryContainerHex,
    },
    // https://ethercreative.github.io/react-native-shadow-generator/
    boxShadowElevation3: {
      ...Platform.select({
        ios: {
          shadowColor: scheme.shadowHex,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
        },
        android: {
          elevation: 3,
          shadowColor: scheme.shadowHex,
        },
      }),
    },
    trailingIcon: {
      marginLeft: 8,
    },
    leadingIcon: {
      marginRight: 8,
      backgroundColor: scheme.onSurfaceVariantHex,
      borderRadius: 100,
      height: 22,
      width: 22,
      alignItems: "center",
      justifyContent: "center",
    },
    leadingIconSelected: {
      marginRight: 8,
      backgroundColor: scheme.onSecondaryContainerHex,
      borderRadius: 100,
      height: 22,
      width: 22,
      alignItems: "center",
      justifyContent: "center",
    },
  });
