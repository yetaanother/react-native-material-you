import React, { FunctionComponent, useState } from "react";
import { CrudeButton } from "./CrudeButton";
import {
  GestureResponderEvent,
  ImageStyle,
  NativeSyntheticEvent,
  TargetedEvent,
  TextStyle,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  title: string;
  type: ButtonType;
  onPress?: (event: GestureResponderEvent) => void;
  icon?: any;
  style?: ViewStyle | TextStyle | ImageStyle;
  disabled?: boolean;
  onPressIn?: (event: GestureResponderEvent) => void;
  onPressOut?: (event: GestureResponderEvent) => void;
  onFocus?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
  onBlur?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
}

export const Button: FunctionComponent<ButtonProps> = ({
  title,
  onPress,
  icon,
  style,
  type,
  disabled,
  onPressIn,
  onPressOut,
  onFocus,
  onBlur,
}) => {
  const [state, setState] = useState<ButtonState>(
    disabled ? "disabled" : "enabled"
  );
  onPress = !onPress ? () => {} : onPress;

  return (
    <CrudeButton
      title={title}
      onPress={onPress}
      icon={icon}
      style={style}
      state={state}
      type={type}
      onPressIn={(event) => {
        if (!disabled) {
          setState("pressed");
        }
        onPressIn && onPressIn(event);
      }}
      onPressOut={(event) => {
        if (!disabled) {
          setState("enabled");
        }
        onPressOut && onPressOut(event);
      }}
      onFocus={(event) => {
        if (!disabled) {
          setState("focused");
        }
        onFocus && onFocus(event);
      }}
      onBlur={(event) => {
        if (!disabled) {
          setState("enabled");
        }
        onBlur && onBlur(event);
      }}
    />
  );
};
