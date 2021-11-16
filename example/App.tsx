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
  CrudeInputChip,
  HorizontalCard,
  ThemeProvider,
  CrudeAssistiveChip,
  CrudeFilterChip,
  CrudeSuggestiveChip,
} from "@yetaanother/react-native-material-you";

// noinspection JSUnusedGlobalSymbols
export default function App() {
  const [currScreen, setCurrScreen] = useState<ExampleScreen>("light chips");

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
      case "light chips":
        return <>{getChips(styles.parent, styles.child, styles.text)}</>;
      case "dark chips":
        return (
          <ThemeProvider hexColor={"#6750A4"} dark={true}>
            {getChips(styles.parentDark, styles.childDark, styles.textDark)}
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
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
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
          <CrudeButton
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
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
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
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
          <CrudeButton
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
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
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
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
          <CrudeButton
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
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
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
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
          <CrudeButton
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
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
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
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
          <CrudeButton
            title={"Hovered"}
            onPress={() => {}}
            state={"hovered"}
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
        <Text style={textStyle}>Input unslected chips</Text>
        <View style={childStyle}>
          <CrudeInputChip label={"Enabled"} containerStyle={{ margin: 4 }} />
          <CrudeInputChip
            label={"Hovered"}
            state={"hovered"}
            containerStyle={{ margin: 4 }}
          />
          <CrudeInputChip
            label={"Focused"}
            state={"focused"}
            containerStyle={{ margin: 4 }}
          />
          <CrudeInputChip
            label={"Dragged"}
            state={"dragged"}
            containerStyle={{ margin: 4 }}
          />
        </View>
        <Text style={textStyle}>Input selected chips</Text>
        <View style={childStyle}>
          <CrudeInputChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            selected={true}
          />
          <CrudeInputChip
            label={"Hovered"}
            state={"hovered"}
            containerStyle={{ margin: 4 }}
            selected={true}
          />
          <CrudeInputChip
            label={"Focused"}
            state={"focused"}
            containerStyle={{ margin: 4 }}
            selected={true}
          />
          <CrudeInputChip
            label={"Dragged"}
            state={"dragged"}
            containerStyle={{ margin: 4 }}
            selected={true}
          />
        </View>
        <Text style={textStyle}>Input unslected closable chips</Text>
        <View style={childStyle}>
          <CrudeInputChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            closeable={true}
          />
          <CrudeInputChip
            label={"Hovered"}
            state={"hovered"}
            containerStyle={{ margin: 4 }}
            closeable={true}
          />
          <CrudeInputChip
            label={"Focused"}
            state={"focused"}
            containerStyle={{ margin: 4 }}
            closeable={true}
          />
        </View>
        <View style={childStyle}>
          <CrudeInputChip
            label={"Dragged"}
            state={"dragged"}
            containerStyle={{ margin: 4 }}
            closeable={true}
          />
        </View>
        <Text style={textStyle}>Input selected closeable chips</Text>
        <View style={childStyle}>
          <CrudeInputChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            selected={true}
            closeable={true}
          />
          <CrudeInputChip
            label={"Hovered"}
            state={"hovered"}
            containerStyle={{ margin: 4 }}
            selected={true}
            closeable={true}
          />
          <CrudeInputChip
            label={"Focused"}
            state={"focused"}
            containerStyle={{ margin: 4 }}
            selected={true}
            closeable={true}
          />
        </View>
        <View style={childStyle}>
          <CrudeInputChip
            label={"Dragged"}
            state={"dragged"}
            containerStyle={{ margin: 4 }}
            selected={true}
            closeable={true}
          />
        </View>
        <Text style={textStyle}>Input unslected chips with avatar</Text>
        <View style={childStyle}>
          <CrudeInputChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            avatar={true}
          />
          <CrudeInputChip
            label={"Hovered"}
            state={"hovered"}
            containerStyle={{ margin: 4 }}
            avatar={true}
          />
          <CrudeInputChip
            label={"Focused"}
            state={"focused"}
            containerStyle={{ margin: 4 }}
            avatar={true}
          />
        </View>
        <View style={childStyle}>
          <CrudeInputChip
            label={"Dragged"}
            state={"dragged"}
            containerStyle={{ margin: 4 }}
            avatar={true}
          />
        </View>
        <Text style={textStyle}>Input selected chips with avaar</Text>
        <View style={childStyle}>
          <CrudeInputChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            selected={true}
            avatar={true}
          />
          <CrudeInputChip
            label={"Hovered"}
            state={"hovered"}
            containerStyle={{ margin: 4 }}
            selected={true}
            avatar={true}
          />
          <CrudeInputChip
            label={"Focused"}
            state={"focused"}
            containerStyle={{ margin: 4 }}
            selected={true}
            avatar={true}
          />
        </View>
        <View style={childStyle}>
          <CrudeInputChip
            label={"Dragged"}
            state={"dragged"}
            containerStyle={{ margin: 4 }}
            selected={true}
            avatar={true}
          />
        </View>
        <Text style={textStyle}>
          Input unslected closeable chips with avatar
        </Text>
        <View style={childStyle}>
          <CrudeInputChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            avatar={true}
            closeable={true}
          />
          <CrudeInputChip
            label={"Hovered"}
            state={"hovered"}
            containerStyle={{ margin: 4 }}
            avatar={true}
            closeable={true}
          />
          <CrudeInputChip
            label={"Focused"}
            state={"focused"}
            containerStyle={{ margin: 4 }}
            avatar={true}
            closeable={true}
          />
        </View>
        <View style={childStyle}>
          <CrudeInputChip
            label={"Dragged"}
            state={"dragged"}
            containerStyle={{ margin: 4 }}
            avatar={true}
            closeable={true}
          />
        </View>
        <Text style={textStyle}>Input selected chips with avatar</Text>
        <View style={childStyle}>
          <CrudeInputChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            selected={true}
            avatar={true}
            closeable={true}
          />
          <CrudeInputChip
            label={"Hovered"}
            state={"hovered"}
            containerStyle={{ margin: 4 }}
            selected={true}
            avatar={true}
            closeable={true}
          />
          <CrudeInputChip
            label={"Focused"}
            state={"focused"}
            containerStyle={{ margin: 4 }}
            selected={true}
            avatar={true}
            closeable={true}
          />
        </View>
        <View style={childStyle}>
          <CrudeInputChip
            label={"Dragged"}
            state={"dragged"}
            containerStyle={{ margin: 4 }}
            selected={true}
            avatar={true}
            closeable={true}
          />
        </View>
        <Text style={textStyle}>Assistive chips</Text>
        <View style={childStyle}>
          <CrudeAssistiveChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
          />
          <CrudeAssistiveChip
            label={"Hovered"}
            state={"hovered"}
            containerStyle={{ margin: 4 }}
          />
          <CrudeAssistiveChip
            label={"Focused"}
            state={"focused"}
            containerStyle={{ margin: 4 }}
          />
          <CrudeAssistiveChip
            label={"Pressed"}
            state={"pressed"}
            containerStyle={{ margin: 4 }}
          />
        </View>
        <View style={childStyle}>
          <CrudeAssistiveChip
            label={"Dragged"}
            state={"dragged"}
            containerStyle={{ margin: 4 }}
          />
          <CrudeAssistiveChip
            label={"Disabled"}
            state={"disabled"}
            containerStyle={{ margin: 4 }}
          />
        </View>
        <Text style={textStyle}>Assistive elevated chips</Text>
        <View style={childStyle}>
          <CrudeAssistiveChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
          <CrudeAssistiveChip
            label={"Hovered"}
            state={"hovered"}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
          <CrudeAssistiveChip
            label={"Focused"}
            state={"focused"}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
          <CrudeAssistiveChip
            label={"Pressed"}
            state={"pressed"}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
        </View>
        <View style={childStyle}>
          <CrudeAssistiveChip
            label={"Dragged"}
            state={"dragged"}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
          <CrudeAssistiveChip
            label={"Disabled"}
            state={"disabled"}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
        </View>
        <Text style={textStyle}>Assistive chips with icons</Text>
        <View style={childStyle}>
          <CrudeAssistiveChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            icon={"car"}
          />
          <CrudeAssistiveChip
            label={"Hovered"}
            state={"hovered"}
            containerStyle={{ margin: 4 }}
            icon={"car"}
          />
          <CrudeAssistiveChip
            label={"Focused"}
            state={"focused"}
            containerStyle={{ margin: 4 }}
            icon={"car"}
          />
        </View>
        <View style={childStyle}>
          <CrudeAssistiveChip
            label={"Pressed"}
            state={"pressed"}
            containerStyle={{ margin: 4 }}
            icon={"car"}
          />
          <CrudeAssistiveChip
            label={"Dragged"}
            state={"dragged"}
            containerStyle={{ margin: 4 }}
            icon={"car"}
          />
          <CrudeAssistiveChip
            label={"Disabled"}
            state={"disabled"}
            containerStyle={{ margin: 4 }}
            icon={"car"}
          />
        </View>
        <Text style={textStyle}>Assistive elevated chips with icons</Text>
        <View style={childStyle}>
          <CrudeAssistiveChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            icon={"car"}
          />
          <CrudeAssistiveChip
            label={"Hovered"}
            state={"hovered"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            icon={"car"}
          />
          <CrudeAssistiveChip
            label={"Focused"}
            state={"focused"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            icon={"car"}
          />
        </View>
        <View style={childStyle}>
          <CrudeAssistiveChip
            label={"Pressed"}
            state={"pressed"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            icon={"car"}
          />
          <CrudeAssistiveChip
            label={"Dragged"}
            state={"dragged"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            icon={"car"}
          />
          <CrudeAssistiveChip
            label={"Disabled"}
            state={"disabled"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            icon={"car"}
          />
        </View>
        <Text style={textStyle}>Unselected filter chips without elevation</Text>
        <View style={childStyle}>
          <CrudeFilterChip label={"Enabled"} containerStyle={{ margin: 4 }} />
          <CrudeFilterChip
            label={"Hovered"}
            state={"hovered"}
            containerStyle={{ margin: 4 }}
          />
          <CrudeFilterChip
            label={"Focused"}
            state={"focused"}
            containerStyle={{ margin: 4 }}
          />
          <CrudeFilterChip
            label={"Pressed"}
            state={"pressed"}
            containerStyle={{ margin: 4 }}
          />
        </View>
        <View style={childStyle}>
          <CrudeFilterChip
            label={"Dragged"}
            state={"dragged"}
            containerStyle={{ margin: 4 }}
          />
          <CrudeFilterChip
            label={"Disabled"}
            state={"disabled"}
            containerStyle={{ margin: 4 }}
          />
        </View>
        <Text style={textStyle}>Selected filter chips without elevation</Text>
        <View style={childStyle}>
          <CrudeFilterChip
            label={"Enabled"}
            selected={true}
            containerStyle={{ margin: 4 }}
          />
          <CrudeFilterChip
            label={"Hovered"}
            state={"hovered"}
            selected={true}
            containerStyle={{ margin: 4 }}
          />
          <CrudeFilterChip
            label={"Focused"}
            state={"focused"}
            selected={true}
            containerStyle={{ margin: 4 }}
          />
        </View>
        <View style={childStyle}>
          <CrudeFilterChip
            label={"Pressed"}
            state={"pressed"}
            selected={true}
            containerStyle={{ margin: 4 }}
          />
          <CrudeFilterChip
            label={"Dragged"}
            state={"dragged"}
            selected={true}
            containerStyle={{ margin: 4 }}
          />
          <CrudeFilterChip
            label={"Disabled"}
            state={"disabled"}
            selected={true}
            containerStyle={{ margin: 4 }}
          />
        </View>
        <Text style={textStyle}>Unselected elevated filter chips</Text>
        <View style={childStyle}>
          <CrudeFilterChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
          <CrudeFilterChip
            label={"Hovered"}
            state={"hovered"}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
          <CrudeFilterChip
            label={"Focused"}
            state={"focused"}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
          <CrudeFilterChip
            label={"Pressed"}
            state={"pressed"}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
        </View>
        <View style={childStyle}>
          <CrudeFilterChip
            label={"Dragged"}
            state={"dragged"}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
          <CrudeFilterChip
            label={"Disabled"}
            state={"disabled"}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
        </View>
        <Text style={textStyle}>Selected elevated filter chips</Text>
        <View style={childStyle}>
          <CrudeFilterChip
            label={"Enabled"}
            selected={true}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
          <CrudeFilterChip
            label={"Hovered"}
            state={"hovered"}
            selected={true}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
          <CrudeFilterChip
            label={"Focused"}
            state={"focused"}
            selected={true}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
        </View>
        <View style={childStyle}>
          <CrudeFilterChip
            label={"Pressed"}
            state={"pressed"}
            selected={true}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
          <CrudeFilterChip
            label={"Dragged"}
            state={"dragged"}
            selected={true}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
          <CrudeFilterChip
            label={"Disabled"}
            state={"disabled"}
            selected={true}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
        </View>
        <Text style={textStyle}>
          Unselected dropdown filter chips without elevation
        </Text>
        <View style={childStyle}>
          <CrudeFilterChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            dropdown={true}
          />
          <CrudeFilterChip
            label={"Hovered"}
            state={"hovered"}
            containerStyle={{ margin: 4 }}
            dropdown={true}
          />
          <CrudeFilterChip
            label={"Focused"}
            state={"focused"}
            containerStyle={{ margin: 4 }}
            dropdown={true}
          />
        </View>
        <View style={childStyle}>
          <CrudeFilterChip
            label={"Pressed"}
            state={"pressed"}
            containerStyle={{ margin: 4 }}
            dropdown={true}
          />
          <CrudeFilterChip
            label={"Dragged"}
            state={"dragged"}
            containerStyle={{ margin: 4 }}
            dropdown={true}
          />
          <CrudeFilterChip
            label={"Disabled"}
            state={"disabled"}
            containerStyle={{ margin: 4 }}
            dropdown={true}
          />
        </View>
        <Text style={textStyle}>
          Selected dropdown filter chips without elevation
        </Text>
        <View style={childStyle}>
          <CrudeFilterChip
            label={"Enabled"}
            selected={true}
            containerStyle={{ margin: 4 }}
            dropdown={true}
          />
          <CrudeFilterChip
            label={"Hovered"}
            state={"hovered"}
            selected={true}
            containerStyle={{ margin: 4 }}
            dropdown={true}
          />
        </View>
        <View style={childStyle}>
          <CrudeFilterChip
            label={"Focused"}
            state={"focused"}
            selected={true}
            containerStyle={{ margin: 4 }}
            dropdown={true}
          />
          <CrudeFilterChip
            label={"Pressed"}
            state={"pressed"}
            selected={true}
            containerStyle={{ margin: 4 }}
            dropdown={true}
          />
        </View>
        <View style={childStyle}>
          <CrudeFilterChip
            label={"Dragged"}
            state={"dragged"}
            selected={true}
            containerStyle={{ margin: 4 }}
            dropdown={true}
          />
          <CrudeFilterChip
            label={"Disabled"}
            state={"disabled"}
            selected={true}
            containerStyle={{ margin: 4 }}
            dropdown={true}
          />
        </View>
        <Text style={textStyle}>Unselected dropdown elevated filter chips</Text>
        <View style={childStyle}>
          <CrudeFilterChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            dropdown={true}
          />
          <CrudeFilterChip
            label={"Hovered"}
            state={"hovered"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            dropdown={true}
          />
          <CrudeFilterChip
            label={"Focused"}
            state={"focused"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            dropdown={true}
          />
        </View>
        <View style={childStyle}>
          <CrudeFilterChip
            label={"Pressed"}
            state={"pressed"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            dropdown={true}
          />
          <CrudeFilterChip
            label={"Dragged"}
            state={"dragged"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            dropdown={true}
          />
          <CrudeFilterChip
            label={"Disabled"}
            state={"disabled"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            dropdown={true}
          />
        </View>
        <Text style={textStyle}>Selected dropdown elevated filter chips</Text>
        <View style={childStyle}>
          <CrudeFilterChip
            label={"Enabled"}
            selected={true}
            containerStyle={{ margin: 4 }}
            elevated={true}
            dropdown={true}
          />
          <CrudeFilterChip
            label={"Hovered"}
            state={"hovered"}
            selected={true}
            containerStyle={{ margin: 4 }}
            elevated={true}
            dropdown={true}
          />
        </View>
        <View style={childStyle}>
          <CrudeFilterChip
            label={"Focused"}
            state={"focused"}
            selected={true}
            containerStyle={{ margin: 4 }}
            elevated={true}
            dropdown={true}
          />
          <CrudeFilterChip
            label={"Pressed"}
            state={"pressed"}
            selected={true}
            containerStyle={{ margin: 4 }}
            elevated={true}
            dropdown={true}
          />
        </View>
        <View style={childStyle}>
          <CrudeFilterChip
            label={"Dragged"}
            state={"dragged"}
            selected={true}
            containerStyle={{ margin: 4 }}
            elevated={true}
            dropdown={true}
          />
          <CrudeFilterChip
            label={"Disabled"}
            state={"disabled"}
            selected={true}
            containerStyle={{ margin: 4 }}
            elevated={true}
            dropdown={true}
          />
        </View>
        <Text style={textStyle}>Unselected unelevated suggestive chips</Text>
        <View style={childStyle}>
          <CrudeSuggestiveChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
          />
          <CrudeSuggestiveChip
            label={"Hovered"}
            containerStyle={{ margin: 4 }}
            state={"hovered"}
          />
          <CrudeSuggestiveChip
            label={"Focused"}
            containerStyle={{ margin: 4 }}
            state={"focused"}
          />
          <CrudeSuggestiveChip
            label={"Dragged"}
            containerStyle={{ margin: 4 }}
            state={"dragged"}
          />
        </View>
        <View style={childStyle}>
          <CrudeSuggestiveChip
            label={"Pressed"}
            containerStyle={{ margin: 4 }}
            state={"pressed"}
          />
          <CrudeSuggestiveChip
            label={"Disabled"}
            containerStyle={{ margin: 4 }}
            state={"disabled"}
          />
        </View>
        <Text style={textStyle}>Unselected elevated suggestive chips</Text>
        <View style={childStyle}>
          <CrudeSuggestiveChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            elevated={true}
          />
          <CrudeSuggestiveChip
            label={"Hovered"}
            containerStyle={{ margin: 4 }}
            state={"hovered"}
            elevated={true}
          />
          <CrudeSuggestiveChip
            label={"Focused"}
            containerStyle={{ margin: 4 }}
            state={"focused"}
            elevated={true}
          />
          <CrudeSuggestiveChip
            label={"Dragged"}
            containerStyle={{ margin: 4 }}
            state={"dragged"}
            elevated={true}
          />
        </View>
        <View style={childStyle}>
          <CrudeSuggestiveChip
            label={"Pressed"}
            containerStyle={{ margin: 4 }}
            state={"pressed"}
            elevated={true}
          />
          <CrudeSuggestiveChip
            label={"Disabled"}
            containerStyle={{ margin: 4 }}
            state={"disabled"}
            elevated={true}
          />
        </View>
        <Text style={textStyle}>Selected unelevated suggestive chips</Text>
        <View style={childStyle}>
          <CrudeSuggestiveChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            selected={true}
          />
          <CrudeSuggestiveChip
            label={"Hovered"}
            containerStyle={{ margin: 4 }}
            state={"hovered"}
            selected={true}
          />
          <CrudeSuggestiveChip
            label={"Focused"}
            containerStyle={{ margin: 4 }}
            state={"focused"}
            selected={true}
          />
          <CrudeSuggestiveChip
            label={"Dragged"}
            containerStyle={{ margin: 4 }}
            state={"dragged"}
            selected={true}
          />
        </View>
        <View style={childStyle}>
          <CrudeSuggestiveChip
            label={"Pressed"}
            containerStyle={{ margin: 4 }}
            state={"pressed"}
            selected={true}
          />
          <CrudeSuggestiveChip
            label={"Disabled"}
            containerStyle={{ margin: 4 }}
            state={"disabled"}
            selected={true}
          />
        </View>
        <Text style={textStyle}>Selected elevated suggestive chips</Text>
        <View style={childStyle}>
          <CrudeSuggestiveChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            selected={true}
          />
          <CrudeSuggestiveChip
            label={"Hovered"}
            containerStyle={{ margin: 4 }}
            state={"hovered"}
            elevated={true}
            selected={true}
          />
          <CrudeSuggestiveChip
            label={"Focused"}
            containerStyle={{ margin: 4 }}
            state={"focused"}
            elevated={true}
            selected={true}
          />
          <CrudeSuggestiveChip
            label={"Dragged"}
            containerStyle={{ margin: 4 }}
            state={"dragged"}
            elevated={true}
            selected={true}
          />
        </View>
        <View style={childStyle}>
          <CrudeSuggestiveChip
            label={"Pressed"}
            containerStyle={{ margin: 4 }}
            state={"pressed"}
            elevated={true}
            selected={true}
          />
          <CrudeSuggestiveChip
            label={"Disabled"}
            containerStyle={{ margin: 4 }}
            state={"disabled"}
            elevated={true}
            selected={true}
          />
        </View>
        <Text style={textStyle}>
          Unselected unelevated suggestive chips with icon
        </Text>
        <View style={childStyle}>
          <CrudeSuggestiveChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            icon={"car"}
          />
          <CrudeSuggestiveChip
            label={"Hovered"}
            containerStyle={{ margin: 4 }}
            state={"hovered"}
            icon={"car"}
          />
          <CrudeSuggestiveChip
            label={"Focused"}
            containerStyle={{ margin: 4 }}
            state={"focused"}
            icon={"car"}
          />
        </View>
        <View style={childStyle}>
          <CrudeSuggestiveChip
            label={"Dragged"}
            containerStyle={{ margin: 4 }}
            state={"dragged"}
            icon={"car"}
          />
          <CrudeSuggestiveChip
            label={"Pressed"}
            containerStyle={{ margin: 4 }}
            state={"pressed"}
            icon={"car"}
          />
          <CrudeSuggestiveChip
            label={"Disabled"}
            containerStyle={{ margin: 4 }}
            state={"disabled"}
            icon={"car"}
          />
        </View>
        <Text style={textStyle}>
          Unselected elevated suggestive chips with icons
        </Text>
        <View style={childStyle}>
          <CrudeSuggestiveChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            icon={"car"}
          />
          <CrudeSuggestiveChip
            label={"Hovered"}
            containerStyle={{ margin: 4 }}
            state={"hovered"}
            elevated={true}
            icon={"car"}
          />
          <CrudeSuggestiveChip
            label={"Focused"}
            containerStyle={{ margin: 4 }}
            state={"focused"}
            elevated={true}
            icon={"car"}
          />
        </View>
        <View style={childStyle}>
          <CrudeSuggestiveChip
            label={"Dragged"}
            containerStyle={{ margin: 4 }}
            state={"dragged"}
            elevated={true}
            icon={"car"}
          />
          <CrudeSuggestiveChip
            label={"Pressed"}
            containerStyle={{ margin: 4 }}
            state={"pressed"}
            elevated={true}
            icon={"car"}
          />
          <CrudeSuggestiveChip
            label={"Disabled"}
            containerStyle={{ margin: 4 }}
            state={"disabled"}
            elevated={true}
            icon={"car"}
          />
        </View>
        <Text style={textStyle}>
          Selected unelevated suggestive chips with icons
        </Text>
        <View style={childStyle}>
          <CrudeSuggestiveChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            selected={true}
            icon={"car"}
          />
          <CrudeSuggestiveChip
            label={"Hovered"}
            containerStyle={{ margin: 4 }}
            state={"hovered"}
            selected={true}
            icon={"car"}
          />
          <CrudeSuggestiveChip
            label={"Focused"}
            containerStyle={{ margin: 4 }}
            state={"focused"}
            selected={true}
            icon={"car"}
          />
        </View>
        <View style={childStyle}>
          <CrudeSuggestiveChip
            label={"Dragged"}
            containerStyle={{ margin: 4 }}
            state={"dragged"}
            selected={true}
            icon={"car"}
          />
          <CrudeSuggestiveChip
            label={"Pressed"}
            containerStyle={{ margin: 4 }}
            state={"pressed"}
            selected={true}
            icon={"car"}
          />
          <CrudeSuggestiveChip
            label={"Disabled"}
            containerStyle={{ margin: 4 }}
            state={"disabled"}
            selected={true}
            icon={"car"}
          />
        </View>
        <Text style={textStyle}>
          Selected elevated suggestive chips with icons
        </Text>
        <View style={childStyle}>
          <CrudeSuggestiveChip
            label={"Enabled"}
            containerStyle={{ margin: 4 }}
            elevated={true}
            selected={true}
            icon={"car"}
          />
          <CrudeSuggestiveChip
            label={"Hovered"}
            containerStyle={{ margin: 4 }}
            state={"hovered"}
            elevated={true}
            selected={true}
            icon={"car"}
          />
          <CrudeSuggestiveChip
            label={"Focused"}
            containerStyle={{ margin: 4 }}
            state={"focused"}
            elevated={true}
            selected={true}
            icon={"car"}
          />
        </View>
        <View style={childStyle}>
          <CrudeSuggestiveChip
            label={"Dragged"}
            containerStyle={{ margin: 4 }}
            state={"dragged"}
            elevated={true}
            selected={true}
            icon={"car"}
          />
          <CrudeSuggestiveChip
            label={"Pressed"}
            containerStyle={{ margin: 4 }}
            state={"pressed"}
            elevated={true}
            selected={true}
            icon={"car"}
          />
          <CrudeSuggestiveChip
            label={"Disabled"}
            containerStyle={{ margin: 4 }}
            state={"disabled"}
            elevated={true}
            selected={true}
            icon={"car"}
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
