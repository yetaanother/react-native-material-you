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
              ...styles.appBarLayer2Line2,
              ...(type === "flat" ? styles.appBarLayer2Line2TypeFlat : {}),
            }}
          >
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
        ...styles.appBarLayer2SizeMedium,
      };
      if (Array.isArray(trailingIcon)) {
        appBarLayer2Styles = {
          ...appBarLayer2Styles,
          ...styles.appBarLayer2SizeMediumMultipleTrailingIcons,
        };
      }
    } else if (size === "large") {
      appBarLayer2Styles = {
        ...appBarLayer2Styles,
        ...styles.appBarLayer2SizeLarge,
      };
      if (Array.isArray(trailingIcon)) {
        appBarLayer2Styles = {
          ...appBarLayer2Styles,
          ...styles.appBarLayer2SizeLargeMultipleTrailingIcons,
        };
      }
    }
    if (type === "flat") {
      appBarLayer2Styles = {
        ...appBarLayer2Styles,
        ...styles.appBarLayer2Line2TypeFlat,
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
          //  todo check better way to do this
          <View style={getTrailingIconStyles()} key={index}>
            {attachListeners && (
              <Ionicons
                name={icon}
                size={24}
                color={scheme.onSurfaceVariantHex}
                onPress={onTrailingPress[index]}
              />
            )}
            {!attachListeners && (
              <Ionicons
                key={index}
                name={icon}
                size={24}
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

// todo check, container height is 64 here: https://m3.material.io/components/top-app-bar/specs
// todo check, elements look center align for small here: https://m3.material.io/components/top-app-bar/specs
// todo check, elements look flex-start and flex-end for medium and large here: https://m3.material.io/components/top-app-bar/specs
// todo check, container height is 112 for medium here: https://m3.material.io/components/top-app-bar/specs
// todo check, container height is 152 for large here: https://m3.material.io/components/top-app-bar/specs
// todo check, top padding is 20 and bottom padding is 24 for medium here: https://m3.material.io/components/top-app-bar/specs
// todo check, top padding is 20 and bottom padding is 28 for large here: https://m3.material.io/components/top-app-bar/specs
// todo check, avatar size is 30 here: https://m3.material.io/components/top-app-bar/specs
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
      height: 64,
      flexDirection: "row",
    },
    appBarLayer2MultipleTrailingIcons: {},
    appBarLayer2SizeMedium: {
      height: 112,
    },
    appBarLayer2SizeMediumMultipleTrailingIcons: {},
    appBarLayer2SizeLarge: {
      height: 152,
    },
    appBarLayer2SizeLargeMultipleTrailingIcons: {},
    appBarLayer2TypeFlat: {
      backgroundColor: undefined,
    },
    appBarLayer2Line2: {
      backgroundColor: rgbaWithOpacity(scheme.primaryRGB, 0.08),
      alignItems: "center",
      paddingHorizontal: 16,
      flexDirection: "row",
    },
    appBarLayer2Line2TypeFlat: {
      backgroundColor: undefined,
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
    titleSizeMedium: {
      fontSize: 24,
      lineHeight: 32,
      marginLeft: 0,
    },
    titleSizeLarge: {
      fontSize: 28,
      lineHeight: 36,
      marginLeft: 0,
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
