import React, { FunctionComponent, useContext } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import { ThemeContext } from "./providers/ThemeProvider";
import { ColorScheme } from "./providers/ColorScheme";
import { rgbaWithOpacity } from "./utils/colorUtils";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "./buttons/Button";
import { Shadows } from "./providers/Shadows";
import { M3Constants } from "./utils/M3Constants";

interface DialogProps {
  title: string;
  content: string;
  heroIcon?: any;
  primaryAction?: boolean;
  secondaryAction?: boolean;
  onPrimaryPress?: (event: GestureResponderEvent) => void;
  primaryActionLabel?: string;
  onSecondaryPress?: (event: GestureResponderEvent) => void;
  secondaryActionLabel?: string;
}

// M3 docs: https://m3.material.io/components/dialogs/specs
export const Dialog: FunctionComponent<DialogProps> = ({
  title,
  content,
  heroIcon,
  primaryAction,
  secondaryAction,
  primaryActionLabel,
  secondaryActionLabel,
  onPrimaryPress,
  onSecondaryPress,
  children,
}) => {
  const { scheme, shadows } = useContext(ThemeContext);
  const styles = createStyles(scheme, shadows);

  const render = () => {
    return (
      <View style={{ ...styles.container, ...styles.boxShadowElevation3 }}>
        <View style={styles.surfaceOverlay}>{renderContent()}</View>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <>
        {renderBody()}
        <View style={styles.children}>{children}</View>
        {renderActions()}
      </>
    );
  };

  const renderBody = () => {
    return (
      <View style={styles.bodyContainer}>
        {heroIcon && (
          <View style={styles.icon}>
            <Ionicons
              name={heroIcon}
              size={iconSize}
              color={scheme.secondaryHex}
            />
          </View>
        )}
        <Text style={getTitleStyles()}>{title}</Text>
        <Text style={styles.body}>{content}</Text>
      </View>
    );
  };

  const getTitleStyles = () => {
    let titleStyles: TextStyle = { ...styles.title };
    if (!heroIcon) {
      titleStyles = { ...titleStyles, ...styles.titleWithoutHeroIcon };
    }
    return titleStyles;
  };

  const renderActions = () => {
    if (!primaryAction && !secondaryAction) {
      return;
    }
    return (
      <View style={styles.actions}>
        {secondaryAction && (
          <Button
            title={!secondaryActionLabel ? "Action 2" : secondaryActionLabel}
            containerStyle={{ marginRight: 8 }}
            type={"text"}
            onPress={onSecondaryPress}
          />
        )}
        {primaryAction && (
          <Button
            title={!primaryActionLabel ? "Action 1" : primaryActionLabel}
            type={"text"}
            onPress={onPrimaryPress}
          />
        )}
      </View>
    );
  };

  return render();
};

const iconSize = 24;

const createStyles = (scheme: ColorScheme, shadows: Shadows) =>
  StyleSheet.create({
    container: {
      borderRadius: 28,
      backgroundColor: scheme.surfaceHex,
      width: 312,
    },
    boxShadowElevation3: shadows.boxShadowElevation3,
    surfaceOverlay: {
      alignItems: "flex-end",
      borderRadius: 28,
      backgroundColor: rgbaWithOpacity(
        scheme.primaryRGB,
        M3Constants.surface3ContainerOpacity
      ),
      width: "100%",
    },
    bodyContainer: {
      alignItems: "flex-start",
      padding: 24,
      width: "100%",
    },
    icon: {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    title: {
      ...M3Constants.headlineSmallText,
      color: scheme.onSurfaceHex,
      alignItems: "center",
      textAlign: "center",
      width: "100%",
      marginVertical: 16,
    },
    titleWithoutHeroIcon: {
      marginTop: 0,
      marginBottom: 16,
      textAlign: undefined,
    },
    body: {
      ...M3Constants.bodyMediumText,
      color: scheme.onSurfaceVariantHex,
      alignItems: "center",
      width: "100%",
    },
    actions: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      width: "100%",
      paddingHorizontal: 24,
      paddingBottom: 24,
    },
    children: {
      paddingHorizontal: 24,
      width: "100%",
    },
  });
