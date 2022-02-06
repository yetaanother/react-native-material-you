import React, { FunctionComponent, useContext } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { SchemeAdapter } from "../providers/SchemeAdapter";
import { ThemeContext } from "../providers/ThemeProvider";
import { Settings } from "../providers/Settings";
import { rgbaWithOpacity } from "../utils/colorUtils";
import { Ionicons } from "@expo/vector-icons";

interface AppBarProps {
  leadingIcon?: any;
  onLeadingPress?: () => void;
  trailingIcon?: any | any[];
  onTrailingPress?: any | any[];
  title: string;
  titleCentered?: boolean;
  containerStyle?: ViewStyle;
  size?: AppBarSize;
  type?: AppBarType;
}

// M3 docs: https://m3.material.io/components/top-app-bar/specs
export const AppBar: FunctionComponent<AppBarProps> = ({
  leadingIcon,
  trailingIcon,
  title,
  containerStyle,
  onLeadingPress,
  onTrailingPress,
  size,
  type,
  titleCentered,
}) => {
  const { scheme, settings } = useContext(ThemeContext);
  const styles = createStyles(scheme, settings);
  size = !size ? "small" : size;
  type = !type ? "on-scroll" : type;
  if (size === "small" && titleCentered && Array.isArray(trailingIcon)) {
    console.log(
      "Can't have centered title with multiple trailing icons for small size"
    );
    titleCentered = false;
  }

  const render = () => {
    return (
      <View style={getAppBarStyles()}>
        <View style={getAppBarLayer2Styles()}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              flex: 1,
              alignItems: "center",
            }}
          >
            {leadingIcon && (
              <View style={styles.leadingIcon}>
                <Ionicons
                  name={leadingIcon}
                  size={24}
                  color={scheme.onSurfaceHex}
                  onPress={onLeadingPress}
                />
              </View>
            )}
            {size === "small" && <Text style={getTitleStyles()}>{title}</Text>}
            {renderTrailingIcons()}
          </View>
          {size !== "small" && (
            <View
              style={{
                ...{ width: "100%", flex: 1 },
                ...getLine2Styles(),
              }}
            >
              <Text style={getTitleStyles()}>{title}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const getAppBarStyles = () => {
    let appBarStyles = {
      ...styles.appBar,
      ...containerStyle,
      ...styles.boxShadowElevation2,
    };
    if (size == "medium") {
      appBarStyles = { ...appBarStyles, ...styles.appBarMedium };
    } else if (size == "large") {
      appBarStyles = { ...appBarStyles, ...styles.appBarLarge };
    }
    return appBarStyles;
  };

  const getAppBarLayer2Styles = () => {
    let appBarLayer2Styles: ViewStyle = { ...styles.appBarLayer2 };
    if (type === "flat") {
      appBarLayer2Styles = {
        ...appBarLayer2Styles,
        ...styles.appBarLayer2TypeFlat,
      };
    }
    return appBarLayer2Styles;
  };

  const getTitleStyles = () => {
    let titleStyles: TextStyle = { ...styles.title };
    if (size === "medium") {
      titleStyles = { ...titleStyles, ...styles.titleSizeMedium };
    } else if (size === "large") {
      titleStyles = { ...titleStyles, ...styles.titleSizeLarge };
    }
    if (titleCentered) {
      titleStyles = { ...titleStyles, ...styles.titleCentered };
    }
    return titleStyles;
  };

  const renderTrailingIcons = () => {
    if (!trailingIcon) {
      return <></>;
    }
    if (!Array.isArray(trailingIcon)) {
      return (
        <View
          style={
            size === "small" && titleCentered // The center title will push the trailing icon to the right
              ? {}
              : styles.trailingIconContainer
          }
        >
          <View style={getTrailingIconStyles()}>
            <Ionicons
              name={trailingIcon}
              size={30}
              color={scheme.onSurfaceVariantHex}
            />
          </View>
        </View>
      );
    }
    let attachListeners = shouldAttachListeners();
    return (
      <View style={styles.trailingIconContainer}>
        {trailingIcon.map((icon, index) => (
          <View style={getTrailingIconStyles()} key={index}>
            <Ionicons
              name={icon}
              size={24}
              color={scheme.onSurfaceVariantHex}
              onPress={attachListeners ? onTrailingPress[index] : undefined}
            />
          </View>
        ))}
      </View>
    );
  };

  const shouldAttachListeners = () => {
    if (!onTrailingPress) {
      return false;
    }
    if (!Array.isArray(onTrailingPress)) {
      console.warn(
        "Array is expected for multiple training icons for onTrailingPress"
      );
      return false;
    }
    if (trailingIcon.length !== onTrailingPress.length) {
      console.warn(
        "Length of listeners is expected to be equal to the number of trailing icons"
      );
      return false;
    }
    return true;
  };

  const getTrailingIconStyles = () => {
    if (!trailingIcon) {
      return {};
    }
    let trailingIconStyles: ViewStyle = { ...styles.trailingIcon };
    if (Array.isArray(trailingIcon)) {
      trailingIconStyles = {
        ...trailingIconStyles,
        ...styles.trailingIconMultiple,
      };
    }
    return trailingIconStyles;
  };

  const getLine2Styles = () => {
    if (size == "large") {
      return { paddingTop: 24 };
    }
    return {};
  };

  return render();
};

// Because of fixed height required padding is set automatically
const deviceWidth = Dimensions.get("window").width;
const createStyles = (scheme: SchemeAdapter, settings: Settings) =>
  StyleSheet.create({
    appBar: {
      backgroundColor: scheme.surfaceHex,
      width: deviceWidth,
      height: 64,
    },
    appBarMedium: {
      height: 112,
    },
    appBarLarge: {
      height: 152,
    },
    appBarLayer2: {
      backgroundColor: rgbaWithOpacity(scheme.primaryRGB, 0.08),
      paddingHorizontal: 16,
      height: "100%",
    },
    appBarLayer2TypeFlat: {
      backgroundColor: undefined,
    },
    appBarLine2: {},
    boxShadowElevation2: settings.boxShadowElevation2,
    leadingIcon: {
      height: 24,
      width: 24,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: 22,
      lineHeight: 28,
      fontWeight: "normal",
      color: scheme.onSurfaceHex,
      textAlign: "center",
      marginLeft: 16,
    },
    titleCentered: {
      marginLeft: "auto",
      marginRight: "auto",
    },
    titleSizeMedium: {
      fontSize: 24,
      lineHeight: 32,
      marginLeft: 0,
      width: "100%",
      textAlign: "left",
    },
    titleSizeLarge: {
      fontSize: 28,
      lineHeight: 36,
      marginLeft: 0,
      width: "100%",
      textAlign: "left",
    },
    trailingIconContainer: {
      flexDirection: "row",
      marginLeft: "auto",
    },
    trailingIcon: {
      height: 30,
      width: 30,
      alignItems: "center",
      justifyContent: "center",
    },
    trailingIconMultiple: {
      height: 24,
      width: 24,
      marginLeft: 24,
    },
  });
