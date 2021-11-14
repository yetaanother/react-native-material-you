import React, { FunctionComponent, useContext } from "react";
import {
  Image,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ThemeContext } from "./ThemeProvider";
import { SchemeAdapter } from "./SchemeAdapter";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "./Button";

interface CardProps {
  horizontal?: boolean;
  type?: CardType;
  headerTitle?: string;
  headerSubTitle?: string;
  monogram?: boolean;
  monogramLetter?: string;
  closeIcon?: any;
  closable?: boolean;
  onClosePress?: () => void;
  imageSrc?: ImageSourcePropType;
  title: string;
  subTitle?: string;
  content: string;
  primaryAction?: boolean;
  secondaryAction?: boolean;
  onPrimaryPress?: () => void;
  primaryActionLabel?: string;
  onSecondaryPress?: () => void;
  secondaryActionLabel?: string;
}

export const Card: FunctionComponent<CardProps> = ({
  horizontal,
  type,
  onPrimaryPress,
  onSecondaryPress,
  primaryActionLabel,
  secondaryActionLabel,
  primaryAction,
  secondaryAction,
  title,
  content,
  subTitle,
  imageSrc,
  monogram,
  monogramLetter,
  closable,
  closeIcon,
  onClosePress,
  headerTitle,
  headerSubTitle,
}) => {
  const scheme = useContext(ThemeContext);
  const styles = createStyles(scheme);

  horizontal = !horizontal ? false : horizontal;
  type = !type ? "filled" : type;

  const render = () => {
    return (
      <View style={getCardStyles()}>
        {renderHeader()}
        {renderImage()}
        {renderContent()}
        {renderButtons()}
      </View>
    );
  };

  const getCardStyles = () => {
    let cardStyles = { ...styles.card };
    if (type === "elevated") {
      cardStyles = {
        ...cardStyles,
        ...styles.cardTypeElevated,
        ...styles.boxShadow,
      };
    } else if (type === "outlined") {
      cardStyles = { ...cardStyles, ...styles.cardTypeOutlined };
    }
    return cardStyles;
  };

  const renderHeader = () => {
    if (!monogram && !closable && !headerTitle && !headerSubTitle) {
      return;
    }
    return (
      <View style={styles.header}>
        <View>
          {monogram && (
            <Text style={{ ...styles.monogram }}>
              {!monogramLetter ? "A" : monogramLetter}
            </Text>
          )}
        </View>
        <View style={styles.headerContent}>
          {headerTitle && <Text style={styles.headerTitle}>{headerTitle}</Text>}
          {headerSubTitle && (
            <Text style={styles.headerSubTitle}>{headerSubTitle}</Text>
          )}
        </View>
        {closable && (
          <View style={styles.icon}>
            <Ionicons
              name={!closeIcon ? "close" : closeIcon}
              size={14}
              color={scheme.outlineHex}
              onPress={onClosePress}
            />
          </View>
        )}
      </View>
    );
  };

  const renderImage = () => {
    if (!imageSrc) {
      return;
    }
    return <Image style={styles.image} source={imageSrc} />;
  };

  const renderContent = () => {
    return (
      <>
        <View style={styles.body}>
          <Text style={getBodyTitleStyles()}>{title}</Text>
          {subTitle && <Text style={styles.bodySubTitle}>{subTitle}</Text>}
        </View>
        <View style={{ ...styles.body, height: 72 }}>
          <Text style={styles.bodySubTitle}>{content}</Text>
        </View>
      </>
    );
  };

  const getBodyTitleStyles = () => {
    let bodyTitleStyles = { ...styles.bodyTitle };
    if (type === "elevated" || type === "outlined") {
      return { ...bodyTitleStyles, ...styles.bodyTitleTypeElevatedOrOutlined };
    }
    return bodyTitleStyles;
  };

  const renderButtons = () => {
    if (!primaryAction && !secondaryAction) {
      return;
    }
    return (
      <View style={styles.buttons}>
        {secondaryAction && (
          <Button
            containerStyle={styles.button}
            title={!secondaryActionLabel ? "Enabled" : secondaryActionLabel}
            type={"outlined"}
            onPress={onSecondaryPress}
          />
        )}
        {primaryAction && (
          <Button
            containerStyle={styles.button}
            title={!primaryActionLabel ? "Enabled" : primaryActionLabel}
            type={"filled"}
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
    card: {
      display: "flex",
      flexDirection: "column",
      padding: 0,
      alignItems: "flex-start",
      width: 360,
      backgroundColor: scheme.surfaceVariantHex,
      borderRadius: 12,
    },
    cardTypeElevated: {
      backgroundColor: scheme.surfaceHex,
    },
    cardTypeOutlined: {
      backgroundColor: scheme.surfaceHex,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: scheme.outlineHex,
    },
    header: {
      height: 72,
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 13,
    },
    icon: {
      height: 24,
      width: 24,
      marginLeft: "auto",
      alignItems: "center",
      justifyContent: "center",
    },
    monogram: {
      width: 40,
      height: 40,
      backgroundColor: scheme.primaryHex,
      borderRadius: 100,
      color: scheme.surfaceHex,
      textAlign: "center",
      textAlignVertical: "center",
      marginRight: 16,
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "500",
      letterSpacing: 0.1,
    },
    headerContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: 0,
    },
    headerTitle: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "500",
      letterSpacing: 0.1,
      marginVertical: 4,
      color: scheme.onSurfaceHex,
    },
    headerSubTitle: {
      marginVertical: 4,
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "normal",
      letterSpacing: 0.25,
      color: scheme.onSurfaceHex,
    },
    image: {
      width: "100%",
      height: 188,
    },
    body: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: 16,
      height: 76,
      width: "100%",
    },
    bodyTitle: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "normal",
      letterSpacing: 0.5,
      color: scheme.onSurfaceVariantHex,
    },
    bodyTitleTypeElevatedOrOutlined: {
      color: scheme.onSurfaceHex,
    },
    bodySubTitle: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "normal",
      letterSpacing: 0.25,
      color: scheme.onSurfaceVariantHex,
    },
    buttons: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      padding: 16,
      height: 72,
      width: "100%",
    },
    button: {
      marginHorizontal: 8,
    },
    // https://ethercreative.github.io/react-native-shadow-generator/
    boxShadow: {
      ...Platform.select({
        ios: {
          shadowColor: scheme.shadowHex,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.3,
          shadowRadius: 2,
        },
        android: {
          elevation: 3,
          shadowColor: scheme.shadowHex,
        },
      }),
    },
  });
