import React, { useState } from "react";
import {
  Button as NativeButton,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import {
  Button,
  Card,
  CrudeButton,
  InputChip,
  HorizontalCard,
  ThemeProvider,
  AssistiveChip,
  FilterChip,
  SuggestiveChip,
  Dialog,
  Avatar,
  FAB,
  Select,
  NavBarItem,
  NavBar,
  AppBar,
} from "@yetaanother/react-native-material-you";

// noinspection JSUnusedGlobalSymbols
export default function App() {
  const [currScreen, setCurrScreen] = useState<ExampleScreen>("light app bar");

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
              title={"Btn states (L)"}
              onPress={() => {
                setCurrScreen("light button states");
              }}
            />
          </View>
          <View style={{ margin: 4 }}>
            <NativeButton
              title={"Btn states (D)"}
              onPress={() => {
                setCurrScreen("dark button states");
              }}
            />
          </View>
          <View style={{ margin: 4 }}>
            <NativeButton
              title={"Btn (L)"}
              onPress={() => {
                setCurrScreen("light buttons");
              }}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ margin: 4 }}>
            <NativeButton
              title={"Btn (D)"}
              onPress={() => {
                setCurrScreen("dark buttons");
              }}
            />
          </View>
          <View style={{ margin: 4 }}>
            <NativeButton
              title={"Card (L)"}
              onPress={() => {
                setCurrScreen("light cards");
              }}
            />
          </View>
          <View style={{ margin: 4 }}>
            <NativeButton
              title={"Card (D)"}
              onPress={() => {
                setCurrScreen("dark cards");
              }}
            />
          </View>
          <View style={{ margin: 4 }}>
            <NativeButton
              title={"Chip states (L)"}
              onPress={() => {
                setCurrScreen("light chips");
              }}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ margin: 4 }}>
            <NativeButton
              title={"Chip states (D)"}
              onPress={() => {
                setCurrScreen("dark chips");
              }}
            />
          </View>
          <View style={{ margin: 4 }}>
            <NativeButton
              title={"Dialog (L)"}
              onPress={() => {
                setCurrScreen("light dialogs");
              }}
            />
          </View>
          <View style={{ margin: 4 }}>
            <NativeButton
              title={"Dialog (D)"}
              onPress={() => {
                setCurrScreen("dark dialogs");
              }}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ margin: 4 }}>
            <NativeButton
              title={"FAB States (L)"}
              onPress={() => {
                setCurrScreen("light fabs");
              }}
            />
          </View>
          <View style={{ margin: 4 }}>
            <NativeButton
              title={"FAB States(D)"}
              onPress={() => {
                setCurrScreen("dark fabs");
              }}
            />
          </View>
          <View style={{ margin: 4 }}>
            <NativeButton
              title={"Select (L)"}
              onPress={() => {
                setCurrScreen("light select");
              }}
            />
          </View>
          <View style={{ margin: 4 }}>
            <NativeButton
              title={"Select (D)"}
              onPress={() => {
                setCurrScreen("dark select");
              }}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ margin: 4 }}>
            <NativeButton
              title={"Nav bar (L)"}
              onPress={() => {
                setCurrScreen("light nav bar");
              }}
            />
          </View>
          <View style={{ margin: 4 }}>
            <NativeButton
              title={"Nav bar (D)"}
              onPress={() => {
                setCurrScreen("dark nav bar");
              }}
            />
          </View>
          <View style={{ margin: 4 }}>
            <NativeButton
              title={"App bar (L)"}
              onPress={() => {
                setCurrScreen("light app bar");
              }}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ margin: 4 }}>
            <NativeButton
              title={"App bar (D)"}
              onPress={() => {
                setCurrScreen("dark app bar");
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
        return getButtonStates(styles.parent, styles.child, styles.text);
      case "light buttons":
        return getButtons(styles.parent, styles.child);
      case "dark buttons":
        return (
          <ThemeProvider hexColor={"#6750A4"} dark={true}>
            {getButtons(styles.parentDark, styles.childDark)}
          </ThemeProvider>
        );
      case "light cards":
        return getCards(styles.parent, styles.child);
      case "dark cards":
        return (
          <ThemeProvider hexColor={"#6750A4"} dark={true}>
            {getCards(styles.parentDark, styles.childDark)}
          </ThemeProvider>
        );
      case "light chips":
        return getChips(styles.parent, styles.child, styles.text);
      case "dark chips":
        return (
          <ThemeProvider hexColor={"#6750A4"} dark={true}>
            {getChips(styles.parentDark, styles.childDark, styles.textDark)}
          </ThemeProvider>
        );
      case "light dialogs":
        return getDialogs(styles.parent, styles.child);
      case "dark dialogs":
        return (
          <ThemeProvider hexColor={"#6750A4"} dark={true}>
            {getDialogs(styles.parentDark, styles.childDark)}
          </ThemeProvider>
        );
      case "light fabs":
        return getFabs(styles.parent, styles.child, styles.text);
      case "dark fabs":
        return (
          <ThemeProvider hexColor={"#6750A4"} dark={true}>
            {getFabs(styles.parentDark, styles.childDark, styles.textDark)}
          </ThemeProvider>
        );
      case "light select":
        return getSelects(styles.parent, styles.child, styles.text);
      case "dark select":
        return (
          <ThemeProvider hexColor={"#6750A4"} dark={true}>
            {getSelects(styles.parentDark, styles.childDark, styles.textDark)}
          </ThemeProvider>
        );
      case "light nav bar":
        return getNavBars(styles.parent, styles.child, styles.text);
      case "dark nav bar":
        return (
          <ThemeProvider hexColor={"#6750A4"} dark={true}>
            {getNavBars(styles.parentDark, styles.childDark, styles.textDark)}
          </ThemeProvider>
        );
      case "light app bar":
        return getAppBars(styles.parent, styles.child, styles.text);
      case "dark app bar":
        return (
          <ThemeProvider hexColor={"#6750A4"} dark={true}>
            {getAppBars(styles.parentDark, styles.childDark, styles.textDark)}
          </ThemeProvider>
        );
    }
  };

  const getButtonStates = (
    parentStyle: ViewStyle,
    childStyle: ViewStyle,
    textStyle: TextStyle
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
    childStyle: ViewStyle,
    textStyle: TextStyle
  ) => {
    return (
      <>
        <Text style={textStyle}>Filled buttons</Text>
        <View style={childStyle}>
          <CrudeButton
            title={"Enabled"}
            onPress={() => {}}
            containerStyle={{ margin: 4 }}
          />
          <CrudeButton
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            containerStyle={{ margin: 4 }}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            containerStyle={{ margin: 4 }}
          />
          <CrudeButton
            title={"Disabled"}
            onPress={() => {}}
            state={"disabled"}
            containerStyle={{ margin: 4 }}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Enabled"}
            onPress={() => {}}
            containerStyle={{ margin: 4 }}
            icon={"add"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            containerStyle={{ margin: 4 }}
            icon={"add"}
          />
          <CrudeButton
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            containerStyle={{ margin: 4 }}
            icon={"add"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Disabled"}
            onPress={() => {}}
            state={"disabled"}
            containerStyle={{ margin: 4 }}
            icon={"add"}
          />
        </View>
      </>
    );
  };

  const getOutlinedButtonStates = (
    childStyle: ViewStyle,
    textStyle: TextStyle
  ) => {
    return (
      <>
        <Text style={textStyle}>Outlined buttons</Text>
        <View style={childStyle}>
          <CrudeButton
            title={"Enabled"}
            onPress={() => {}}
            containerStyle={{ margin: 4 }}
            type={"outlined"}
          />
          <CrudeButton
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            containerStyle={{ margin: 4 }}
            type={"outlined"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            containerStyle={{ margin: 4 }}
            type={"outlined"}
          />
          <CrudeButton
            title={"Disabled"}
            onPress={() => {}}
            state={"disabled"}
            containerStyle={{ margin: 4 }}
            type={"outlined"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Enabled"}
            onPress={() => {}}
            containerStyle={{ margin: 4 }}
            icon={"add"}
            type={"outlined"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            containerStyle={{ margin: 4 }}
            icon={"add"}
            type={"outlined"}
          />
          <CrudeButton
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            containerStyle={{ margin: 4 }}
            icon={"add"}
            type={"outlined"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Disabled"}
            onPress={() => {}}
            state={"disabled"}
            containerStyle={{ margin: 4 }}
            icon={"add"}
            type={"outlined"}
          />
        </View>
      </>
    );
  };

  const getTextButtonStates = (childStyle: ViewStyle, textStyle: TextStyle) => {
    return (
      <>
        <Text style={textStyle}>Text buttons</Text>
        <View style={childStyle}>
          <CrudeButton
            title={"Enabled"}
            onPress={() => {}}
            containerStyle={{ margin: 4 }}
            type={"text"}
          />
          <CrudeButton
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            containerStyle={{ margin: 4 }}
            type={"text"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            containerStyle={{ margin: 4 }}
            type={"text"}
          />
          <CrudeButton
            title={"Disabled"}
            onPress={() => {}}
            state={"disabled"}
            containerStyle={{ margin: 4 }}
            type={"text"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Enabled"}
            onPress={() => {}}
            containerStyle={{ margin: 4 }}
            icon={"add"}
            type={"text"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            containerStyle={{ margin: 4 }}
            icon={"add"}
            type={"text"}
          />
          <CrudeButton
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            containerStyle={{ margin: 4 }}
            icon={"add"}
            type={"text"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Disabled"}
            onPress={() => {}}
            state={"disabled"}
            containerStyle={{ margin: 4 }}
            icon={"add"}
            type={"text"}
          />
        </View>
      </>
    );
  };

  const getElevatedButtonStates = (
    childStyle: ViewStyle,
    textStyle: TextStyle
  ) => {
    return (
      <>
        <Text style={textStyle}>Elevated buttons</Text>
        <View style={childStyle}>
          <CrudeButton
            title={"Enabled"}
            onPress={() => {}}
            containerStyle={{ margin: 4 }}
            type={"elevated"}
          />
          <CrudeButton
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            containerStyle={{ margin: 4 }}
            type={"elevated"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            containerStyle={{ margin: 4 }}
            type={"elevated"}
          />
          <CrudeButton
            title={"Disabled"}
            onPress={() => {}}
            state={"disabled"}
            containerStyle={{ margin: 4 }}
            type={"elevated"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Enabled"}
            onPress={() => {}}
            containerStyle={{ margin: 4 }}
            icon={"add"}
            type={"elevated"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            containerStyle={{ margin: 4 }}
            icon={"add"}
            type={"elevated"}
          />
          <CrudeButton
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            containerStyle={{ margin: 4 }}
            icon={"add"}
            type={"elevated"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Disabled"}
            onPress={() => {}}
            state={"disabled"}
            containerStyle={{ margin: 4 }}
            icon={"add"}
            type={"elevated"}
          />
        </View>
      </>
    );
  };

  const getTonalButtonStates = (
    childStyle: ViewStyle,
    textStyle: TextStyle
  ) => {
    return (
      <>
        <Text style={textStyle}>Tonal buttons</Text>
        <View style={childStyle}>
          <CrudeButton
            title={"Enabled"}
            onPress={() => {}}
            containerStyle={{ margin: 4 }}
            type={"tonal"}
          />
          <CrudeButton
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            containerStyle={{ margin: 4 }}
            type={"tonal"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            containerStyle={{ margin: 4 }}
            type={"tonal"}
          />
          <CrudeButton
            title={"Disabled"}
            onPress={() => {}}
            state={"disabled"}
            containerStyle={{ margin: 4 }}
            type={"tonal"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Enabled"}
            onPress={() => {}}
            containerStyle={{ margin: 4 }}
            icon={"add"}
            type={"tonal"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Focused"}
            onPress={() => {}}
            state={"focused"}
            containerStyle={{ margin: 4 }}
            icon={"add"}
            type={"tonal"}
          />
          <CrudeButton
            title={"Pressed"}
            onPress={() => {}}
            state={"pressed"}
            containerStyle={{ margin: 4 }}
            icon={"add"}
            type={"tonal"}
          />
        </View>
        <View style={childStyle}>
          <CrudeButton
            title={"Disabled"}
            onPress={() => {}}
            state={"disabled"}
            containerStyle={{ margin: 4 }}
            icon={"add"}
            type={"tonal"}
          />
        </View>
      </>
    );
  };

  const getButtons = (parentStyle: ViewStyle, childStyle: ViewStyle) => {
    return (
      <View style={parentStyle}>
        <View style={childStyle}>
          <Button
            containerStyle={{ margin: 4 }}
            title={"Enabled"}
            type={"filled"}
          />
          <Button
            containerStyle={{ margin: 4 }}
            title={"Enabled"}
            type={"outlined"}
          />
          <Button
            containerStyle={{ margin: 4 }}
            title={"Enabled"}
            type={"text"}
          />
        </View>
        <View style={childStyle}>
          <Button
            containerStyle={{ margin: 4 }}
            title={"Enabled"}
            type={"elevated"}
          />
          <Button
            containerStyle={{ margin: 4 }}
            title={"Enabled"}
            type={"tonal"}
          />
        </View>
        <View style={childStyle}>
          <Button
            containerStyle={{ margin: 4 }}
            title={"Enabled"}
            type={"filled"}
            icon={"add"}
          />
          <Button
            containerStyle={{ margin: 4 }}
            title={"Enabled"}
            type={"outlined"}
            icon={"add"}
          />
        </View>
        <View style={childStyle}>
          <Button
            containerStyle={{ margin: 4 }}
            title={"Enabled"}
            type={"text"}
            icon={"add"}
          />
          <Button
            containerStyle={{ margin: 4 }}
            title={"Enabled"}
            type={"elevated"}
            icon={"add"}
          />
        </View>
        <View style={childStyle}>
          <Button
            containerStyle={{ margin: 4 }}
            title={"Enabled"}
            type={"tonal"}
            icon={"add"}
          />
        </View>
      </View>
    );
  };

  const getCards = (parentStyle: ViewStyle, childStyle: ViewStyle) => {
    return (
      <View style={parentStyle}>
        <View style={childStyle}>
          <Card
            primaryAction={true}
            secondaryAction={true}
            title={"Title"}
            content={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor"
            }
            subTitle={"Subhead"}
            imageSrc={require("./assets/card-background.jpg")}
            avatar={true}
            headerTitle={"Header"}
            headerSubTitle={"Subhead"}
            closable={true}
          />
        </View>
        <View style={childStyle}>
          <Card
            primaryAction={true}
            secondaryAction={true}
            title={"Title"}
            content={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor"
            }
            subTitle={"Subhead"}
            imageSrc={require("./assets/card-background.jpg")}
            avatar={true}
            headerTitle={"Header"}
            headerSubTitle={"Subhead"}
            closable={true}
            type={"elevated"}
          />
        </View>
        <View style={childStyle}>
          <Card
            primaryAction={true}
            secondaryAction={true}
            title={"Title"}
            content={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor"
            }
            subTitle={"Subhead"}
            imageSrc={require("./assets/card-background.jpg")}
            avatar={true}
            headerTitle={"Header"}
            headerSubTitle={"Subhead"}
            closable={true}
            type={"outlined"}
          />
        </View>
        <View style={childStyle}>
          <HorizontalCard
            imageSrc={require("./assets/card-background.jpg")}
            avatar={true}
            headerTitle={"Header"}
            headerSubTitle={"Subhead"}
            type={"filled"}
          />
        </View>
        <View style={childStyle}>
          <HorizontalCard
            imageSrc={require("./assets/card-background.jpg")}
            avatar={true}
            headerTitle={"Header"}
            headerSubTitle={"Subhead"}
            type={"elevated"}
          />
        </View>
        <View style={childStyle}>
          <HorizontalCard
            imageSrc={require("./assets/card-background.jpg")}
            avatar={true}
            headerTitle={"Header"}
            headerSubTitle={"Subhead"}
            type={"outlined"}
          />
        </View>
      </View>
    );
  };

  const getChips = (
    parentStyle: ViewStyle,
    childStyle: ViewStyle,
    textStyle: TextStyle
  ) => {
    return (
      <View style={parentStyle}>
        <Text style={textStyle}>Input unselected chips</Text>
        <View style={childStyle}>
          <InputChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            stateOverride={"enabled"}
          />
          <InputChip
            label={"Focused"}
            stateOverride={"focused"}
            containerStyle={{ margin: 4 }}
          />
        </View>
        <Text style={textStyle}>Input selected chips</Text>
        <View style={childStyle}>
          <InputChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            selected={true}
            stateOverride={"enabled"}
          />
          <InputChip
            label={"Focused"}
            stateOverride={"focused"}
            containerStyle={{ margin: 4 }}
            selected={true}
          />
        </View>
        <Text style={textStyle}>Input unselected closable chips</Text>
        <View style={childStyle}>
          <InputChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            closeable={true}
            stateOverride={"enabled"}
          />
          <InputChip
            label={"Focused"}
            stateOverride={"focused"}
            containerStyle={{ margin: 4 }}
            closeable={true}
          />
        </View>
        <Text style={textStyle}>Input selected closeable chips</Text>
        <View style={childStyle}>
          <InputChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            selected={true}
            closeable={true}
            stateOverride={"enabled"}
          />
          <InputChip
            label={"Focused"}
            stateOverride={"focused"}
            containerStyle={{ margin: 4 }}
            selected={true}
            closeable={true}
          />
        </View>
        <Text style={textStyle}>Input unselected chips with avatar</Text>
        <View style={childStyle}>
          <InputChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            avatar={true}
            stateOverride={"enabled"}
          />
          <InputChip
            label={"Focused"}
            stateOverride={"focused"}
            containerStyle={{ margin: 4 }}
            avatar={true}
          />
        </View>
        <Text style={textStyle}>Input selected chips with avaar</Text>
        <View style={childStyle}>
          <InputChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            selected={true}
            avatar={true}
            stateOverride={"enabled"}
          />
          <InputChip
            label={"Focused"}
            stateOverride={"focused"}
            containerStyle={{ margin: 4 }}
            selected={true}
            avatar={true}
          />
        </View>
        <Text style={textStyle}>
          Input unselected closeable chips with avatar
        </Text>
        <View style={childStyle}>
          <InputChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            avatar={true}
            closeable={true}
            stateOverride={"enabled"}
          />
          <InputChip
            label={"Focused"}
            stateOverride={"focused"}
            containerStyle={{ margin: 4 }}
            avatar={true}
            closeable={true}
          />
        </View>
        <Text style={textStyle}>Input selected chips with avatar</Text>
        <View style={childStyle}>
          <InputChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            selected={true}
            avatar={true}
            closeable={true}
            stateOverride={"enabled"}
          />
          <InputChip
            label={"Focused"}
            stateOverride={"focused"}
            containerStyle={{ margin: 4 }}
            selected={true}
            avatar={true}
            closeable={true}
          />
        </View>
        <Text style={textStyle}>Assistive chips</Text>
        <View style={childStyle}>
          <AssistiveChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            stateOverride={"enabled"}
          />
          <AssistiveChip
            label={"Focused"}
            stateOverride={"focused"}
            containerStyle={{ margin: 4 }}
          />
          <AssistiveChip
            label={"Pressed"}
            stateOverride={"pressed"}
            containerStyle={{ margin: 4 }}
          />
        </View>
        <View style={childStyle}>
          <AssistiveChip
            label={"Disabled"}
            stateOverride={"disabled"}
            containerStyle={{ margin: 4 }}
          />
        </View>
        <Text style={textStyle}>Assistive elevated chips</Text>
        <View style={childStyle}>
          <AssistiveChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            stateOverride={"enabled"}
          />
          <AssistiveChip
            label={"Focused"}
            stateOverride={"focused"}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
          <AssistiveChip
            label={"Pressed"}
            stateOverride={"pressed"}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
        </View>
        <View style={childStyle}>
          <AssistiveChip
            label={"Disabled"}
            stateOverride={"disabled"}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
        </View>
        <Text style={textStyle}>Assistive chips with icons</Text>
        <View style={childStyle}>
          <AssistiveChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            icon={"car"}
            stateOverride={"enabled"}
          />
          <AssistiveChip
            label={"Focused"}
            stateOverride={"focused"}
            containerStyle={{ margin: 4 }}
            icon={"car"}
          />
        </View>
        <View style={childStyle}>
          <AssistiveChip
            label={"Pressed"}
            stateOverride={"pressed"}
            containerStyle={{ margin: 4 }}
            icon={"car"}
          />
          <AssistiveChip
            label={"Disabled"}
            stateOverride={"disabled"}
            containerStyle={{ margin: 4 }}
            icon={"car"}
          />
        </View>
        <Text style={textStyle}>Assistive elevated chips with icons</Text>
        <View style={childStyle}>
          <AssistiveChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            icon={"car"}
            stateOverride={"enabled"}
          />
          <AssistiveChip
            label={"Focused"}
            stateOverride={"focused"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            icon={"car"}
          />
        </View>
        <View style={childStyle}>
          <AssistiveChip
            label={"Pressed"}
            stateOverride={"pressed"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            icon={"car"}
          />
          <AssistiveChip
            label={"Disabled"}
            stateOverride={"disabled"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            icon={"car"}
          />
        </View>
        <Text style={textStyle}>Unselected filter chips without elevation</Text>
        <View style={childStyle}>
          <FilterChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            stateOverride={"enabled"}
          />
          <FilterChip
            label={"Focused"}
            stateOverride={"focused"}
            containerStyle={{ margin: 4 }}
          />
          <FilterChip
            label={"Pressed"}
            stateOverride={"pressed"}
            containerStyle={{ margin: 4 }}
          />
        </View>
        <View style={childStyle}>
          <FilterChip
            label={"Disabled"}
            stateOverride={"disabled"}
            containerStyle={{ margin: 4 }}
          />
        </View>
        <Text style={textStyle}>Selected filter chips without elevation</Text>
        <View style={childStyle}>
          <FilterChip
            label={"Enabled"}
            selected={true}
            containerStyle={{ margin: 4 }}
            stateOverride={"enabled"}
          />
          <FilterChip
            label={"Focused"}
            stateOverride={"focused"}
            selected={true}
            containerStyle={{ margin: 4 }}
          />
        </View>
        <View style={childStyle}>
          <FilterChip
            label={"Pressed"}
            stateOverride={"pressed"}
            selected={true}
            containerStyle={{ margin: 4 }}
          />
          <FilterChip
            label={"Disabled"}
            stateOverride={"disabled"}
            selected={true}
            containerStyle={{ margin: 4 }}
          />
        </View>
        <Text style={textStyle}>Unselected elevated filter chips</Text>
        <View style={childStyle}>
          <FilterChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            stateOverride={"enabled"}
          />
          <FilterChip
            label={"Focused"}
            stateOverride={"focused"}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
          <FilterChip
            label={"Pressed"}
            stateOverride={"pressed"}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
        </View>
        <View style={childStyle}>
          <FilterChip
            label={"Disabled"}
            stateOverride={"disabled"}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
        </View>
        <Text style={textStyle}>Selected elevated filter chips</Text>
        <View style={childStyle}>
          <FilterChip
            label={"Enabled"}
            selected={true}
            containerStyle={{ margin: 4 }}
            elevated={true}
            stateOverride={"enabled"}
          />
          <FilterChip
            label={"Focused"}
            stateOverride={"focused"}
            selected={true}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
        </View>
        <View style={childStyle}>
          <FilterChip
            label={"Pressed"}
            stateOverride={"pressed"}
            selected={true}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
          <FilterChip
            label={"Disabled"}
            stateOverride={"disabled"}
            selected={true}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
        </View>
        <Text style={textStyle}>
          Unselected dropdown filter chips without elevation
        </Text>
        <View style={childStyle}>
          <FilterChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            dropdown={true}
            stateOverride={"enabled"}
          />
          <FilterChip
            label={"Focused"}
            stateOverride={"focused"}
            containerStyle={{ margin: 4 }}
            dropdown={true}
          />
        </View>
        <View style={childStyle}>
          <FilterChip
            label={"Pressed"}
            stateOverride={"pressed"}
            containerStyle={{ margin: 4 }}
            dropdown={true}
          />
          <FilterChip
            label={"Disabled"}
            stateOverride={"disabled"}
            containerStyle={{ margin: 4 }}
            dropdown={true}
          />
        </View>
        <Text style={textStyle}>
          Selected dropdown filter chips without elevation
        </Text>
        <View style={childStyle}>
          <FilterChip
            label={"Enabled"}
            selected={true}
            containerStyle={{ margin: 4 }}
            dropdown={true}
            stateOverride={"enabled"}
          />
        </View>
        <View style={childStyle}>
          <FilterChip
            label={"Focused"}
            stateOverride={"focused"}
            selected={true}
            containerStyle={{ margin: 4 }}
            dropdown={true}
          />
          <FilterChip
            label={"Pressed"}
            stateOverride={"pressed"}
            selected={true}
            containerStyle={{ margin: 4 }}
            dropdown={true}
          />
        </View>
        <View style={childStyle}>
          <FilterChip
            label={"Disabled"}
            stateOverride={"disabled"}
            selected={true}
            containerStyle={{ margin: 4 }}
            dropdown={true}
          />
        </View>
        <Text style={textStyle}>Unselected dropdown elevated filter chips</Text>
        <View style={childStyle}>
          <FilterChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            dropdown={true}
            stateOverride={"enabled"}
          />
          <FilterChip
            label={"Focused"}
            stateOverride={"focused"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            dropdown={true}
          />
        </View>
        <View style={childStyle}>
          <FilterChip
            label={"Pressed"}
            stateOverride={"pressed"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            dropdown={true}
          />
          <FilterChip
            label={"Disabled"}
            stateOverride={"disabled"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            dropdown={true}
          />
        </View>
        <Text style={textStyle}>Selected dropdown elevated filter chips</Text>
        <View style={childStyle}>
          <FilterChip
            label={"Enabled"}
            selected={true}
            containerStyle={{ margin: 4 }}
            elevated={true}
            dropdown={true}
            stateOverride={"enabled"}
          />
        </View>
        <View style={childStyle}>
          <FilterChip
            label={"Focused"}
            stateOverride={"focused"}
            selected={true}
            containerStyle={{ margin: 4 }}
            elevated={true}
            dropdown={true}
          />
          <FilterChip
            label={"Pressed"}
            stateOverride={"pressed"}
            selected={true}
            containerStyle={{ margin: 4 }}
            elevated={true}
            dropdown={true}
          />
        </View>
        <View style={childStyle}>
          <FilterChip
            label={"Disabled"}
            stateOverride={"disabled"}
            selected={true}
            containerStyle={{ margin: 4 }}
            elevated={true}
            dropdown={true}
          />
        </View>
        <Text style={textStyle}>Unselected unelevated suggestive chips</Text>
        <View style={childStyle}>
          <SuggestiveChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            stateOverride={"enabled"}
          />
          <SuggestiveChip
            label={"Focused"}
            containerStyle={{ margin: 4 }}
            stateOverride={"focused"}
          />
        </View>
        <View style={childStyle}>
          <SuggestiveChip
            label={"Pressed"}
            containerStyle={{ margin: 4 }}
            stateOverride={"pressed"}
          />
          <SuggestiveChip
            label={"Disabled"}
            containerStyle={{ margin: 4 }}
            stateOverride={"disabled"}
          />
        </View>
        <Text style={textStyle}>Unselected elevated suggestive chips</Text>
        <View style={childStyle}>
          <SuggestiveChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            stateOverride={"enabled"}
          />
          <SuggestiveChip
            label={"Focused"}
            containerStyle={{ margin: 4 }}
            stateOverride={"focused"}
            elevated={true}
          />
        </View>
        <View style={childStyle}>
          <SuggestiveChip
            label={"Pressed"}
            containerStyle={{ margin: 4 }}
            stateOverride={"pressed"}
            elevated={true}
          />
          <SuggestiveChip
            label={"Disabled"}
            containerStyle={{ margin: 4 }}
            stateOverride={"disabled"}
            elevated={true}
          />
        </View>
        <Text style={textStyle}>Selected unelevated suggestive chips</Text>
        <View style={childStyle}>
          <SuggestiveChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            selected={true}
            stateOverride={"enabled"}
          />
          <SuggestiveChip
            label={"Focused"}
            containerStyle={{ margin: 4 }}
            stateOverride={"focused"}
            selected={true}
          />
        </View>
        <View style={childStyle}>
          <SuggestiveChip
            label={"Pressed"}
            containerStyle={{ margin: 4 }}
            stateOverride={"pressed"}
            selected={true}
          />
          <SuggestiveChip
            label={"Disabled"}
            containerStyle={{ margin: 4 }}
            stateOverride={"disabled"}
            selected={true}
          />
        </View>
        <Text style={textStyle}>Selected elevated suggestive chips</Text>
        <View style={childStyle}>
          <SuggestiveChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            selected={true}
            stateOverride={"enabled"}
          />
          <SuggestiveChip
            label={"Focused"}
            containerStyle={{ margin: 4 }}
            stateOverride={"focused"}
            elevated={true}
            selected={true}
          />
        </View>
        <View style={childStyle}>
          <SuggestiveChip
            label={"Pressed"}
            containerStyle={{ margin: 4 }}
            stateOverride={"pressed"}
            elevated={true}
            selected={true}
          />
          <SuggestiveChip
            label={"Disabled"}
            containerStyle={{ margin: 4 }}
            stateOverride={"disabled"}
            elevated={true}
            selected={true}
          />
        </View>
        <Text style={textStyle}>
          Unselected unelevated suggestive chips with icon
        </Text>
        <View style={childStyle}>
          <SuggestiveChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            icon={"car"}
            stateOverride={"enabled"}
          />
          <SuggestiveChip
            label={"Focused"}
            containerStyle={{ margin: 4 }}
            stateOverride={"focused"}
            icon={"car"}
          />
        </View>
        <View style={childStyle}>
          <SuggestiveChip
            label={"Pressed"}
            containerStyle={{ margin: 4 }}
            stateOverride={"pressed"}
            icon={"car"}
          />
          <SuggestiveChip
            label={"Disabled"}
            containerStyle={{ margin: 4 }}
            stateOverride={"disabled"}
            icon={"car"}
          />
        </View>
        <Text style={textStyle}>
          Unselected elevated suggestive chips with icons
        </Text>
        <View style={childStyle}>
          <SuggestiveChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            icon={"car"}
            stateOverride={"enabled"}
          />
          <SuggestiveChip
            label={"Focused"}
            containerStyle={{ margin: 4 }}
            stateOverride={"focused"}
            elevated={true}
            icon={"car"}
          />
        </View>
        <View style={childStyle}>
          <SuggestiveChip
            label={"Pressed"}
            containerStyle={{ margin: 4 }}
            stateOverride={"pressed"}
            elevated={true}
            icon={"car"}
          />
          <SuggestiveChip
            label={"Disabled"}
            containerStyle={{ margin: 4 }}
            stateOverride={"disabled"}
            elevated={true}
            icon={"car"}
          />
        </View>
        <Text style={textStyle}>
          Selected unelevated suggestive chips with icons
        </Text>
        <View style={childStyle}>
          <SuggestiveChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            selected={true}
            icon={"car"}
            stateOverride={"enabled"}
          />
          <SuggestiveChip
            label={"Focused"}
            containerStyle={{ margin: 4 }}
            stateOverride={"focused"}
            selected={true}
            icon={"car"}
          />
        </View>
        <View style={childStyle}>
          <SuggestiveChip
            label={"Pressed"}
            containerStyle={{ margin: 4 }}
            stateOverride={"pressed"}
            selected={true}
            icon={"car"}
          />
          <SuggestiveChip
            label={"Disabled"}
            containerStyle={{ margin: 4 }}
            stateOverride={"disabled"}
            selected={true}
            icon={"car"}
          />
        </View>
        <Text style={textStyle}>
          Selected elevated suggestive chips with icons
        </Text>
        <View style={childStyle}>
          <SuggestiveChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            selected={true}
            icon={"car"}
          />
          <SuggestiveChip
            label={"Focused"}
            containerStyle={{ margin: 4 }}
            stateOverride={"focused"}
            elevated={true}
            selected={true}
            icon={"car"}
          />
        </View>
        <View style={childStyle}>
          <SuggestiveChip
            label={"Pressed"}
            containerStyle={{ margin: 4 }}
            stateOverride={"pressed"}
            elevated={true}
            selected={true}
            icon={"car"}
          />
          <SuggestiveChip
            label={"Disabled"}
            containerStyle={{ margin: 4 }}
            stateOverride={"disabled"}
            elevated={true}
            selected={true}
            icon={"car"}
          />
        </View>
      </View>
    );
  };

  const getDialogs = (parentStyle: ViewStyle, childStyle: ViewStyle) => {
    return (
      <View style={parentStyle}>
        <View style={childStyle}>
          <Dialog
            title={"Dialog with hero icon"}
            content={
              "A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made. "
            }
            primaryAction={true}
            secondaryAction={true}
            heroIcon={"logo-android"}
          />
        </View>
        <View style={childStyle}>
          <Dialog
            title={"Basic dialog title"}
            content={
              "A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made. "
            }
            primaryAction={true}
            secondaryAction={true}
          />
        </View>
        <View style={childStyle}>
          <Dialog
            title={"Basic dialog title"}
            content={
              "A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made. "
            }
            primaryAction={true}
            secondaryAction={true}
          >
            <View>
              <Avatar initials={"PC"} />
              <Text style={{ color: "#49454f" }}>
                I am a children component
              </Text>
            </View>
          </Dialog>
        </View>
      </View>
    );
  };

  const getFabs = (
    parentStyle: ViewStyle,
    childStyle: ViewStyle,
    textStyle: TextStyle
  ) => {
    return (
      <View style={parentStyle}>
        <Text style={textStyle}>Surface FAB</Text>
        <View style={childStyle}>
          <FAB containerStyle={{ margin: 4 }} stateOverride={"enabled"} />
          <FAB containerStyle={{ margin: 4 }} stateOverride={"focused"} />
          <FAB containerStyle={{ margin: 4 }} stateOverride={"pressed"} />
          <FAB containerStyle={{ margin: 4 }} stateOverride={"disabled"} />
        </View>
        <Text style={textStyle}>Primary FAB</Text>
        <View style={childStyle}>
          <FAB
            containerStyle={{ margin: 4 }}
            type={"primary"}
            stateOverride={"enabled"}
          />
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"focused"}
            type={"primary"}
          />
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"pressed"}
            type={"primary"}
          />
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"disabled"}
            type={"primary"}
          />
        </View>
        <Text style={textStyle}>Secondary FAB</Text>
        <View style={childStyle}>
          <FAB
            containerStyle={{ margin: 4 }}
            type={"secondary"}
            stateOverride={"enabled"}
          />
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"focused"}
            type={"secondary"}
          />
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"pressed"}
            type={"secondary"}
          />
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"disabled"}
            type={"secondary"}
          />
        </View>
        <Text style={textStyle}>Tertiary FAB</Text>
        <View style={childStyle}>
          <FAB
            containerStyle={{ margin: 4 }}
            type={"tertiary"}
            stateOverride={"enabled"}
          />
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"focused"}
            type={"tertiary"}
          />
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"pressed"}
            type={"tertiary"}
          />
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"disabled"}
            type={"tertiary"}
          />
        </View>
        <Text style={textStyle}>Surface large FAB</Text>
        <View style={childStyle}>
          <FAB
            containerStyle={{ margin: 4 }}
            large={true}
            stateOverride={"enabled"}
          />
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"focused"}
            large={true}
          />
        </View>
        <View style={childStyle}>
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"pressed"}
            large={true}
          />
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"disabled"}
            large={true}
          />
        </View>
        <Text style={textStyle}>Primary large FAB</Text>
        <View style={childStyle}>
          <FAB
            containerStyle={{ margin: 4 }}
            type={"primary"}
            large={true}
            stateOverride={"enabled"}
          />
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"focused"}
            type={"primary"}
            large={true}
          />
        </View>
        <View style={childStyle}>
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"pressed"}
            type={"primary"}
            large={true}
          />
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"disabled"}
            type={"primary"}
            large={true}
          />
        </View>
        <Text style={textStyle}>Secondary large FAB</Text>
        <View style={childStyle}>
          <FAB
            containerStyle={{ margin: 4 }}
            type={"secondary"}
            large={true}
            stateOverride={"enabled"}
          />
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"focused"}
            type={"secondary"}
            large={true}
          />
        </View>
        <View style={childStyle}>
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"pressed"}
            type={"secondary"}
            large={true}
          />
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"disabled"}
            type={"secondary"}
            large={true}
          />
        </View>
        <Text style={textStyle}>Tertiary large FAB</Text>
        <View style={childStyle}>
          <FAB
            containerStyle={{ margin: 4 }}
            type={"tertiary"}
            large={true}
            stateOverride={"enabled"}
          />
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"focused"}
            type={"tertiary"}
            large={true}
          />
        </View>
        <View style={childStyle}>
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"pressed"}
            type={"tertiary"}
            large={true}
          />
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"disabled"}
            type={"tertiary"}
            large={true}
          />
        </View>
        <Text style={textStyle}>Surface FAB with label</Text>
        <View style={childStyle}>
          <FAB
            containerStyle={{ margin: 4 }}
            label={"Enabled"}
            stateOverride={"enabled"}
          />
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"focused"}
            label={"Focused"}
          />
        </View>
        <View style={childStyle}>
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"pressed"}
            label={"Pressed"}
          />
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"disabled"}
            label={"Disabled"}
          />
        </View>
        <Text style={textStyle}>Primary FAB with label</Text>
        <View style={childStyle}>
          <FAB
            containerStyle={{ margin: 4 }}
            type={"primary"}
            label={"Enabled"}
            stateOverride={"enabled"}
          />
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"focused"}
            type={"primary"}
            label={"Focused"}
          />
        </View>
        <View style={childStyle}>
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"pressed"}
            type={"primary"}
            label={"Pressed"}
          />
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"disabled"}
            type={"primary"}
            label={"Disabled"}
          />
        </View>
        <Text style={textStyle}>Secondary FAB with label</Text>
        <View style={childStyle}>
          <FAB
            containerStyle={{ margin: 4 }}
            type={"secondary"}
            label={"Enabled"}
            stateOverride={"enabled"}
          />
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"focused"}
            type={"secondary"}
            label={"Focused"}
          />
        </View>
        <View style={childStyle}>
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"pressed"}
            type={"secondary"}
            label={"Pressed"}
          />
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"disabled"}
            type={"secondary"}
            label={"Disabled"}
          />
        </View>
        <Text style={textStyle}>Tertiary FAB with label</Text>
        <View style={childStyle}>
          <FAB
            containerStyle={{ margin: 4 }}
            type={"tertiary"}
            label={"Enabled"}
            stateOverride={"enabled"}
          />
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"focused"}
            type={"tertiary"}
            label={"Focused"}
          />
        </View>
        <View style={childStyle}>
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"pressed"}
            type={"tertiary"}
            label={"Pressed"}
          />
          <FAB
            containerStyle={{ margin: 4 }}
            stateOverride={"disabled"}
            type={"tertiary"}
            label={"Disabled"}
          />
        </View>
      </View>
    );
  };
  const getSelects = (
    parentStyle: ViewStyle,
    childStyle: ViewStyle,
    textStyle: TextStyle
  ) => {
    return (
      <View style={parentStyle}>
        <Text style={textStyle}>Filled select</Text>
        <Select
          choices={["item 1", "item 2", "item 3", "item 4", "item 5", "item 6"]}
          containerStyle={{ margin: 4 }}
        />
        <Select
          choices={["item 1", "item 2", "item 3", "item 4", "item 5", "item 6"]}
          icon={"person-sharp"}
          containerStyle={{ margin: 4 }}
        />
        <Text style={textStyle}>Filled mandatory select</Text>
        <Select
          choices={["item 1", "item 2", "item 3", "item 4", "item 5", "item 6"]}
          containerStyle={{ margin: 4 }}
          mandatory={true}
        />
        <Select
          choices={["item 1", "item 2", "item 3", "item 4", "item 5", "item 6"]}
          icon={"person-sharp"}
          containerStyle={{ margin: 4 }}
          mandatory={true}
        />
        <Text style={textStyle}>Filled searchable select</Text>
        <Select
          choices={["item 1", "item 2", "item 3", "item 4", "item 5", "item 6"]}
          containerStyle={{ margin: 4 }}
          searchable={true}
        />
        <Select
          choices={["item 1", "item 2", "item 3", "item 4", "item 5", "item 6"]}
          icon={"person-sharp"}
          containerStyle={{ margin: 4 }}
          searchable={true}
        />
        <Text style={textStyle}>Filled mandatory searchable select</Text>
        <Select
          choices={["item 1", "item 2", "item 3", "item 4", "item 5", "item 6"]}
          containerStyle={{ margin: 4 }}
          searchable={true}
          mandatory={true}
        />
        <Select
          choices={["item 1", "item 2", "item 3", "item 4", "item 5", "item 6"]}
          icon={"person-sharp"}
          containerStyle={{ margin: 4 }}
          searchable={true}
          mandatory={true}
        />
        <Text style={textStyle}>Outlined select</Text>
        <Select
          choices={["item 1", "item 2", "item 3", "item 4", "item 5", "item 6"]}
          containerStyle={{ margin: 4 }}
          type={"outlined"}
        />
        <Select
          choices={["item 1", "item 2", "item 3", "item 4", "item 5", "item 6"]}
          icon={"person-sharp"}
          containerStyle={{ margin: 4 }}
          type={"outlined"}
        />
        <Text style={textStyle}>Outlined mandatory select</Text>
        <Select
          choices={["item 1", "item 2", "item 3", "item 4", "item 5", "item 6"]}
          containerStyle={{ margin: 8 }}
          mandatory={true}
          type={"outlined"}
        />
        <Select
          choices={["item 1", "item 2", "item 3", "item 4", "item 5", "item 6"]}
          icon={"person-sharp"}
          containerStyle={{ margin: 8 }}
          mandatory={true}
          type={"outlined"}
        />
        <Text style={textStyle}>Outlined searchable select</Text>
        <Select
          choices={["item 1", "item 2", "item 3", "item 4", "item 5", "item 6"]}
          containerStyle={{ margin: 4 }}
          searchable={true}
          type={"outlined"}
        />
        <Select
          choices={["item 1", "item 2", "item 3", "item 4", "item 5", "item 6"]}
          icon={"person-sharp"}
          containerStyle={{ margin: 4 }}
          searchable={true}
          type={"outlined"}
        />
        <Text style={textStyle}>Outlined mandatory searchable select</Text>
        <Select
          choices={["item 1", "item 2", "item 3", "item 4", "item 5", "item 6"]}
          containerStyle={{ margin: 8 }}
          searchable={true}
          mandatory={true}
          type={"outlined"}
        />
        <Select
          choices={["item 1", "item 2", "item 3", "item 4", "item 5", "item 6"]}
          icon={"person-sharp"}
          containerStyle={{ margin: 8 }}
          searchable={true}
          mandatory={true}
          type={"outlined"}
        />
      </View>
    );
  };

  const getNavBars = (
    parentStyle: ViewStyle,
    childStyle: ViewStyle,
    textStyle: TextStyle
  ) => {
    return (
      <View style={parentStyle}>
        <Text style={textStyle}>Inactive items with label</Text>
        <View style={childStyle}>
          <NavBarItem
            label={"Label"}
            active={false}
            containerStyle={{ margin: 4 }}
          />
          <NavBarItem
            label={"Label"}
            active={false}
            containerStyle={{ margin: 4 }}
            badge={true}
          />
          <NavBarItem
            label={"Label"}
            active={false}
            containerStyle={{ margin: 4 }}
            badge={true}
            // inactiveIcon={"american-football"}
            badgeCount={3}
          />
        </View>
        <Text style={textStyle}>Inactive items without label</Text>
        <View style={childStyle}>
          <NavBarItem active={false} containerStyle={{ margin: 4 }} />
          <NavBarItem
            active={false}
            containerStyle={{ margin: 4 }}
            badge={true}
          />
          <NavBarItem
            active={false}
            containerStyle={{ margin: 4 }}
            badge={true}
            inactiveIcon={"american-football"}
            badgeCount={3}
          />
        </View>
        <Text style={textStyle}>Active items with label</Text>
        <View style={childStyle}>
          <NavBarItem
            label={"Label"}
            active={true}
            containerStyle={{ margin: 4 }}
          />
          <NavBarItem
            label={"Label"}
            active={true}
            containerStyle={{ margin: 4 }}
            badge={true}
          />
          <NavBarItem
            label={"Label"}
            active={true}
            containerStyle={{ margin: 4 }}
            badge={true}
            inactiveIcon={"american-football"}
            badgeCount={3}
          />
        </View>
        <Text style={textStyle}>Active items without label</Text>
        <View style={childStyle}>
          <NavBarItem active={true} containerStyle={{ margin: 4 }} />
          <NavBarItem
            active={true}
            containerStyle={{ margin: 4 }}
            badge={true}
          />
          <NavBarItem
            active={true}
            containerStyle={{ margin: 4 }}
            badge={true}
            activeIcon={"american-football"}
            badgeCount={3}
          />
        </View>
        <View style={childStyle}>
          <NavBar>
            <NavBarItem />
            <NavBarItem />
            <NavBarItem />
          </NavBar>
        </View>
        <View style={childStyle}>
          <NavBar>
            <NavBarItem />
            <NavBarItem />
            <NavBarItem />
            <NavBarItem />
          </NavBar>
        </View>
        <View style={childStyle}>
          <NavBar>
            <NavBarItem badge={true} onSuccessClearBadge={() => true} />
            <NavBarItem badge={true} onSuccessClearBadge={() => false} />
            <NavBarItem
              badge={true}
              badgeCount={50}
              onSuccessClearBadge={() => false}
            />
            <NavBarItem badge={true} onSuccessClearBadge={() => true} />
            <NavBarItem badge={true} onSuccessClearBadge={() => true} />
          </NavBar>
        </View>
      </View>
    );
  };

  const getAppBars = (
    parentStyle: ViewStyle,
    childStyle: ViewStyle,
    textStyle: TextStyle
  ) => {
    return (
      <View style={parentStyle}>
        <Text style={textStyle}>Onscroll app bars</Text>
        <View style={childStyle}>
          <AppBar
            title={"Product"}
            leadingIcon={"list"}
            trailingIcon={"person-sharp"}
            containerStyle={{ margin: 4 }}
          />
        </View>
        <View style={childStyle}>
          <AppBar
            title={"Product"}
            leadingIcon={"list"}
            trailingIcon={"person-sharp"}
            containerStyle={{ margin: 4 }}
            titleCentered={true}
          />
        </View>
        <View style={childStyle}>
          <AppBar
            title={"Product"}
            leadingIcon={"arrow-back"}
            trailingIcon={["attach", "calendar", "ellipsis-vertical"]}
            containerStyle={{ margin: 4 }}
          />
        </View>
        <View style={childStyle}>
          <AppBar
            title={"Product"}
            leadingIcon={"list"}
            trailingIcon={"person-sharp"}
            containerStyle={{ margin: 4 }}
            size={"medium"}
          />
        </View>
        <View style={childStyle}>
          <AppBar
            title={"Product"}
            leadingIcon={"arrow-back"}
            trailingIcon={["attach", "calendar", "ellipsis-vertical"]}
            containerStyle={{ margin: 4 }}
            size={"medium"}
            titleCentered={true}
          />
        </View>
        <View style={childStyle}>
          <AppBar
            title={"Product"}
            leadingIcon={"list"}
            trailingIcon={"person-sharp"}
            containerStyle={{ margin: 4 }}
            size={"large"}
            titleCentered={true}
          />
        </View>
        <View style={childStyle}>
          <AppBar
            title={"Product"}
            leadingIcon={"arrow-back"}
            trailingIcon={["attach", "calendar", "ellipsis-vertical"]}
            containerStyle={{ margin: 4 }}
            size={"large"}
          />
        </View>
        <Text style={textStyle}>Flat app bars</Text>
        <View style={childStyle}>
          <AppBar
            title={"Product"}
            leadingIcon={"list"}
            trailingIcon={"person-sharp"}
            containerStyle={{ margin: 4 }}
            type={"flat"}
          />
        </View>
        <View style={childStyle}>
          <AppBar
            title={"Product"}
            leadingIcon={"list"}
            trailingIcon={"person-sharp"}
            containerStyle={{ margin: 4 }}
            titleCentered={true}
            type={"flat"}
          />
        </View>
        <View style={childStyle}>
          <AppBar
            title={"Product"}
            leadingIcon={"arrow-back"}
            trailingIcon={["attach", "calendar", "ellipsis-vertical"]}
            containerStyle={{ margin: 4 }}
            type={"flat"}
          />
        </View>
        <View style={childStyle}>
          <AppBar
            title={"Product"}
            leadingIcon={"list"}
            trailingIcon={"person-sharp"}
            containerStyle={{ margin: 4 }}
            size={"medium"}
            type={"flat"}
          />
        </View>
        <View style={childStyle}>
          <AppBar
            title={"Product"}
            leadingIcon={"arrow-back"}
            trailingIcon={["attach", "calendar", "ellipsis-vertical"]}
            containerStyle={{ margin: 4 }}
            size={"medium"}
            titleCentered={true}
            type={"flat"}
          />
        </View>
        <View style={childStyle}>
          <AppBar
            title={"Product"}
            leadingIcon={"list"}
            trailingIcon={"person-sharp"}
            containerStyle={{ margin: 4 }}
            size={"large"}
            titleCentered={true}
            type={"flat"}
          />
        </View>
        <View style={childStyle}>
          <AppBar
            title={"Product"}
            leadingIcon={"arrow-back"}
            trailingIcon={["attach", "calendar", "ellipsis-vertical"]}
            containerStyle={{ margin: 4 }}
            size={"large"}
            type={"flat"}
          />
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
    backgroundColor: "#FFFFFF",
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
