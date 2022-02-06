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
  const providedLabel: string = label ? label : "Select...";
  const [currLabel, setCurrLabel] = useState(providedLabel);
  const [userInputEnabled, setUserInputEnabled] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [searchedChoices, setSearchedChoices] = useState(choices);
  type = !type ? "filled" : type;

  if (new Set(choices).size !== choices.length) {
    console.warn(
      "choices contain duplicate values, component will not work properly"
    );
  }

  const render = () => {
    return (
      <>
        <View style={getContainerStyles()}>
          <View style={getContentStyles()}>
            <View style={getContentLayer2Styles()}>
              {icon && (
                <Ionicons
                  name={icon}
                  size={24}
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
                  size={18}
                  color={getIconColor()}
                />
              </Pressable>
            </View>
          </View>
          {type === "filled" && <View style={getStrokeStyles()} />}
          {renderChoices()}
        </View>
      </>
    );
  };

  const getContainerStyles = () => {
    let containerStyles: ViewStyle = { ...styles.select };
    return containerStyle
      ? { ...containerStyles, ...containerStyle }
      : containerStyles;
  };

  const getContentStyles = () => {
    let contentStyles: ViewStyle = { ...styles.content };
    if (type === "outlined") {
      contentStyles = { ...contentStyles, ...styles.contentTypeOutlined };
      if (selectable) {
        contentStyles = {
          ...contentStyles,
          ...styles.contentTypeOutlinedSelectable,
        };
      }
    }
    return contentStyles;
  };

  const getContentLayer2Styles = () => {
    let layer2Styles: ViewStyle = { ...styles.contentLayer2 };
    if (icon) {
      layer2Styles = { ...layer2Styles, ...styles.contentLayer2WithIcon };
    }
    if (mandatory && somethingIsSelected() && type != "outlined") {
      layer2Styles = {
        ...layer2Styles,
        ...styles.contentLayer2WithFloatingLabel,
      };
    }
    if (type === "outlined") {
      layer2Styles = { ...layer2Styles, ...styles.contentLayer2Outlined };
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
          <View style={getFloatingLabelContainerStyles()}>
            <Text style={styles.floatingLabel}>{providedLabel}</Text>
          </View>
        )}
        <Text
          style={getLabelTextStyles()}
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

  const getFloatingLabelContainerStyles = () => {
    if (type === "outlined") {
      if (!icon) {
        return styles.floatingLabelOutlined;
      } else {
        return styles.floatingLabelOutlinedWithIcon;
      }
    }
    return {};
  };

  const getLabelTextStyles = () => {
    let textStyles = { ...styles.text };
    if (type === "outlined" && !somethingIsSelected()) {
      textStyles = {
        ...styles.text,
        ...styles.textUnselectedLabelTypeOutlined,
      };
    }
    return textStyles;
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

  const getIconColor = () => {
    if (type === "outlined" && selectable) {
      return scheme.primaryHex;
    }
    return scheme.outlineHex;
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
      <View
        style={{
          ...styles.choices,
          ...styles.boxShadowElevation2,
        }}
      >
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
    return currLabel !== providedLabel;
  };

  const renderChoice = (choice: string, index: number) => {
    return (
      <Pressable
        style={getChoiceStyles(choice)}
        onPress={() => {
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

  const getChoiceStyles = (choice: string) => {
    if (choice !== currLabel) {
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
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      width: 248,
    },
    content: {
      backgroundColor: scheme.surfaceHex,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },
    contentTypeOutlined: {
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: scheme.outlineHex,
      borderBottomRightRadius: 4,
      borderBottomLeftRadius: 4,
      backgroundColor: undefined,
    },
    contentTypeOutlinedSelectable: {
      borderWidth: 2,
      borderColor: scheme.primaryHex,
    },
    contentLayer2: {
      backgroundColor: rgbaWithOpacity(scheme.primaryRGB, 0.05),
      paddingLeft: 16,
      paddingRight: 12,
      paddingVertical: 16,
      flexDirection: "row",
      alignItems: "center",
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },
    contentLayer2WithIcon: {
      paddingLeft: 12,
    },
    contentLayer2WithFloatingLabel: {
      paddingVertical: 8,
    },
    contentLayer2Outlined: {
      borderBottomRightRadius: 4,
      borderBottomLeftRadius: 4,
      backgroundColor: undefined,
    },
    labelContainer: {
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
    floatingLabelOutlined: {
      backgroundColor: scheme.onPrimaryHex,
      // 16(padding top) + 8 (1/2 line height of floating label)
      top: -24,
      position: "absolute",
    },
    floatingLabelOutlinedWithIcon: {
      backgroundColor: scheme.onPrimaryHex,
      // 16(padding top) + 8 (1/2 line height of floating label)
      top: -24,
      // 12(padding left) + 24(icon size) + 16(icon padding right) = 52. We want to be left: 16 from the main container
      left: -36,
      position: "absolute",
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
    textUnselectedLabelTypeOutlined: {
      color: scheme.outlineHex,
    },
    dropdown: {
      marginLeft: "auto",
      flexDirection: "row",
      alignItems: "center",
      height: "100%",
    },
    icon: {
      marginRight: 16,
      textAlign: "center",
      textAlignVertical: "center",
      width: 24,
      height: 24,
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
      width: 248,
    },
    choicesLayer2: {
      backgroundColor: rgbaWithOpacity(scheme.primaryRGB, 0.08),
      maxHeight: 96,
      borderRadius: 4,
    },
    boxShadowElevation2: settings.boxShadowElevation2,
    choice: {
      minHeight: 32,
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
