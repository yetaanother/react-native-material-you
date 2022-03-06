import React, { FunctionComponent, useContext } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { ColorScheme } from "../providers/ColorScheme";
import { ThemeContext } from "../providers/ThemeProvider";
import { Shadows } from "../providers/Shadows";
import { rgbaWithOpacity } from "../utils/colorUtils";
import { Ionicons } from "@expo/vector-icons";
import { M3Constants } from "../utils/M3Constants";

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
    console.warn(
      "Can't have centered title with multiple trailing icons for small size"
    );
    titleCentered = false;
  }

  const render = () => {
    return (
      <View style={getContainerStyles()}>
        <View style={getSurfaceOverlayStyles()}>{renderContent()}</View>
      </View>
    );
  };

  const getContainerStyles = () => {
    let containerStyles: ViewStyle = {
      ...styles.container,
    };
    if (type == "on-scroll") {
      containerStyles = { ...containerStyles, ...styles.boxShadowElevation2 };
    }
    if (size == "medium") {
      containerStyles = { ...containerStyles, ...styles.containerMedium };
    } else if (size == "large") {
      containerStyles = { ...containerStyles, ...styles.containerLarge };
    }

    if (containerStyle) {
      return { ...containerStyles, ...containerStyle };
    }
    return containerStyles;
  };

  const getSurfaceOverlayStyles = () => {
    let getSurfaceOverlayStyles: ViewStyle = { ...styles.surfaceOverlay };
    if (type === "flat") {
      getSurfaceOverlayStyles = {
        ...getSurfaceOverlayStyles,
        ...styles.surfaceOverlayTypeFlat,
      };
    }
    return getSurfaceOverlayStyles;
  };

  const renderContent = () => {
    let titleStyles = getTitleStyles();
    return (
      <>
        <View style={styles.content}>
          {leadingIcon && (
            <View style={styles.leadingIcon}>
              <Ionicons
                name={leadingIcon}
                size={iconSize}
                color={scheme.onSurfaceHex}
                onPress={onLeadingPress}
              />
            </View>
          )}
          {size === "small" && <Text style={titleStyles}>{title}</Text>}
          {renderTrailingIcons()}
        </View>
        {size !== "small" && (
          <View style={getLine2Styles()}>
            <Text style={titleStyles}>{title}</Text>
          </View>
        )}
      </>
    );
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
              size={iconSizeLarge}
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
              size={iconSize}
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
    let line2Styles = { ...styles.contentLine2 };
    if (size == "large") {
      line2Styles = { ...line2Styles, ...styles.contentLine2Large };
    }
    return line2Styles;
  };

  return render();
};

const iconSize = 24;
const iconSizeLarge = 30;

// Because of fixed height required padding is set automatically
const deviceWidth = Dimensions.get("window").width;
const createStyles = (scheme: ColorScheme, settings: Shadows) =>
  StyleSheet.create({
    container: {
      backgroundColor: scheme.surfaceHex,
      width: deviceWidth,
      height: 64,
    },
    containerMedium: {
      height: 112,
    },
    containerLarge: {
      height: 152,
    },
    surfaceOverlay: {
      backgroundColor: rgbaWithOpacity(
        scheme.primaryRGB,
        M3Constants.surface2ContainerOpacity
      ),
      paddingHorizontal: 16,
      height: "100%",
    },
    surfaceOverlayTypeFlat: {
      backgroundColor: undefined,
    },
    boxShadowElevation2: settings.boxShadowElevation2,
    content: {
      flexDirection: "row",
      width: "100%",
      flex: 1,
      alignItems: "center",
    },
    contentLine2: {
      width: "100%",
      flex: 1,
    },
    contentLine2Large: {
      paddingTop: 24,
    },
    leadingIcon: {
      height: 24,
      width: 24,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      ...M3Constants.titleLargeText,
      color: scheme.onSurfaceHex,
      textAlign: "center",
      marginLeft: 16,
    },
    titleCentered: {
      marginLeft: "auto",
      marginRight: "auto",
    },
    titleSizeMedium: {
      ...M3Constants.headlineSmallText,
      marginLeft: 0,
      width: "100%",
      textAlign: "left",
    },
    titleSizeLarge: {
      ...M3Constants.headlineMediumText,
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
