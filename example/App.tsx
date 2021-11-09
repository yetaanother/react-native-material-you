import React from "react";
import { Button as NativeButton, StyleSheet, View } from "react-native";
import { Button } from "@yetaanother/react-native-material-you";

export default function App() {
  return (
    <>
      <View style={{ ...styles.button, marginTop: 48 }}>
        <NativeButton title={"Native"} onPress={() => {}} />
        <Button title={"Enabled"} onPress={() => {}} />
        <Button title={"Hovered"} onPress={() => {}} state={"hovered"} />
        <Button title={"Focused"} onPress={() => {}} state={"focused"} />
      </View>
      <View style={{ ...styles.button, margin: 16 }}>
        <Button title={"Pressed"} onPress={() => {}} state={"pressed"} />
        <Button title={"Disabled"} onPress={() => {}} state={"disabled"} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
  },
});
