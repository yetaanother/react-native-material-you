import React, { useState } from "react";
import {
  Button as NativeButton,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button } from "@yetaanother/react-native-material-you";

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
        return getDarkButtons();
      case "light buttons":
        return getLightButtons();
    }
  };
  const getLightButtons = () => {
    return (
      <View style={styles.parent}>
        {getFilledButtons()}
        {getOutlinedButtons()}
        {getTextButtons()}
        {getElevatedButtons()}
        {getTonalButtons()}
      </View>
    );
  };

  const getDarkButtons = () => {
    return <View style={styles.parentDark}>{getDarkFilledButtons()}</View>;
  };

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

  const getDarkFilledButtons = () => {
    return (
      <>
        <Text style={{ color: "white" }}>Filled buttons</Text>
        <View style={{ ...styles.childDark }}>
          <Button
            title={"Enabled"}
            onPress={() => {}}
            style={{ margin: 4 }}
            theme={"dark"}
          />
          <Button
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
            style={{ margin: 4 }}
            theme={"dark"}
          />
          <Button
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            style={{ margin: 4 }}
            theme={"dark"}
          />
        </View>
        <View style={{ ...styles.childDark }}>
          <Button
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            style={{ margin: 4 }}
            theme={"dark"}
          />
          <Button
            title={"Disabled"}
            onPress={() => {}}
            state={"disabled"}
            style={{ margin: 4 }}
            theme={"dark"}
          />
        </View>
        <View style={{ ...styles.childDark }}>
          <Button
            title={"Enabled"}
            onPress={() => {}}
            style={{ margin: 4 }}
            icon={"add"}
            theme={"dark"}
          />
          <Button
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
            style={{ margin: 4 }}
            icon={"add"}
            theme={"dark"}
          />
        </View>
        <View style={{ ...styles.childDark }}>
          <Button
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            style={{ margin: 4 }}
            icon={"add"}
            theme={"dark"}
          />
          <Button
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            style={{ margin: 4 }}
            icon={"add"}
            theme={"dark"}
          />
        </View>
        <View style={{ ...styles.childDark }}>
          <Button
            title={"Disabled"}
            onPress={() => {}}
            state={"disabled"}
            style={{ margin: 4 }}
            icon={"add"}
            theme={"dark"}
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
