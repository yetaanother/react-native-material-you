import React, { useState } from "react";
import {
  Button as NativeButton,
  ImageStyle,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Button } from "@yetaanother/react-native-material-you";
import { ThemeProvider } from "@yetaanother/react-native-material-you";

export default function App() {
  const [currScreen, setCurrScreen] = useState<
    "light buttons" | "dark buttons"
  >("light buttons");

  const render = () => {
    return (
      <ScrollView>
        <View style={{ marginVertical: 48 }}>
          {getToggleButtons()}
          {getCurrScreen()}
        </View>
      </ScrollView>
    );
  };

  const getToggleButtons = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <View style={{ margin: 4 }}>
          <NativeButton
            title={"Light buttons"}
            onPress={() => {
              setCurrScreen("light buttons");
            }}
          />
        </View>
        <View style={{ margin: 4 }}>
          <NativeButton
            title={"Dark buttons"}
            onPress={() => {
              setCurrScreen("dark buttons");
            }}
          />
        </View>
      </View>
    );
  };

  const getCurrScreen = () => {
    switch (currScreen) {
      case "dark buttons":
        return (
          <ThemeProvider hexColor={"#6750A4"} dark={true}>
            {getButtons(styles.parentDark, styles.childDark)}
          </ThemeProvider>
        );
      case "light buttons":
        return (
          <ThemeProvider hexColor={"#6750A4"}>
            {getButtons(styles.parent, styles.child)}
          </ThemeProvider>
        );
    }
  };
  const getButtons = (
    parentStyle: ViewStyle | TextStyle | ImageStyle,
    childStyle: ViewStyle | TextStyle | ImageStyle
  ) => {
    return (
      <View style={parentStyle}>
        {getFilledButtons(childStyle)}
        {getOutlinedButtons(childStyle)}
        {getTextButtons(childStyle)}
        {getElevatedButtons(childStyle)}
        {getTonalButtons(childStyle)}
      </View>
    );
  };

  const getFilledButtons = (childStyle: ViewStyle | TextStyle | ImageStyle) => {
    return (
      <>
        <Text>Filled buttons</Text>
        <View style={childStyle}>
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
        <View style={childStyle}>
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
        <View style={childStyle}>
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
        <View style={childStyle}>
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
        <View style={childStyle}>
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

  const getOutlinedButtons = (
    childStyle: ViewStyle | TextStyle | ImageStyle
  ) => {
    return (
      <>
        <Text>Outlined buttons</Text>
        <View style={childStyle}>
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
        <View style={childStyle}>
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
        <View style={childStyle}>
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
        <View style={childStyle}>
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
        <View style={childStyle}>
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

  const getTextButtons = (childStyle: ViewStyle | TextStyle | ImageStyle) => {
    return (
      <>
        <Text>Text buttons</Text>
        <View style={childStyle}>
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
        <View style={childStyle}>
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
        <View style={childStyle}>
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
        <View style={childStyle}>
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
        <View style={childStyle}>
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

  const getElevatedButtons = (
    childStyle: ViewStyle | TextStyle | ImageStyle
  ) => {
    return (
      <>
        <Text>Elevated buttons</Text>
        <View style={childStyle}>
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
        <View style={childStyle}>
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
        <View style={childStyle}>
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
        <View style={childStyle}>
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
        <View style={childStyle}>
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

  const getTonalButtons = (childStyle: ViewStyle | TextStyle | ImageStyle) => {
    return (
      <>
        <Text>Tonal buttons</Text>
        <View style={childStyle}>
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
        <View style={childStyle}>
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
        <View style={childStyle}>
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
        <View style={childStyle}>
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
        <View style={childStyle}>
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

  return render();
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 8,
  },
  parentDark: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#1F1F1F",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 8,
  },
  child: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFF",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 4,
    margin: 4,
  },
  childDark: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#1F1F1F",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 4,
    margin: 4,
  },
});
