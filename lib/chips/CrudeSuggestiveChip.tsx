import React, { FunctionComponent, useContext } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { ThemeContext } from "../providers/ThemeProvider";
import { SchemeAdapter } from "../providers/SchemeAdapter";
import { Settings } from "../providers/Settings";
import { rgbaWithOpacity } from "../utils/colorUtils";
import { Ionicons } from "@expo/vector-icons";

// Guidelines for 'selected' version are not given in specs
interface CrudeSuggestiveChipProps {
  label: string;
  selected?: boolean;
  elevated?: boolean;
  state?: SuggestiveChipState;
  icon?: any;
  containerStyle?: ViewStyle;
}

// M3 docs: https://m3.material.io/components/chips/specs
export const CrudeSuggestiveChip: FunctionComponent<CrudeSuggestiveChipProps> =
  ({ label, selected, elevated, state, icon, containerStyle }) => {
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
            containerStyles = {
              ...containerStyles,
              ...styles.chipStateDisabled,
            };
          } else if (state === "focused") {
            containerStyles = {
              ...containerStyles,
              ...styles.chipStateFocused,
            };
          } else if (state === "pressed") {
          } else if (state === "dragged") {
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
          if (state === "dragged") {
            containerStyles = {
              ...containerStyles,
              ...styles.boxShadowElevation3,
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
      if (state === "enabled" || state === "pressed" || state === "focused") {
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
          stateStyles = {
            ...stateStyles,
            ...styles.innerStateFocusedOrPressed,
          };
        } else if (state === "dragged") {
          stateStyles = { ...stateStyles, ...styles.innerStateDragged };
        }
      } else {
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
      if (!selected) {
        if (state === "disabled") {
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
    innerStateHovered: {
      backgroundColor: rgbaWithOpacity(scheme.onSurfaceVariantRGB, 0.08),
    },
    innerStateFocusedOrPressed: {
      backgroundColor: rgbaWithOpacity(scheme.onSurfaceVariantRGB, 0.12),
    },
    innerStateDragged: {
      backgroundColor: rgbaWithOpacity(scheme.onSurfaceVariantRGB, 0.16),
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
      color: scheme.onSurfaceVariantHex,
      textAlign: "center",
      textAlignVertical: "center",
    },
    textStateDisabled: {
      color: scheme.onSurfaceHex,
      opacity: 0.38,
    },
    textSelected: {
      color: scheme.onSecondaryContainerHex,
    },
    boxShadowElevation1: settings.boxShadowElevation1,
    boxShadowElevation2: settings.boxShadowElevation2,
    boxShadowElevation3: settings.boxShadowElevation3,
    boxShadowElevation4: settings.boxShadowElevation4,
    icon: {
      marginRight: 8,
    },
    iconStateDisabled: {
      opacity: 0.38,
    },
  });
