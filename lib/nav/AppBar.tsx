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
      <View
        style={{
          ...styles.appBar,
          ...containerStyle,
          ...styles.boxShadowElevation2,
        }}
      >
        <View style={getAppBarLayer2Styles()}>
          {leadingIcon && (
            <View style={styles.leadingIcon}>
              <Ionicons
                name={leadingIcon}
                size={18}
                color={scheme.onSurfaceHex}
                onPress={onLeadingPress}
              />
            </View>
          )}
          {size === "small" && <Text style={getTitleStyles()}>{title}</Text>}
          {renderTrailingIcons()}
        </View>
        {size !== "small" && (
          <View style={styles.appBarLayer2Line2}>
            <Text style={getTitleStyles()}>{title}</Text>
          </View>
        )}
      </View>
    );
  };

  const getAppBarLayer2Styles = () => {
    let appBarLayer2Styles: ViewStyle = { ...styles.appBarLayer2 };
    if (size === "small") {
      if (Array.isArray(trailingIcon)) {
        appBarLayer2Styles = {
          ...appBarLayer2Styles,
          ...styles.appBarLayer2MultipleTrailingIcons,
        };
      }
    } else if (size === "medium") {
      appBarLayer2Styles = {
        ...appBarLayer2Styles,
        ...styles.appBarLayer2TypeMedium,
      };
      if (Array.isArray(trailingIcon)) {
        appBarLayer2Styles = {
          ...appBarLayer2Styles,
          ...styles.appBarLayer2TypeMediumMultipleTrailingIcons,
        };
      }
    } else if (size === "large") {
      appBarLayer2Styles = {
        ...appBarLayer2Styles,
        ...styles.appBarLayer2TypeLarge,
      };
      if (Array.isArray(trailingIcon)) {
        appBarLayer2Styles = {
          ...appBarLayer2Styles,
          ...styles.appBarLayer2TypeLargeMultipleTrailingIcons,
        };
      }
    }
    return appBarLayer2Styles;
  };

  const getTitleStyles = () => {
    let titleStyles: TextStyle = { ...styles.title };
    if (size === "medium") {
      titleStyles = { ...titleStyles, ...styles.titleTypeMedium };
    } else if (size === "large") {
      titleStyles = { ...titleStyles, ...styles.titleTypeLarge };
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
              : styles.trailingIconMultipleContainer
          }
        >
          <View style={getTrailingIconStyles()}>
            <Ionicons
              name={trailingIcon}
              size={24}
              color={scheme.onSurfaceVariantHex}
            />
          </View>
        </View>
      );
    }
    let attachListeners = shouldAttachListeners();
    return (
      <View style={styles.trailingIconMultipleContainer}>
        {trailingIcon.map((icon, index) => (
          //  todo check better way to do this
          <View style={getTrailingIconStyles()} key={index}>
            {attachListeners && (
              <Ionicons
                name={icon}
                size={18}
                color={scheme.onSurfaceVariantHex}
                onPress={onTrailingPress[index]}
              />
            )}
            {!attachListeners && (
              <Ionicons
                key={index}
                name={icon}
                size={18}
                color={scheme.onSurfaceVariantHex}
              />
            )}
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

  return render();
};

const deviceWidth = Dimensions.get("window").width;
const createStyles = (scheme: SchemeAdapter, settings: Settings) =>
  StyleSheet.create({
    appBar: {
      backgroundColor: scheme.surfaceHex,
      width: deviceWidth,
    },
    appBarLayer2: {
      backgroundColor: rgbaWithOpacity(scheme.primaryRGB, 0.08),
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 14,
      flexDirection: "row",
    },
    appBarLayer2MultipleTrailingIcons: {
      paddingVertical: 18,
    },
    appBarLayer2TypeMedium: {
      paddingTop: 14,
      paddingBottom: 10,
      paddingVertical: undefined,
    },
    appBarLayer2TypeMediumMultipleTrailingIcons: {
      paddingTop: 20,
      paddingBottom: 16,
      paddingVertical: undefined,
    },
    appBarLayer2TypeLarge: {
      paddingTop: 14,
      paddingBottom: 46,
      paddingVertical: undefined,
    },
    appBarLayer2TypeLargeMultipleTrailingIcons: {
      paddingTop: 20,
      paddingBottom: 52,
      paddingVertical: undefined,
    },
    appBarLayer2Line2: {
      backgroundColor: rgbaWithOpacity(scheme.primaryRGB, 0.08),
      alignItems: "center",
      paddingHorizontal: 16,
      paddingBottom: 20,
      flexDirection: "row",
    },
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
    titleTypeMedium: {
      fontSize: 22,
      lineHeight: 32,
      marginLeft: 0,
    },
    titleTypeLarge: {
      fontSize: 28,
      lineHeight: 36,
      marginLeft: 0,
    },
    trailingIcon: {
      height: 36,
      width: 36,
      alignItems: "center",
      justifyContent: "center",
    },
    trailingIconMultipleContainer: {
      flexDirection: "row",
      marginLeft: "auto",
    },
    trailingIconMultiple: {
      height: 24,
      width: 24,
      marginLeft: 24,
    },
  });
