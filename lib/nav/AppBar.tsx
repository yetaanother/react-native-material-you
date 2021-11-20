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
  containerStyle?: ViewStyle;
  size?: AppBarSize;
}

export const AppBar: FunctionComponent<AppBarProps> = ({
  leadingIcon,
  trailingIcon,
  title,
  containerStyle,
  onLeadingPress,
  onTrailingPress,
  size,
}) => {
  const { scheme, settings } = useContext(ThemeContext);
  const styles = createStyles(scheme, settings);
  size = !size ? "small" : size;

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
          <Text style={getTitleStyles()}>{title}</Text>
          {renderTrailingIcons()}
        </View>
      </View>
    );
  };

  const getAppBarLayer2Styles = () => {
    let appBarLayer2Styles = { ...styles.appBarLayer2 };
    if (Array.isArray(trailingIcon)) {
      appBarLayer2Styles = {
        ...appBarLayer2Styles,
        ...styles.appBarLayer2MultipleTrailingIcons,
      };
    }
    return appBarLayer2Styles;
  };

  const getTitleStyles = () => {
    let titleStyles: TextStyle = { ...styles.title };
    if (Array.isArray(trailingIcon)) {
      delete titleStyles["marginRight"];
      titleStyles = { ...titleStyles, ...styles.titleMultipleTrailingIcons };
    }
    return titleStyles;
  };

  const renderTrailingIcons = () => {
    if (!trailingIcon) {
      return <></>;
    }
    if (!Array.isArray(trailingIcon)) {
      return (
        <View style={getTrailingIconStyles()}>
          <Ionicons name={trailingIcon} size={24} color={scheme.onSurfaceHex} />
        </View>
      );
    }
    let attachListeners = true;
    if (!onTrailingPress) {
      attachListeners = false;
    } else if (!Array.isArray(onTrailingPress)) {
      console.warn(
        "Array is expected for multiple training icons for onTrailingPress"
      );
      attachListeners = false;
    } else if (trailingIcon.length !== onTrailingPress.length) {
      console.warn(
        "Length of listeners is expected to be equal to the number of trailing icons"
      );
      attachListeners = false;
    }
    return (
      <View style={styles.trailingIconMultipleContainer}>
        {trailingIcon.map((icon, index) => (
          <View style={getTrailingIconStyles()}>
            {attachListeners && (
              <Ionicons
                key={index}
                name={icon}
                size={18}
                color={scheme.onSurfaceHex}
                onPress={onTrailingPress[index]}
              />
            )}
            {!attachListeners && (
              <Ionicons
                key={index}
                name={icon}
                size={18}
                color={scheme.onSurfaceHex}
              />
            )}
          </View>
        ))}
      </View>
    );
  };

  const getTrailingIconStyles = () => {
    if (!trailingIcon) {
      return {};
    }
    let trailingIconStyles = { ...styles.trailingIcon };
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
      borderWidth: 1,
    },
    appBarLayer2MultipleTrailingIcons: {
      paddingVertical: 18,
    },
    boxShadowElevation2: settings.boxShadowElevation2,
    leadingIcon: {
      height: 24,
      width: 24,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
    },
    title: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: 22,
      lineHeight: 28,
      fontWeight: "normal",
      color: scheme.onSurfaceHex,
      borderWidth: 1,
      marginLeft: "auto",
      marginRight: "auto",
      textAlign: "center",
    },
    titleMultipleTrailingIcons: {
      marginLeft: 16,
    },
    trailingIcon: {
      height: 36,
      width: 36,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
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
