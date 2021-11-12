export class Settings {
  get buttonInnerPaddingHorizontal() {
    return this.props.buttonInnerPaddingHorizontal;
  }

  get buttonInnerPaddingVertical() {
    return this.props.buttonInnerPaddingVertical;
  }

  get buttonTypeTextInnerPaddingHorizontal() {
    return this.props.buttonTypeTextInnerPaddingHorizontal;
  }

  get buttonIconMarginRight() {
    return this.props.buttonIconMarginRight;
  }

  get textFontFamily() {
    return this.props.textFontFamily;
  }

  static default(): Settings {
    return new Settings({
      buttonInnerPaddingHorizontal: 24,
      buttonInnerPaddingVertical: 10,
      buttonTypeTextInnerPaddingHorizontal: 12,
      buttonIconMarginRight: 8,
      textFontFamily: "Roboto",
    });
  }

  private constructor(
    private readonly props: {
      buttonInnerPaddingVertical: number;
      buttonInnerPaddingHorizontal: number;
      buttonTypeTextInnerPaddingHorizontal: number;
      buttonIconMarginRight: number;
      textFontFamily: string;
    }
  ) {}
}
