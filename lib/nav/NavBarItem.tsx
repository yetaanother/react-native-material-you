import React, { FunctionComponent, useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import { SchemeAdapter } from "../providers/SchemeAdapter";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface NavBarItemProps {
  inactiveIcon?: any;
  label?: any;
  badge?: boolean;
  active?: boolean;
  containerStyle?: ViewStyle;
  badgeCount?: number;
  activeIcon?: any;
  onPress?: () => void;
  onSuccessClearBadge?: () => boolean;
}

export const NavBarItem: FunctionComponent<NavBarItemProps> = ({
  inactiveIcon,
  label,
  badge,
  active,
  containerStyle,
  badgeCount,
  activeIcon,
}) => {
  const { scheme } = useContext(ThemeContext);
  const styles = createStyles(scheme);

  const render = () => {
    return (
      <View style={getContainerStyles()}>
        <View style={getActivityIndicatorStyles()}>
          {badge && !badgeCount && <View style={styles.badge} />}
          {badge && badgeCount && (
            <View style={styles.badgeNumbered}>
              <Text style={styles.badgeLabel}>{badgeCount}</Text>
            </View>
          )}
          <View style={styles.iconContainer}>
            <Ionicons
              name={getIconName()}
              color={
                active
                  ? scheme.onSecondaryContainerHex
                  : scheme.onSurfaceVariantHex
              }
              // In m3 specs the size is 24px but that is not looking good
              size={18}
            />
          </View>
        </View>
        {label && <Text style={getLabelStyles()}>{label}</Text>}
      </View>
    );
  };

  const getContainerStyles = () => {
    return containerStyle
      ? { ...styles.navBarItem, ...containerStyle }
      : styles.navBarItem;
  };

  const getActivityIndicatorStyles = () => {
    let activityIndicatorStyles: ViewStyle = { ...styles.activityIndicator };
    if (!active) {
      activityIndicatorStyles = {
        ...activityIndicatorStyles,
        ...styles.activityIndicatorInactive,
      };
    }
    return activityIndicatorStyles;
  };

  const getIconName = () => {
    if (!active) {
      return inactiveIcon ? inactiveIcon : "triangle-outline";
    } else {
      return activeIcon ? activeIcon : "square";
    }
  };

  const getLabelStyles = () => {
    let labelStyles = { ...styles.label };
    if (active) {
      labelStyles = { ...labelStyles, ...styles.labelActive };
    }
    return labelStyles;
  };

  return render();
};

const createStyles = (scheme: SchemeAdapter) =>
  StyleSheet.create({
    navBarItem: {
      alignItems: "center",
      justifyContent: "center",
      height: 80,
      paddingTop: 12,
      paddingBottom: 16,
    },
    badge: {
      borderRadius: 3,
      backgroundColor: scheme.errorHex,
      width: 6,
      height: 6,
      top: 3, // Calculated manually; Have to adjust according to dimensions of activity indicator
      left: 37, // Calculated manually; Have to adjust according to dimensions of activity indicator
      position: "absolute",
    },
    badgeNumbered: {
      borderRadius: 8,
      backgroundColor: scheme.errorHex,
      width: 16,
      height: 16,
      top: 1, // Calculated manually; Have to adjust according to dimensions of activity indicator
      left: 31, // Calculated manually; Have to adjust according to dimensions of activity indicator
      position: "absolute",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100,
    },
    activityIndicator: {
      width: 64,
      height: 32,
      borderRadius: 16,
      backgroundColor: scheme.secondaryContainerHex,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    activityIndicatorInactive: {
      backgroundColor: undefined,
    },
    iconContainer: {
      width: 24,
      height: 24,
      justifyContent: "center",
      alignItems: "center",
    },
    label: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: 12,
      lineHeight: 16,
      fontWeight: "500",
      letterSpacing: 0.5,
      color: scheme.onSurfaceVariantHex,
      textAlign: "center",
      textAlignVertical: "center",
      marginTop: 4,
    },
    labelActive: {
      color: scheme.onSurfaceHex,
    },
    badgeLabel: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: 11,
      lineHeight: 16,
      fontWeight: "normal",
      letterSpacing: 0.1,
      color: scheme.onErrorHex,
      textAlign: "center",
      textAlignVertical: "center",
    },
  });
