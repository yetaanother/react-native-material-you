import React, { FunctionComponent, useContext, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import { SchemeAdapter } from "./providers/SchemeAdapter";
import { ThemeContext } from "./providers/ThemeProvider";
import { rgbaWithOpacity } from "./utils/colorUtils";
import { Ionicons } from "@expo/vector-icons";
import { Settings } from "./providers/Settings";

interface SelectProps {
  type?: SelectType;
  label?: string;
  icon?: any;
  choices: string[];
  searchable?: boolean;
  containerStyle?: ViewStyle;
  mandatory?: boolean;
  onSelect?: (choice: string, index?: number) => void;
}

export const Select: FunctionComponent<SelectProps> = ({
  type,
  label,
  icon,
  choices,
  searchable,
  containerStyle,
  mandatory,
  onSelect,
}) => {
  const { scheme, settings } = useContext(ThemeContext);
  const styles = createStyles(scheme, settings);
  const [dropdownIcon, setDropdownIcon] = useState<
    "caret-down-sharp" | "caret-up-sharp"
  >("caret-down-sharp");
  const [selectable, setSelectable] = useState(false);
  // We are using index to keep track of the curr label because choices can have duplicates
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const providedLabel: string = label ? label : "Select...";
  const [currLabel, setCurrLabel] = useState(providedLabel);
  const [userInputEnabled, setUserInputEnabled] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [searchedChoices, setSearchedChoices] = useState(choices);

  const render = () => {
    return (
      <>
        <View style={getContainerStyles()}>
          <View style={getLayer2Styles()}>
            {icon && (
              <Ionicons
                name={icon}
                size={18}
                color={scheme.outlineHex}
                style={styles.icon}
              />
            )}
            {renderLabel()}
            {/*  Wrapping inside a pressable to give bigger surface for touch to work*/}
            <Pressable
              style={{
                ...styles.dropdown,
              }}
              onPress={() => toggleSelectable()}
            >
              <Ionicons
                name={dropdownIcon}
                size={14}
                color={scheme.outlineHex}
              />
            </Pressable>
          </View>
          <View style={getStrokeStyles()} />
          {renderChoices()}
        </View>
      </>
    );
  };

  const getContainerStyles = () => {
    return containerStyle
      ? { ...styles.select, ...containerStyle }
      : styles.select;
  };

  const getLayer2Styles = () => {
    let layer2Styles = { ...styles.selectLayer2 };
    if (icon) {
      layer2Styles = { ...layer2Styles, ...styles.selectLayer2WithIcon };
    }
    if (mandatory && somethingIsSelected()) {
      layer2Styles = {
        ...layer2Styles,
        ...styles.selectLayer2WithFloatingLabel,
      };
    }
    return layer2Styles;
  };

  const renderLabel = () => {
    if (userInputEnabled) {
      return (
        <TextInput
          selectionColor={scheme.primaryHex}
          value={userInput}
          onChangeText={(text) => {
            setUserInput(text);
            search(text);
          }}
          style={styles.text}
          autoFocus={true}
        />
      );
    }
    return (
      <View style={styles.labelContainer}>
        {mandatory && somethingIsSelected() && (
          <Text style={styles.floatingLabel}>{providedLabel}</Text>
        )}
        <Text
          style={styles.text}
          onPress={() => {
            if (searchable) {
              enableUserInput();
              turnSelectableOn();
            }
          }}
        >
          {currLabel}
        </Text>
      </View>
    );
  };

  const toggleSelectable = () => {
    if (selectable) {
      turnSelectableOff();
    } else {
      turnSelectableOn();
    }
  };

  const turnSelectableOn = () => {
    if (selectable) {
      return;
    }
    setDropdownIcon("caret-up-sharp");
    setSelectable(true);
  };

  const search = (text: string) => {
    setSearchedChoices(
      choices.filter((choice) =>
        choice.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const enableUserInput = () => {
    setUserInputEnabled(true);
  };

  const getStrokeStyles = () => {
    let strokeStyles = { ...styles.stroke };
    if (selectable) {
      strokeStyles = { ...strokeStyles, ...styles.strokeSelected };
    }
    return strokeStyles;
  };

  const renderChoices = () => {
    if (!selectable) {
      return <></>;
    }
    let currChoices = searchable ? searchedChoices : choices;
    return (
      <View style={{ ...styles.choices, ...styles.boxShadowElevation3 }}>
        <ScrollView nestedScrollEnabled={true} style={styles.choicesLayer2}>
          {!mandatory &&
            currChoices.length != 0 &&
            somethingIsSelected() &&
            renderChoice(providedLabel, -1)}
          {currChoices.map((choice, index) => renderChoice(choice, index))}
          {currChoices.length == 0 && searchable && (
            <View style={styles.choice}>
              <Text style={styles.text}>No results</Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  };

  const somethingIsSelected = () => {
    return selectedItemIndex != -1;
  };

  const renderChoice = (choice: string, index: number) => {
    return (
      <Pressable
        style={getChoiceStyles(index)}
        onPress={() => {
          setSelectedItemIndex(index);
          setCurrLabel(choice);
          turnSelectableOff();
          onSelect && onSelect(choice, index);
        }}
        key={index}
      >
        <Text style={styles.text}>{choice}</Text>
      </Pressable>
    );
  };

  const getChoiceStyles = (index: number) => {
    if (index !== selectedItemIndex) {
      return styles.choice;
    } else {
      return { ...styles.choice, ...styles.choiceSelected };
    }
  };

  const turnSelectableOff = () => {
    if (!selectable) {
      return;
    }
    setDropdownIcon("caret-down-sharp");
    setSelectable(false);
    if (searchable && userInputEnabled) {
      disableUserInput();
    }
  };

  const disableUserInput = () => {
    setUserInputEnabled(false);
    setUserInput("");
    setSearchedChoices(choices);
  };

  return render();
};

const createStyles = (scheme: SchemeAdapter, settings: Settings) =>
  StyleSheet.create({
    select: {
      backgroundColor: scheme.surfaceHex,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      width: 245,
    },
    selectLayer2: {
      backgroundColor: rgbaWithOpacity(scheme.primaryRGB, 0.05),
      paddingLeft: 16,
      paddingRight: 12,
      paddingVertical: 16,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    selectLayer2WithIcon: {
      paddingLeft: 12,
    },
    selectLayer2WithFloatingLabel: {
      paddingVertical: 12,
    },
    labelContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
    },
    floatingLabel: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: 12,
      lineHeight: 16,
      fontWeight: "500",
      letterSpacing: 0.5,
      color: scheme.primaryHex,
    },
    text: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "normal",
      letterSpacing: 0.5,
      color: scheme.onSurfaceHex,
    },
    dropdown: {
      marginLeft: "auto",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      height: "100%",
    },
    icon: {
      marginRight: 16,
    },
    stroke: {
      borderBottomWidth: 1,
      borderStyle: "solid",
      borderColor: scheme.outlineHex,
    },
    strokeSelected: {
      borderBottomWidth: 2,
      borderColor: scheme.primaryHex,
    },
    choices: {
      borderRadius: 4,
      backgroundColor: scheme.surfaceHex,
    },
    choicesLayer2: {
      backgroundColor: rgbaWithOpacity(scheme.primaryRGB, 0.08),
      maxHeight: 96,
    },
    boxShadowElevation3: settings.boxShadowElevation3,
    choice: {
      minHeight: 32,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
    },
    choiceSelected: {
      backgroundColor: rgbaWithOpacity(scheme.primaryRGB, 0.12),
    },
    choiceText: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "normal",
      letterSpacing: 0.25,
      color: scheme.onSurfaceHex,
    },
  });
