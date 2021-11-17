import React, { FunctionComponent, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "./providers/ThemeProvider";
import { SchemeAdapter } from "./providers/SchemeAdapter";
import { rgbaWithOpacity } from "./utils/colorUtils";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "./buttons/Button";

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
}) => {
  const { scheme} = useContext(ThemeContext);
  const styles = createStyles(scheme);

  const render = () => {
    return (
      <View style={styles.dialog}>
        <View style={styles.dialogBackgroundLayer2}>
          {renderContent()}
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
            <Ionicons name={heroIcon} size={24} />
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

    return { ...styles.title, marginTop: 0, marginBottom: 16 };
  };

  const getContentStyles = () => {
    if (!primaryAction && !secondaryAction) {
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

const createStyles = (scheme: SchemeAdapter) =>
  StyleSheet.create({
    dialog: {
      padding: 0,
      borderRadius: 28,
      backgroundColor: scheme.surfaceHex,
      width: 312,
    },
    dialogBackgroundLayer2: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      padding: 0,
      borderRadius: 28,
      backgroundColor: rgbaWithOpacity(scheme.primaryRGB, 0.11),
      width: "100%",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 0,
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
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      width: "100%",
      paddingHorizontal: 24,
      paddingBottom: 24,
      paddingTop: 8,
    },
  });
