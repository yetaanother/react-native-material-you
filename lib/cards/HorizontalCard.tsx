import React, { FunctionComponent, useContext } from "react";
import { SchemeAdapter } from "../providers/SchemeAdapter";
import {
  Image,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ThemeContext } from "../providers/ThemeProvider";
import { Avatar } from "../Avatar";

interface HorizontalCardProps {
  type?: CardType;
  headerTitle: string;
  headerSubTitle?: string;
  avatar?: boolean;
  avatarInitials?: string;
  imageSrc?: ImageSourcePropType;
}

export const HorizontalCard: FunctionComponent<HorizontalCardProps> = ({
  type,
  headerTitle,
  headerSubTitle,
  avatar,
  avatarInitials,
  imageSrc,
}) => {
  const scheme = useContext(ThemeContext);
  const styles = createStyles(scheme);

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
        <View>{avatar && <Avatar initials={avatarInitials} />}</View>
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
    let cardStyles = { ...styles.card };
    if (type === "elevated") {
      cardStyles = {
        ...cardStyles,
        ...styles.cardTypeElevated,
        ...styles.boxShadowElevation2,
      };
    } else if (type === "outlined") {
      cardStyles = { ...cardStyles, ...styles.cardTypeOutlined };
    }
    return cardStyles;
  };
  return render();
};

const createStyles = (scheme: SchemeAdapter) =>
  StyleSheet.create({
    card: {
      display: "flex",
      flexDirection: "row",
      padding: 0,
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
    // https://ethercreative.github.io/react-native-shadow-generator/
    boxShadowElevation2: {
      ...Platform.select({
        ios: {
          shadowColor: scheme.shadowHex,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
        },
        android: {
          elevation: 2,
          shadowColor: scheme.shadowHex,
        },
      }),
    },
    header: {
      height: "100%",
      display: "flex",
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
  });
