import React, { FunctionComponent, useContext } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { ThemeContext } from "../providers/ThemeProvider";
import { SchemeAdapter } from "../providers/SchemeAdapter";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../buttons/Button";
import { Avatar } from "../Avatar";
import { Settings } from "../providers/Settings";

interface CardProps {
  type?: CardType;
  headerTitle?: string;
  headerSubTitle?: string;
  avatar?: boolean;
  avatarInitials?: string;
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
  containerStyle?: ViewStyle;
}

// M3 docs: https://m3.material.io/components/cards/specs
export const Card: FunctionComponent<CardProps> = ({
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
  avatar,
  avatarInitials,
  closable,
  closeIcon,
  onClosePress,
  headerTitle,
  headerSubTitle,
  containerStyle,
}) => {
  const { scheme, settings } = useContext(ThemeContext);
  const styles = createStyles(scheme, settings);

  type = !type ? "filled" : type;

  const render = () => {
    return <View style={getContainerStyles()}>{renderContent()}</View>;
  };

  const getContainerStyles = () => {
    let containerStyles: ViewStyle = { ...styles.container };
    if (type === "elevated") {
      containerStyles = {
        ...containerStyles,
        ...styles.containerTypeElevated,
        ...styles.boxShadowElevation1,
      };
    } else if (type === "outlined") {
      containerStyles = { ...containerStyles, ...styles.containerTypeOutlined };
    }
    if (containerStyle) {
      return { ...containerStyles, ...containerStyle };
    }
    return containerStyles;
  };

  const renderContent = () => {
    return (
      <>
        {renderHeader()}
        {renderImage()}
        {renderBody()}
        {renderButtons()}
      </>
    );
  };

  const renderHeader = () => {
    if (!shouldDisplayHeader()) {
      return;
    }
    return (
      <View style={styles.header}>
        <View>
          {avatar && (
            <Avatar
              containerStyle={{ marginRight: 16 }}
              initials={avatarInitials}
            />
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
              size={iconSize}
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
    let imageStyles = { ...styles.image };
    if (!shouldDisplayHeader()) {
      imageStyles = { ...imageStyles, ...styles.imageNoHeader };
    }
    return <Image style={imageStyles} source={imageSrc} />;
  };

  const shouldDisplayHeader = () => {
    return avatar || closable || headerTitle;
  };

  const renderBody = () => {
    return (
      <>
        <View style={styles.body}>
          <Text style={getBodyTitleStyles()}>{title}</Text>
          {subTitle && <Text style={styles.bodySubTitle}>{subTitle}</Text>}
        </View>
        <View style={styles.body}>
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

const iconSize = 24;

const createStyles = (scheme: SchemeAdapter, settings: Settings) =>
  StyleSheet.create({
    container: {
      alignItems: "flex-start",
      width: 360,
      backgroundColor: scheme.surfaceVariantHex,
      borderRadius: 12,
    },
    containerTypeElevated: {
      backgroundColor: scheme.surfaceHex,
    },
    containerTypeOutlined: {
      backgroundColor: scheme.surfaceHex,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: scheme.outlineHex,
    },
    header: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    icon: {
      height: 24,
      width: 24,
      marginLeft: "auto",
      alignItems: "center",
      justifyContent: "center",
    },
    headerContent: {
      alignItems: "flex-start",
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
      height: 192,
    },
    imageNoHeader: {
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    body: {
      alignItems: "flex-start",
      padding: 16,
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
      flexDirection: "row",
      justifyContent: "flex-end",
      padding: 16,
      width: "100%",
    },
    button: {
      marginHorizontal: 8,
    },
    boxShadowElevation1: settings.boxShadowElevation1,
  });
