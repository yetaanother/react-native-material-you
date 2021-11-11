import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "@yetaanother/react-native-material-you";

export default function App() {
  const getFilledButtons = () => {
    return (
      <>
        <Text>Filled buttons</Text>
        <View style={{ ...styles.child }}>
          <Button title={"Enabled"} onPress={() => {}} style={{ margin: 4 }} />
          <Button
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
            style={{ margin: 4 }}
          />
          <Button
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            style={{ margin: 4 }}
          />
        </View>
        <View style={{ ...styles.child }}>
          <Button
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            style={{ margin: 4 }}
          />
          <Button
            title={"Disabled"}
            onPress={() => {}}
            state={"disabled"}
            style={{ margin: 4 }}
          />
        </View>
        <View style={{ ...styles.child }}>
          <Button
            title={"Enabled"}
            onPress={() => {}}
            style={{ margin: 4 }}
            icon={"add"}
          />
          <Button
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
            style={{ margin: 4 }}
            icon={"add"}
          />
        </View>
        <View style={{ ...styles.child }}>
          <Button
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            style={{ margin: 4 }}
            icon={"add"}
          />
          <Button
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            style={{ margin: 4 }}
            icon={"add"}
          />
        </View>
        <View style={{ ...styles.child }}>
          <Button
            title={"Disabled"}
            onPress={() => {}}
            state={"disabled"}
            style={{ margin: 4 }}
            icon={"add"}
          />
        </View>
      </>
    );
  };

  const getOutlinedButtons = () => {
    return (
      <>
        <Text>Outlined buttons</Text>
        <View style={{ ...styles.child }}>
          <Button
            title={"Enabled"}
            onPress={() => {}}
            style={{ margin: 4 }}
            type={"outlined"}
          />
          <Button
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
            style={{ margin: 4 }}
            type={"outlined"}
          />
          <Button
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            style={{ margin: 4 }}
            type={"outlined"}
          />
        </View>
        <View style={{ ...styles.child }}>
          <Button
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            style={{ margin: 4 }}
            type={"outlined"}
          />
          <Button
            title={"Disabled"}
            onPress={() => {}}
            state={"disabled"}
            style={{ margin: 4 }}
            type={"outlined"}
          />
        </View>
        <View style={{ ...styles.child }}>
          <Button
            title={"Enabled"}
            onPress={() => {}}
            style={{ margin: 4 }}
            icon={"add"}
            type={"outlined"}
          />
          <Button
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"outlined"}
          />
        </View>
        <View style={{ ...styles.child }}>
          <Button
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"outlined"}
          />
          <Button
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"outlined"}
          />
        </View>
        <View style={{ ...styles.child }}>
          <Button
            title={"Disabled"}
            onPress={() => {}}
            state={"disabled"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"outlined"}
          />
        </View>
      </>
    );
  };

  const getTextButtons = () => {
    return (
      <>
        <Text>Text buttons</Text>
        <View style={{ ...styles.child }}>
          <Button
            title={"Enabled"}
            onPress={() => {}}
            style={{ margin: 4 }}
            type={"text"}
          />
          <Button
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
            style={{ margin: 4 }}
            type={"text"}
          />
          <Button
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            style={{ margin: 4 }}
            type={"text"}
          />
        </View>
        <View style={{ ...styles.child }}>
          <Button
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            style={{ margin: 4 }}
            type={"text"}
          />
          <Button
            title={"Disabled"}
            onPress={() => {}}
            state={"disabled"}
            style={{ margin: 4 }}
            type={"text"}
          />
        </View>
        <View style={{ ...styles.child }}>
          <Button
            title={"Enabled"}
            onPress={() => {}}
            style={{ margin: 4 }}
            icon={"add"}
            type={"text"}
          />
          <Button
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"text"}
          />
        </View>
        <View style={{ ...styles.child }}>
          <Button
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"text"}
          />
          <Button
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"text"}
          />
        </View>
        <View style={{ ...styles.child }}>
          <Button
            title={"Disabled"}
            onPress={() => {}}
            state={"disabled"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"text"}
          />
        </View>
      </>
    );
  };

  const getElevatedButtons = () => {
    return (
      <>
        <Text>Elevated buttons</Text>
        <View style={{ ...styles.child }}>
          <Button
            title={"Enabled"}
            onPress={() => {}}
            style={{ margin: 4 }}
            type={"elevated"}
          />
          <Button
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
            style={{ margin: 4 }}
            type={"elevated"}
          />
          <Button
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            style={{ margin: 4 }}
            type={"elevated"}
          />
        </View>
        <View style={{ ...styles.child }}>
          <Button
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            style={{ margin: 4 }}
            type={"elevated"}
          />
          <Button
            title={"Disabled"}
            onPress={() => {}}
            state={"disabled"}
            style={{ margin: 4 }}
            type={"elevated"}
          />
        </View>
        <View style={{ ...styles.child }}>
          <Button
            title={"Enabled"}
            onPress={() => {}}
            style={{ margin: 4 }}
            icon={"add"}
            type={"elevated"}
          />
          <Button
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"elevated"}
          />
        </View>
        <View style={{ ...styles.child }}>
          <Button
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"elevated"}
          />
          <Button
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"elevated"}
          />
        </View>
        <View style={{ ...styles.child }}>
          <Button
            title={"Disabled"}
            onPress={() => {}}
            state={"disabled"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"elevated"}
          />
        </View>
      </>
    );
  };

  const getTonalButtons = () => {
    return (
      <>
        <Text>Tonal buttons</Text>
        <View style={{ ...styles.child }}>
          <Button
            title={"Enabled"}
            onPress={() => {}}
            style={{ margin: 4 }}
            type={"tonal"}
          />
          <Button
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
            style={{ margin: 4 }}
            type={"tonal"}
          />
          <Button
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            style={{ margin: 4 }}
            type={"tonal"}
          />
        </View>
        <View style={{ ...styles.child }}>
          <Button
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            style={{ margin: 4 }}
            type={"tonal"}
          />
          <Button
            title={"Disabled"}
            onPress={() => {}}
            state={"disabled"}
            style={{ margin: 4 }}
            type={"tonal"}
          />
        </View>
        <View style={{ ...styles.child }}>
          <Button
            title={"Enabled"}
            onPress={() => {}}
            style={{ margin: 4 }}
            icon={"add"}
            type={"tonal"}
          />
          <Button
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"tonal"}
          />
        </View>
        <View style={{ ...styles.child }}>
          <Button
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"tonal"}
          />
          <Button
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"tonal"}
          />
        </View>
        <View style={{ ...styles.child }}>
          <Button
            title={"Disabled"}
            onPress={() => {}}
            state={"disabled"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"tonal"}
          />
        </View>
      </>
    );
  };

  return (
    <ScrollView>
      <View style={{ ...styles.parent, marginVertical: 48 }}>
        {getFilledButtons()}
        {getOutlinedButtons()}
        {getTextButtons()}
        {getElevatedButtons()}
        {getTonalButtons()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 8,
  },
  child: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 4,
    margin: 4,
  },
});
