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
import {
  CrudeButton,
  Button,
  ThemeProvider,
  Card,
} from "@yetaanother/react-native-material-you";

// noinspection JSUnusedGlobalSymbols
export default function App() {
  const [currScreen, setCurrScreen] = useState<ExampleScreen>("light cards");

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
      <>
        <View style={{ flexDirection: "row" }}>
          <View style={{ margin: 4 }}>
            <NativeButton
              title={"Light states"}
              onPress={() => {
                setCurrScreen("light button states");
              }}
            />
          </View>
          <View style={{ margin: 4 }}>
            <NativeButton
              title={"Dark states"}
              onPress={() => {
                setCurrScreen("dark button states");
              }}
            />
          </View>
        </View>
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
        <View style={{ flexDirection: "row" }}>
          <View style={{ margin: 4 }}>
            <NativeButton
              title={"Light cards"}
              onPress={() => {
                setCurrScreen("light cards");
              }}
            />
          </View>
          <View style={{ margin: 4 }}>
            <NativeButton
              title={"Dark cards"}
              onPress={() => {
                setCurrScreen("dark cards");
              }}
            />
          </View>
        </View>
      </>
    );
  };

  const getCurrScreen = () => {
    switch (currScreen) {
      case "dark button states":
        return (
          <ThemeProvider hexColor={"#6750A4"} dark={true}>
            {getButtonStates(
              styles.parentDark,
              styles.childDark,
              styles.textDark
            )}
          </ThemeProvider>
        );
      case "light button states":
        return (
          <ThemeProvider hexColor={"#6750A4"}>
            {getButtonStates(styles.parent, styles.child, styles.text)}
          </ThemeProvider>
        );
      case "light buttons":
        return <>{getButtons(styles.parent, styles.child)}</>;
      case "dark buttons":
        return (
          <ThemeProvider hexColor={"#6750A4"} dark={true}>
            {getButtons(styles.parentDark, styles.childDark)}
          </ThemeProvider>
        );
      case "light cards":
        return <>{getCards(styles.parent, styles.child)}</>;
      case "dark cards":
        return (
          <ThemeProvider hexColor={"#6750A4"} dark={true}>
            {getCards(styles.parentDark, styles.childDark)}
          </ThemeProvider>
        );
    }
  };
  const getButtonStates = (
    parentStyle: ViewStyle | TextStyle | ImageStyle,
    childStyle: ViewStyle | TextStyle | ImageStyle,
    textStyle: ViewStyle | TextStyle | ImageStyle
  ) => {
    return (
      <View style={parentStyle}>
        {getFilledButtonStates(childStyle, textStyle)}
        {getOutlinedButtonStates(childStyle, textStyle)}
        {getTextButtonStates(childStyle, textStyle)}
        {getElevatedButtonStates(childStyle, textStyle)}
        {getTonalButtonStates(childStyle, textStyle)}
      </View>
    );
  };

  const getFilledButtonStates = (
    childStyle: ViewStyle | TextStyle | ImageStyle,
    textStyle: ViewStyle | TextStyle | ImageStyle
  ) => {
    return (
      <>
        <Text style={textStyle}>Filled buttons</Text>
        <View style={childStyle}>
          <CrudeButton
            title={"Enabled"}
            onPress={() => {}}
            style={{ margin: 4 }}
          />
          <CrudeButton
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
            style={{ margin: 4 }}
          />
          <CrudeButton
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            style={{ margin: 4 }}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            style={{ margin: 4 }}
          />
          <CrudeButton
            title={"Disabled"}
            onPress={() => {}}
            state={"disabled"}
            style={{ margin: 4 }}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Enabled"}
            onPress={() => {}}
            style={{ margin: 4 }}
            icon={"add"}
          />
          <CrudeButton
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
            style={{ margin: 4 }}
            icon={"add"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            style={{ margin: 4 }}
            icon={"add"}
          />
          <CrudeButton
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            style={{ margin: 4 }}
            icon={"add"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
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

  const getOutlinedButtonStates = (
    childStyle: ViewStyle | TextStyle | ImageStyle,
    textStyle: ViewStyle | TextStyle | ImageStyle
  ) => {
    return (
      <>
        <Text style={textStyle}>Outlined buttons</Text>
        <View style={childStyle}>
          <CrudeButton
            title={"Enabled"}
            onPress={() => {}}
            style={{ margin: 4 }}
            type={"outlined"}
          />
          <CrudeButton
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
            style={{ margin: 4 }}
            type={"outlined"}
          />
          <CrudeButton
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            style={{ margin: 4 }}
            type={"outlined"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            style={{ margin: 4 }}
            type={"outlined"}
          />
          <CrudeButton
            title={"Disabled"}
            onPress={() => {}}
            state={"disabled"}
            style={{ margin: 4 }}
            type={"outlined"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Enabled"}
            onPress={() => {}}
            style={{ margin: 4 }}
            icon={"add"}
            type={"outlined"}
          />
          <CrudeButton
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"outlined"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"outlined"}
          />
          <CrudeButton
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"outlined"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
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

  const getTextButtonStates = (
    childStyle: ViewStyle | TextStyle | ImageStyle,
    textStyle: ViewStyle | TextStyle | ImageStyle
  ) => {
    return (
      <>
        <Text style={textStyle}>Text buttons</Text>
        <View style={childStyle}>
          <CrudeButton
            title={"Enabled"}
            onPress={() => {}}
            style={{ margin: 4 }}
            type={"text"}
          />
          <CrudeButton
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
            style={{ margin: 4 }}
            type={"text"}
          />
          <CrudeButton
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            style={{ margin: 4 }}
            type={"text"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            style={{ margin: 4 }}
            type={"text"}
          />
          <CrudeButton
            title={"Disabled"}
            onPress={() => {}}
            state={"disabled"}
            style={{ margin: 4 }}
            type={"text"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Enabled"}
            onPress={() => {}}
            style={{ margin: 4 }}
            icon={"add"}
            type={"text"}
          />
          <CrudeButton
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"text"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"text"}
          />
          <CrudeButton
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"text"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
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

  const getElevatedButtonStates = (
    childStyle: ViewStyle | TextStyle | ImageStyle,
    textStyle: ViewStyle | TextStyle | ImageStyle
  ) => {
    return (
      <>
        <Text style={textStyle}>Elevated buttons</Text>
        <View style={childStyle}>
          <CrudeButton
            title={"Enabled"}
            onPress={() => {}}
            style={{ margin: 4 }}
            type={"elevated"}
          />
          <CrudeButton
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
            style={{ margin: 4 }}
            type={"elevated"}
          />
          <CrudeButton
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            style={{ margin: 4 }}
            type={"elevated"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            style={{ margin: 4 }}
            type={"elevated"}
          />
          <CrudeButton
            title={"Disabled"}
            onPress={() => {}}
            state={"disabled"}
            style={{ margin: 4 }}
            type={"elevated"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Enabled"}
            onPress={() => {}}
            style={{ margin: 4 }}
            icon={"add"}
            type={"elevated"}
          />
          <CrudeButton
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"elevated"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"elevated"}
          />
          <CrudeButton
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"elevated"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
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

  const getTonalButtonStates = (
    childStyle: ViewStyle | TextStyle | ImageStyle,
    textStyle: ViewStyle | TextStyle | ImageStyle
  ) => {
    return (
      <>
        <Text style={textStyle}>Tonal buttons</Text>
        <View style={childStyle}>
          <CrudeButton
            title={"Enabled"}
            onPress={() => {}}
            style={{ margin: 4 }}
            type={"tonal"}
          />
          <CrudeButton
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
            style={{ margin: 4 }}
            type={"tonal"}
          />
          <CrudeButton
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            style={{ margin: 4 }}
            type={"tonal"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            style={{ margin: 4 }}
            type={"tonal"}
          />
          <CrudeButton
            title={"Disabled"}
            onPress={() => {}}
            state={"disabled"}
            style={{ margin: 4 }}
            type={"tonal"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Enabled"}
            onPress={() => {}}
            style={{ margin: 4 }}
            icon={"add"}
            type={"tonal"}
          />
          <CrudeButton
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"tonal"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"tonal"}
          />
          <CrudeButton
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            style={{ margin: 4 }}
            icon={"add"}
            type={"tonal"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
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

  const getButtons = (
    parentStyle: ViewStyle | TextStyle | ImageStyle,
    childStyle: ViewStyle | TextStyle | ImageStyle
  ) => {
    return (
      <View style={parentStyle}>
        <View style={childStyle}>
          <Button style={{ margin: 4 }} title={"Enabled"} type={"filled"} />
          <Button style={{ margin: 4 }} title={"Enabled"} type={"outlined"} />
          <Button style={{ margin: 4 }} title={"Enabled"} type={"text"} />
        </View>
        <View style={childStyle}>
          <Button style={{ margin: 4 }} title={"Enabled"} type={"elevated"} />
          <Button style={{ margin: 4 }} title={"Enabled"} type={"tonal"} />
        </View>
        <View style={childStyle}>
          <Button
            style={{ margin: 4 }}
            title={"Enabled"}
            type={"filled"}
            icon={"add"}
          />
          <Button
            style={{ margin: 4 }}
            title={"Enabled"}
            type={"outlined"}
            icon={"add"}
          />
        </View>
        <View style={childStyle}>
          <Button
            style={{ margin: 4 }}
            title={"Enabled"}
            type={"text"}
            icon={"add"}
          />
          <Button
            style={{ margin: 4 }}
            title={"Enabled"}
            type={"elevated"}
            icon={"add"}
          />
        </View>
        <View style={childStyle}>
          <Button
            style={{ margin: 4 }}
            title={"Enabled"}
            type={"tonal"}
            icon={"add"}
          />
        </View>
      </View>
    );
  };

  const getCards = (
    parentStyle: ViewStyle | TextStyle | ImageStyle,
    childStyle: ViewStyle | TextStyle | ImageStyle
  ) => {
    return (
      <View style={parentStyle}>
        <View style={childStyle}>
          <Card />
        </View>
      </View>
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
  text: {
    color: "black",
  },
  textDark: {
    color: "white",
  },
});
