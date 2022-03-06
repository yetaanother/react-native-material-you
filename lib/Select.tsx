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
import { M3Constants } from "./utils/M3Constants";

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
        <View style={getContainerStyles()}>{renderContent()}</View>
      </>
    );
  };

  const getContainerStyles = () => {
    let containerStyles: ViewStyle = { ...styles.container };
    if (containerStyle) {
      return { ...containerStyles, ...containerStyle };
    }
    return containerStyles;
  };

  const renderContent = () => {
    return (
      <>
        {renderInput()}
        {type === "filled" && <View style={getStrokeStyles()} />}
        {renderChoices()}
      </>
    );
  };

  const renderInput = () => {
    return (
      <View style={getInputStyles()}>
        <View style={getInputSurfaceOverlayStyles()}>
          {icon && (
            <Ionicons
              name={icon}
              size={iconSize}
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
              size={dropDownIconSize}
              color={getDropDownIconColor()}
            />
          </Pressable>
        </View>
      </View>
    );
  };

  const getInputStyles = () => {
    let contentStyles: ViewStyle = { ...styles.input };
    if (type === "outlined") {
      contentStyles = { ...contentStyles, ...styles.inputTypeOutlined };
      if (selectable) {
        contentStyles = {
          ...contentStyles,
          ...styles.inputTypeOutlinedSelectable,
        };
      }
    }
    return contentStyles;
  };

  const getInputSurfaceOverlayStyles = () => {
    let contentSurfaceOverlay: ViewStyle = { ...styles.inputSurfaceOverlay };
    if (icon) {
      contentSurfaceOverlay = {
        ...contentSurfaceOverlay,
        ...styles.inputSurfaceOverlayWithIcon,
      };
    }
    if (mandatory && somethingIsSelected() && type != "outlined") {
      contentSurfaceOverlay = {
        ...contentSurfaceOverlay,
        ...styles.inputSurfaceOverlayWithFloatingLabel,
      };
    }
    if (type === "outlined") {
      contentSurfaceOverlay = {
        ...contentSurfaceOverlay,
        ...styles.inputSurfaceOverlayOutlined,
      };
    }
    return contentSurfaceOverlay;
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

  const getDropDownIconColor = () => {
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
        <ScrollView
          nestedScrollEnabled={true}
          style={styles.choicesSurfaceOverlay}
        >
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

const iconSize = 24;
const dropDownIconSize = 18;

const createStyles = (scheme: SchemeAdapter, settings: Settings) =>
  StyleSheet.create({
    container: {
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      width: 248,
    },
    input: {
      backgroundColor: scheme.surfaceHex,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },
    inputTypeOutlined: {
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: scheme.outlineHex,
      borderBottomRightRadius: 4,
      borderBottomLeftRadius: 4,
      backgroundColor: undefined,
    },
    inputTypeOutlinedSelectable: {
      borderWidth: 2,
      borderColor: scheme.primaryHex,
    },
    inputSurfaceOverlay: {
      backgroundColor: rgbaWithOpacity(
        scheme.primaryRGB,
        M3Constants.surface1ContainerOpacity
      ),
      paddingLeft: 16,
      paddingRight: 12,
      paddingVertical: 16,
      flexDirection: "row",
      alignItems: "center",
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },
    inputSurfaceOverlayWithIcon: {
      paddingLeft: 12,
    },
    inputSurfaceOverlayWithFloatingLabel: {
      paddingVertical: 8,
    },
    inputSurfaceOverlayOutlined: {
      borderBottomRightRadius: 4,
      borderBottomLeftRadius: 4,
      backgroundColor: undefined,
    },
    labelContainer: {
      alignItems: "flex-start",
      justifyContent: "center",
    },
    floatingLabel: {
      ...M3Constants.labelMediumText,
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
      ...M3Constants.bodyLargeText,
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
    choicesSurfaceOverlay: {
      backgroundColor: rgbaWithOpacity(
        scheme.primaryRGB,
        M3Constants.surface2ContainerOpacity
      ),
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
      ...M3Constants.bodyMediumText,
      color: scheme.onSurfaceHex,
    },
  });
