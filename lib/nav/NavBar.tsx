import React, {
  FunctionComponent,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { ColorScheme } from "../providers/ColorScheme";
import { ThemeContext } from "../providers/ThemeProvider";
import { rgbaWithOpacity } from "../utils/colorUtils";
import { NavBarItemProps } from "./NavBarItem";
import { Shadows } from "../providers/Shadows";
import { M3Constants } from "../utils/M3Constants";

interface NavBarItemComp extends ReactElement<NavBarItemProps, any> {}

interface NavBarProps {
  children: NavBarItemComp | NavBarItemComp[];
}

// M3 docs: https://m3.material.io/components/navigation-bar/specs
export const NavBar: FunctionComponent<NavBarProps> = ({ children }) => {
  const { scheme, shadows } = useContext(ThemeContext);
  const styles = createStyles(scheme, shadows);
  const [itemsMap, setItemsMap] = useState(new Map<number, NavBarItemComp>());

  useEffect(() => {
    buildChildrenMap();
  }, []);

  const buildChildrenMap = () => {
    let childrenMap = new Map<number, NavBarItemComp>();
    React.Children.forEach(children, (child: NavBarItemComp, index) => {
      if (child.type.name !== "NavBarItem") {
        console.warn(
          `Only NavBarItem components should be used as children of this component! Found ${child.type.name}`
        );
        return;
      }
      childrenMap.set(index, child);
    });
    setItemsMap(childrenMap);
  };

  const render = () => {
    if (itemsMap.size === 0) {
      return <></>;
    }
    return (
      <View style={{ ...styles.container, ...styles.boxShadowElevation2 }}>
        <View style={styles.surfaceOverlay}>{getPressables()}</View>
      </View>
    );
  };

  const getPressables = () => {
    let pressableChildren: ReactElement[] = [];
    itemsMap.forEach((child, index) => {
      pressableChildren.push(
        <Pressable
          style={{ flex: 1 }}
          key={index}
          onPress={() => onChildPress(index)}
        >
          {child}
        </Pressable>
      );
    });
    return pressableChildren;
  };

  const onChildPress = (pressedIndex: number) => {
    let pressedItem = itemsMap.get(pressedIndex);
    if (!pressedItem) {
      // Should never happen
      return;
    }
    if (pressedItem.props.active) {
      return;
    }
    let updatedItemMap = new Map();
    itemsMap.forEach((item, index) => {
      if (index === pressedIndex) {
        let onPress = item.props.onPress;
        onPress && onPress();
        let onSuccessClearBadge = item.props.onSuccessClearBadge;
        if (onSuccessClearBadge && item.props.badge && onSuccessClearBadge()) {
          updatedItemMap.set(
            index,
            React.cloneElement(item, { active: true, badge: false })
          );
        } else {
          updatedItemMap.set(index, React.cloneElement(item, { active: true }));
        }
      } else if (item.props.active) {
        updatedItemMap.set(index, React.cloneElement(item, { active: false }));
      } else {
        updatedItemMap.set(index, item);
      }
    });
    setItemsMap(updatedItemMap);
  };

  return render();
};

const deviceWidth = Dimensions.get("window").width;
const createStyles = (scheme: ColorScheme, shadows: Shadows) =>
  StyleSheet.create({
    container: {
      backgroundColor: scheme.surfaceHex,
      width: deviceWidth,
    },
    boxShadowElevation2: shadows.boxShadowElevation2,
    surfaceOverlay: {
      backgroundColor: rgbaWithOpacity(
        scheme.primaryRGB,
        M3Constants.surface2ContainerOpacity
      ),
      flexDirection: "row",
    },
  });
