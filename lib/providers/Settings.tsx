export class Settings {
  static default(): Settings {
    return new Settings({});
  }

  private constructor(private readonly props: {}) {}
}
