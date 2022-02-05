import React, { FunctionComponent, useContext } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { SchemeAdapter } from "../providers/SchemeAdapter";
import { ThemeContext } from "../providers/ThemeProvider";
import { rgbaWithOpacity } from "../utils/colorUtils";
import { Ionicons } from "@expo/vector-icons";
import { Settings } from "../providers/Settings";

interface CrudeFilterChipProps {
  label: string;
  selected?: boolean;
  elevated?: boolean;
  state?: FilterChipState;
  containerStyle?: ViewStyle;
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
    if (!selected) {
      if (!elevated) {
        if (state === "disabled") {
          delete containerStyles["backgroundColor"];
          containerStyles = { ...containerStyles, ...styles.chipStateDisabled };
        } else if (state === "focused") {
          containerStyles = { ...containerStyles, ...styles.chipStateFocused };
        } else if (state === "dragged") {
          // todo check, no mention of elevation here: https://m3.material.io/components/chips/specs
          containerStyles = {
            ...containerStyles,
            ...styles.boxShadowElevation4,
          };
        }
      } else {
        delete containerStyles["borderColor"];
        delete containerStyles["borderWidth"];
        delete containerStyles["borderStyle"];
        containerStyles = getElevatedContainerStyles(containerStyles);
      }
    } else {
      delete containerStyles["borderColor"];
      delete containerStyles["borderWidth"];
      delete containerStyles["borderStyle"];
      containerStyles = { ...containerStyles, ...styles.chipSelected };
      if (!elevated) {
        if (state === "hovered") {
          containerStyles = {
            ...containerStyles,
            ...styles.boxShadowElevation1,
          };
        } else if (state === "dragged") {
          containerStyles = {
            ...containerStyles,
            ...styles.boxShadowElevation4,
          };
        } else if (state === "disabled") {
          containerStyles = {
            ...containerStyles,
            ...styles.chipSelectedDisabled,
          };
        }
      } else {
        containerStyles = getElevatedContainerStyles(containerStyles);
      }
    }
    if (containerStyle) {
      return { ...containerStyles, ...containerStyle };
    }
    return containerStyles;
  };

  const getElevatedContainerStyles = (containerStyles: ViewStyle) => {
    if (state === "enabled" || state === "focused" || state === "pressed") {
      containerStyles = { ...containerStyles, ...styles.boxShadowElevation1 };
    } else if (state === "hovered") {
      containerStyles = {
        ...containerStyles,
        ...styles.boxShadowElevation2,
      };
    } else if (state === "dragged") {
      containerStyles = {
        ...containerStyles,
        ...styles.boxShadowElevation4,
      };
    } else if (state === "disabled") {
      containerStyles = {
        ...containerStyles,
        ...styles.chipElevatedStateDisabled,
      };
    }
    return containerStyles;
  };

  const getStateStyles = () => {
    let stateStyles = { ...styles.inner };
    if (!selected) {
      if (state === "hovered") {
        stateStyles = { ...stateStyles, ...styles.innerStateHovered };
      } else if (state === "pressed" || state === "focused") {
        stateStyles = { ...stateStyles, ...styles.innerStateFocusedOrPressed };
      } else if (state === "dragged") {
        stateStyles = { ...stateStyles, ...styles.innerStateDragged };
      }
    } else {
      stateStyles = { ...stateStyles, ...styles.innerSelected };
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
    }
    if (dropdown) {
      if (selected) {
        stateStyles = { ...stateStyles, ...styles.innerSelectedDropDown };
      } else {
        stateStyles = { ...stateStyles, ...styles.innerDropDown };
      }
    }
    return stateStyles;
  };

  const renderContent = () => {
    let textStyles = getTextStyles();
    let iconColor = textStyles.color;
    return (
      <>
        {selected && (
          <View style={getLeadingIconStyles()}>
            <Ionicons name={"checkmark-sharp"} size={18} color={iconColor} />
          </View>
        )}
        <Text style={textStyles}>{label}</Text>

        {dropdown && (
          <View style={getTrailingIconStyles()}>
            <Ionicons
              name={"caret-down-sharp"}
              size={18}
              //todo check,icon color is surface variant here: https://m3.material.io/components/chips/specs
              color={state === "enabled" ? scheme.onSurfaceHex : iconColor}
            />
          </View>
        )}
      </>
    );
  };

  const getLeadingIconStyles = () => {
    let iconStyles = { ...styles.leadingIcon };
    if (state === "disabled") {
      iconStyles = { ...iconStyles, ...styles.iconStateDisabled };
    }
    return iconStyles;
  };

  const getTrailingIconStyles = () => {
    let iconStyles = { ...styles.trailingIcon };
    if (state === "disabled") {
      iconStyles = { ...iconStyles, ...styles.iconStateDisabled };
    }
    return iconStyles;
  };

  const getTextStyles = () => {
    let textStyles = { ...styles.text };
    if (!selected) {
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
    } else {
      textStyles = { ...textStyles, ...styles.textSelected };
      if (state === "disabled") {
        textStyles = { ...textStyles, ...styles.textStateDisabled };
      }
    }
    return textStyles;
  };

  return render();
};

