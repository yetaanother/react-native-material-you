import React, { FunctionComponent, useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "./ThemeProvider";
import { SchemeAdapter } from "./SchemeAdapter";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "./Button";

interface CardProps {
  horizontal?: boolean;
  type?: CardType;
  headerTitle?: string;
  headerSubTitle?: string;
  headerIcon?: string;
  imageSrc?: string;
  title?: string;
  subTitle?: string;
  content?: string;
  onPrimaryPress?: () => void;
  onSecondaryPress?: () => void;
  onClosePress?: () => void;
}

export const Card: FunctionComponent<CardProps> = ({ horizontal, type }) => {
  const scheme = useContext(ThemeContext);
  const styles = createStyles(scheme);

  horizontal = !horizontal ? false : horizontal;
  type = !type ? "filled" : type;

  const render = () => {
    return (
      <View style={styles.card}>
        {renderHeader()}
        {renderImage()}
        {renderContent()}
        {renderButtons()}
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <View>
          <Text style={{ ...styles.monogram }}>A</Text>
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Header</Text>
          <Text style={styles.headerSubTitle}>Subhead</Text>
        </View>
        <View style={styles.icon}>
          <Ionicons name={"close"} size={14} color={scheme.outlineHex} />
        </View>
      </View>
    );
  };

  const renderImage = () => {
    return (
      <Image
        style={styles.image}
        source={require("./assets/card-background.jpg")}
      />
    );
  };

  const renderContent = () => {
    return (
      <>
        <View style={styles.body}>
          <Text style={styles.bodyTitle}>Title</Text>
          <Text style={styles.bodySubTitle}>Subhead</Text>
        </View>
        <View style={{ ...styles.body, height: 72 }}>
          <Text style={styles.bodySubTitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </Text>
        </View>
      </>
    );
  };

  const renderButtons = () => {
    return (
      <View style={styles.buttons}>
        <Button
          containerStyle={styles.button}
          title={"Enabled"}
          type={"outlined"}
        />
        <Button
          containerStyle={styles.button}
          title={"Enabled"}
          type={"filled"}
        />
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
  });
