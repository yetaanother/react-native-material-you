import React, { FunctionComponent, useContext } from "react";
import { SchemeAdapter } from "../providers/SchemeAdapter";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { ThemeContext } from "../providers/ThemeProvider";
import { Avatar } from "../Avatar";
import { Settings } from "../providers/Settings";

interface HorizontalCardProps {
  type?: CardType;
  headerTitle: string;
  headerSubTitle?: string;
  avatar?: boolean;
  avatarInitials?: string;
  imageSrc?: ImageSourcePropType;
}

// M3 docs: https://m3.material.io/components/cards/specs
export const HorizontalCard: FunctionComponent<HorizontalCardProps> = ({
  type,
  headerTitle,
  headerSubTitle,
  avatar,
  avatarInitials,
  imageSrc,
}) => {
  const { scheme, settings } = useContext(ThemeContext);
  const styles = createStyles(scheme, settings);

  const render = () => {
    return (
      <View style={getCardStyles()}>
        {renderHeader()}
        {renderImage()}
      </View>
    );
  };

  const renderHeader = () => {
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
      </View>
    );
  };

  const renderImage = () => {
    if (!imageSrc) {
      return;
    }
    return <Image style={styles.image} source={imageSrc} />;
  };

  const getCardStyles = () => {
    let cardStyles: ViewStyle = { ...styles.card };
    if (type === "elevated") {
      cardStyles = {
        ...cardStyles,
        ...styles.cardTypeElevated,
        ...styles.boxShadowElevation1,
      };
    } else if (type === "outlined") {
      cardStyles = { ...cardStyles, ...styles.cardTypeOutlined };
    }
    return cardStyles;
  };
  return render();
};

const createStyles = (scheme: SchemeAdapter, settings: Settings) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "flex-start",
      width: 352,
      height: 80,
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
    boxShadowElevation1: settings.boxShadowElevation1,
    header: {
      height: "100%",
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
    },
    image: {
      height: "100%",
      width: 80,
      marginLeft: "auto",
      borderTopRightRadius: 12,
      borderBottomRightRadius: 12,
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
  });
