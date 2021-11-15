import { Platform, ViewStyle } from "react-native";
import { SchemeAdapter } from "./SchemeAdapter";

export class Settings {
  get boxShadowElevation1() {
    return this.props.boxShadowElevation1;
  }

  get boxShadowElevation2() {
    return this.props.boxShadowElevation2;
  }

  get boxShadowElevation3() {
    return this.props.boxShadowElevation3;
  }

  get boxShadowElevation4() {
    return this.props.boxShadowElevation4;
  }

  // https://ethercreative.github.io/react-native-shadow-generator/
  static default(scheme: SchemeAdapter): Settings {
    return new Settings({
      boxShadowElevation1: {
        ...Platform.select({
          ios: {
            shadowColor: scheme.shadowHex,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1,
          },
          android: {
            elevation: 1,
            shadowColor: scheme.shadowHex,
          },
        }),
      },
      boxShadowElevation2: {
        ...Platform.select({
          ios: {
            shadowColor: scheme.shadowHex,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
          },
          android: {
            elevation: 2,
            shadowColor: scheme.shadowHex,
          },
        }),
      },
      boxShadowElevation3: {
        ...Platform.select({
          ios: {
            shadowColor: scheme.shadowHex,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
          },
          android: {
            elevation: 3,
            shadowColor: scheme.shadowHex,
          },
        }),
      },
      boxShadowElevation4: {
        ...Platform.select({
          ios: {
            shadowColor: scheme.shadowHex,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
          },
          android: {
            elevation: 4,
            shadowColor: scheme.shadowHex,
          },
        }),
      },
    });
  }

  private constructor(
    private readonly props: {
      boxShadowElevation1: ViewStyle;
      boxShadowElevation2: ViewStyle;
      boxShadowElevation3: ViewStyle;
      boxShadowElevation4: ViewStyle;
    }
  ) {}
}
