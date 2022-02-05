import React, { FunctionComponent, useContext } from "react";
import { StyleSheet, Text, TextStyle, View } from "react-native";
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
  children,
}) => {
  const { scheme } = useContext(ThemeContext);
  const styles = createStyles(scheme);

  // todo check, elevation 3 is used here: https://m3.material.io/components/dialogs/specs
  const render = () => {
    return (
      <View style={styles.dialog}>
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

// todo check, minimum width is 280 and max width is 560 here: https://m3.material.io/components/dialogs/specs#bbf1acde-f8d2-4ae1-9d51-343e96c4ac20
const createStyles = (scheme: SchemeAdapter) =>
  StyleSheet.create({
    dialog: {
      // todo remove this it is default
      padding: 0,
      borderRadius: 28,
      backgroundColor: scheme.surfaceHex,
      width: 312,
    },
    dialogLayer2: {
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
      display: "flex",
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