// todo check: text is start aligned horizontally here: https://m3.material.io/components/chips/specs
const createStyles = (scheme: SchemeAdapter, settings: Settings) =>
  StyleSheet.create({
    chip: {
      backgroundColor: scheme.surfaceHex,
      borderColor: scheme.outlineHex,
      borderWidth: 1,
      borderStyle: "solid",
      borderRadius: 8,
    },
    //todo check, it is onSurfaceVariant here: https://m3.material.io/components/chips/specs
    chipStateFocused: {
      borderColor: scheme.onSurfaceHex,
    },
    chipStateDisabled: {
      borderColor: rgbaWithOpacity(scheme.onSurfaceRGB, 0.12),
    },
    chipElevatedStateDisabled: {
      backgroundColor: rgbaWithOpacity(scheme.onSurfaceRGB, 0.12),
    },
    chipSelected: {
      backgroundColor: scheme.secondaryContainerHex,
    },
    chipSelectedDisabled: {
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
    //todo check, it is onSurfaceVariant here: https://m3.material.io/components/chips/specs
    innerStateHovered: {
      backgroundColor: rgbaWithOpacity(scheme.onSurfaceRGB, 0.08),
    },
    //todo check, it is onSurfaceVariant here: https://m3.material.io/components/chips/specs
    innerStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(scheme.onSurfaceRGB, 0.12),
    },
    //todo check, it is onSurfaceVariant here: https://m3.material.io/components/chips/specs
    innerStateDragged: {
      backgroundColor: rgbaWithOpacity(scheme.onSurfaceRGB, 0.16),
    },
    innerDropDown: {
      paddingRight: 8,
      paddingLeft: 16,
    },
    innerSelected: {
      paddingRight: 16,
      paddingLeft: 8,
    },
    innerSelectedDropDown: {
      paddingRight: 8,
      paddingLeft: 8,
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
    boxShadowElevation1: settings.boxShadowElevation1,
    boxShadowElevation2: settings.boxShadowElevation2,
    boxShadowElevation4: settings.boxShadowElevation4,
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
    //todo check, it is onSurfaceVariant here: https://m3.material.io/components/chips/specs
    textStateHoveredOrFocussedOrPressedOrDragged: {
      color: scheme.onSurfaceHex,
    },
    textStateDisabled: {
      color: scheme.onSurfaceHex,
      opacity: 0.38,
    },
    textSelected: {
      color: scheme.onSecondaryContainerHex,
    },
    leadingIcon: {
      marginRight: 8,
    },
    trailingIcon: {
      marginLeft: 8,
    },
    iconStateDisabled: {
      opacity: 0.38,
    },
  });
