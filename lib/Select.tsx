import React, { FunctionComponent, useContext, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
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
}

export const Select: FunctionComponent<SelectProps> = ({
  type,
  label,
  icon,
  choices,
  searchable,
  containerStyle,
}) => {
  const { scheme, settings } = useContext(ThemeContext);
  const styles = createStyles(scheme, settings);
  const [dropdownIcon, setDropdownIcon] = useState<
    "caret-down-sharp" | "caret-up-sharp"
  >("caret-down-sharp");
  const [selectable, setSelectable] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const providedLabel: string = label ? label : "Select...";
  const [currLabel, setCurrLabel] = useState(providedLabel);

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
                onPress={() => {
                  toggleSelectable();
                }}
              />
            )}
            <Text style={styles.text}>{currLabel}</Text>
            <Ionicons
              name={dropdownIcon}
              size={14}
              color={scheme.outlineHex}
              style={styles.dropdown}
              onPress={() => {
                toggleSelectable();
              }}
            />
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
    return icon
      ? { ...styles.selectLayer2, ...styles.selectLayer2WithIcon }
      : styles.selectLayer2;
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
    return (
      <View style={{ ...styles.choices, ...styles.boxShadowElevation3 }}>
        <ScrollView style={styles.choicesLayer2}>
          {selectedItemIndex !== -1 && renderChoice(providedLabel, -1)}
          {choices.map((choice, index) => renderChoice(choice, index))}
        </ScrollView>
      </View>
    );
  };

  const renderChoice = (choice: string, index: number) => {
    return (
      <Pressable
        style={getChoiceStyles(index)}
        onPress={() => {
          setSelectedItemIndex(index);
          setCurrLabel(choice);
          toggleSelectable();
        }}
        key={index}
      >
        <Text style={styles.text}>{choice}</Text>
      </Pressable>
    );
  };

  const toggleSelectable = () => {
    if (selectable) {
      setDropdownIcon("caret-down-sharp");
      setSelectable(false);
    } else {
      setDropdownIcon("caret-up-sharp");
      setSelectable(true);
    }
  };

  const getChoiceStyles = (index: number) => {
    if (index !== selectedItemIndex) {
      return styles.choice;
    } else {
      return { ...styles.choice, ...styles.choiceSelected };
    }
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
      padding: 12,
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
