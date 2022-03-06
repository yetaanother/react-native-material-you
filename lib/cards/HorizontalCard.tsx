import React, { FunctionComponent, useContext } from "react";
import { ColorScheme } from "../providers/ColorScheme";
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
import { Shadows } from "../providers/Shadows";
import { M3Constants } from "../utils/M3Constants";

interface HorizontalCardProps {
  type?: CardType;
  headerTitle: string;
  headerSubTitle?: string;
  avatar?: boolean;
  avatarInitials?: string;
  imageSrc?: ImageSourcePropType;
  containerStyle?: ViewStyle;
}

// M3 docs: https://m3.material.io/components/cards/specs
export const HorizontalCard: FunctionComponent<HorizontalCardProps> = ({
  type,
  headerTitle,
  headerSubTitle,
  avatar,
  avatarInitials,
  imageSrc,
  containerStyle,
}) => {
  const { scheme, settings } = useContext(ThemeContext);
  const styles = createStyles(scheme, settings);

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
      </>
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

  return render();
};

const createStyles = (scheme: ColorScheme, settings: Shadows) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "flex-start",
      width: 352,
      height: 80,
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
      ...M3Constants.titleMediumText,
      marginVertical: 4,
      color: scheme.onSurfaceHex,
    },
    headerSubTitle: {
      ...M3Constants.bodyMediumText,
      marginVertical: 4,
      color: scheme.onSurfaceHex,
    },
  });
