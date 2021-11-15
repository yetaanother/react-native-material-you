import React, { FunctionComponent, useContext } from "react";
import { SchemeAdapter } from "../providers/SchemeAdapter";
import {
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { ThemeContext } from "../providers/ThemeProvider";
import { rgbaWithOpacity } from "../utils/colorUtils";
import { Ionicons } from "@expo/vector-icons";
import { Settings } from "../providers/Settings";

interface CrudeInputChipProps {
  label: string;
  selected?: boolean;
  state?: InputChipState;
  containerStyle?: ViewStyle | TextStyle | ImageStyle;
  closeable?: boolean;
  onClosePress?: () => void;
  avatar?: boolean;
}

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

    if (closeable && avatar) {
      stateStyles = {
        ...stateStyles,
        ...styles.innerWithTrailingAndLeadingIcon,
      };
    } else if (closeable) {
      stateStyles = { ...stateStyles, ...styles.innerWithTrailingIcon };
    } else if (avatar) {
      stateStyles = { ...stateStyles, ...styles.innerWithLeadingIcon };
    }
    return stateStyles;
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
              size={18}
              color={scheme.onPrimaryHex}
            />
          </View>
        )}
        <Text style={getTextStyles()}>{label}</Text>
        {closeable && (
          <View style={styles.trailingIcon}>
            <Ionicons
              name={"close"}
              size={18}
              color={getIconColor()}
              onPress={onClosePress}
            />
          </View>
        )}
      </>
    );
  };

  // Usually icon color follows text color but here it is not
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
    boxShadowElevation3: settings.boxShadowElevation3,
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
