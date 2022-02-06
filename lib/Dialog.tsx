import React, { FunctionComponent, useContext } from "react";
import { StyleSheet, Text, TextStyle, View } from "react-native";
import { ThemeContext } from "./providers/ThemeProvider";
import { SchemeAdapter } from "./providers/SchemeAdapter";
import { rgbaWithOpacity } from "./utils/colorUtils";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "./buttons/Button";
import { Settings } from "./providers/Settings";

interface DialogProps {
  title: string;
  content: string;
  heroIcon?: any;
  primaryAction?: boolean;
  secondaryAction?: boolean;
  onPrimaryPress?: () => void;
  primaryActionLabel?: string;
  onSecondaryPress?: () => void;
  secondaryActionLabel?: string;
}

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
  const { scheme, settings } = useContext(ThemeContext);
  const styles = createStyles(scheme, settings);

  const render = () => {
    return (
      <View style={{ ...styles.dialog, ...styles.boxShadowElevation3 }}>
        {/*// Another layer of color is not part of the spec but used in the Figma design kit*/}
        <View style={styles.dialogLayer2}>
          {renderContent()}
          <View style={styles.children}>{children}</View>
          {renderActions()}
        </View>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <View style={getContentStyles()}>
        {heroIcon && (
          <View style={styles.icon}>
            <Ionicons name={heroIcon} size={24} color={scheme.secondaryHex} />
          </View>
        )}
        <Text style={getTitleStyles()}>{title}</Text>
        <Text style={styles.body}>{content}</Text>
      </View>
    );
  };

  const getTitleStyles = () => {
    if (heroIcon) {
      return styles.title;
    }
    let titleStyles: TextStyle = {
      ...styles.title,
      marginTop: 0,
      marginBottom: 16,
    };
    delete titleStyles["textAlign"];
    return titleStyles;
  };

  const getContentStyles = () => {
    if ((!primaryAction && !secondaryAction) || children) {
      return { ...styles.content, paddingBottom: 24 };
    }
    return styles.content;
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

const createStyles = (scheme: SchemeAdapter, settings: Settings) =>
  StyleSheet.create({
    dialog: {
      borderRadius: 28,
      backgroundColor: scheme.surfaceHex,
      width: 312,
    },
    boxShadowElevation3: settings.boxShadowElevation3,
    dialogLayer2: {
      alignItems: "flex-end",
      borderRadius: 28,
      backgroundColor: rgbaWithOpacity(scheme.primaryRGB, 0.11),
      width: "100%",
    },
    content: {
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
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: 24,
      lineHeight: 32,
      fontWeight: "normal",
      color: scheme.onSurfaceHex,
      alignItems: "center",
      textAlign: "center",
      width: "100%",
      marginVertical: 16,
    },
    body: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "normal",
      letterSpacing: 0.25,
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
