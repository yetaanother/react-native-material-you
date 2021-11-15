import { hexFromInt } from "../material-color-utilities/utils/color_utils";
import { Scheme } from "../material-color-utilities/scheme/scheme";
import { rgbArrayFromArgb } from "../utils/colorUtils";

export class SchemeAdapter {
  get primaryHex(): string {
    return this.props.primaryHex;
  }

  get primaryRGB(): number[] {
    return this.props.primaryRGB;
  }

  get primaryContainerHex(): string {
    return this.props.primaryContainerHex;
  }

  get primaryContainerRGB(): number[] {
    return this.props.primaryContainerRGB;
  }

  get onPrimaryHex(): string {
    return this.props.onPrimaryHex;
  }

  get onPrimaryRGB(): number[] {
    return this.props.onPrimaryRGB;
  }

  get onPrimaryContainerHex(): string {
    return this.props.onPrimaryContainerHex;
  }

  get onPrimaryContainerRGB(): number[] {
    return this.props.onPrimaryContainerRGB;
  }

  get secondaryHex(): string {
    return this.props.secondaryHex;
  }

  get secondaryRGB(): number[] {
    return this.props.secondaryRGB;
  }

  get secondaryContainerHex(): string {
    return this.props.secondaryContainerHex;
  }

  get secondaryContainerRGB(): number[] {
    return this.props.secondaryContainerRGB;
  }

  get onSecondaryHex(): string {
    return this.props.onSecondaryHex;
  }

  get onSecondaryRGB(): number[] {
    return this.props.onSecondaryRGB;
  }

  get onSecondaryContainerHex(): string {
    return this.props.onSecondaryContainerHex;
  }

  get onSecondaryContainerRGB(): number[] {
    return this.props.onSecondaryContainerRGB;
  }

  get tertiaryHex(): string {
    return this.props.tertiaryHex;
  }

  get tertiaryRGB(): number[] {
    return this.props.tertiaryRGB;
  }

  get onTertiaryHex(): string {
    return this.props.onTertiaryHex;
  }

  get onTertiaryRGB(): number[] {
    return this.props.onTertiaryRGB;
  }

  get tertiaryContainerHex(): string {
    return this.props.tertiaryContainerHex;
  }

  get tertiaryContainerRGB(): number[] {
    return this.props.tertiaryContainerRGB;
  }

  get onTertiaryContainerHex(): string {
    return this.props.onTertiaryContainerHex;
  }

  get onTertiaryContainerRGB(): number[] {
    return this.props.onTertiaryContainerRGB;
  }

  get errorHex(): string {
    return this.props.errorHex;
  }

  get errorRGB(): number[] {
    return this.props.errorRGB;
  }

  get onErrorHex(): string {
    return this.props.onErrorHex;
  }

  get onErrorRGB(): number[] {
    return this.props.onErrorRGB;
  }

  get errorContainerHex(): string {
    return this.props.errorContainerHex;
  }

  get errorContainerRGB(): number[] {
    return this.props.errorContainerRGB;
  }

  get onErrorContainerHex(): string {
    return this.props.onErrorContainerHex;
  }

  get onErrorContainerRGB(): number[] {
    return this.props.onErrorContainerRGB;
  }

  get outlineHex(): string {
    return this.props.outlineHex;
  }
  get outlineRGB(): number[] {
    return this.props.outlineRGB;
  }

  get backgroundHex(): string {
    return this.props.backgroundHex;
  }

  get backgroundRGB(): number[] {
    return this.props.backgroundRGB;
  }

  get onBackgroundHex(): string {
    return this.props.onBackgroundHex;
  }

  get onBackgroundRGB(): number[] {
    return this.props.onBackgroundRGB;
  }

  get surfaceHex(): string {
    return this.props.surfaceHex;
  }

  get surfaceRGB(): number[] {
    return this.props.surfaceRGB;
  }

  get onSurfaceHex(): string {
    return this.props.onSurfaceHex;
  }

  get onSurfaceRGB(): number[] {
    return this.props.onSurfaceRGB;
  }

  get surfaceVariantHex(): string {
    return this.props.surfaceVariantHex;
  }
  get surfaceVariantRGB(): number[] {
    return this.props.surfaceVariantRGB;
  }

  get onSurfaceVariantHex(): string {
    return this.props.onSurfaceVariantHex;
  }

  get onSurfaceVariantRGB(): number[] {
    return this.props.onSurfaceVariantRGB;
  }

  get inverseSurfaceHex(): string {
    return this.props.inverseSurfaceHex;
  }

  get inverseSurfaceRGB(): number[] {
    return this.props.inverseSurfaceRGB;
  }

  get inverseOnSurfaceHex(): string {
    return this.props.inverseOnSurfaceHex;
  }

  get inverseOnSurfaceRGB(): number[] {
    return this.props.inverseOnSurfaceRGB;
  }

  get shadowHex(): string {
    return this.props.shadowHex;
  }

  get shadowRGB(): number[] {
    return this.props.shadowRGB;
  }

  get inversePrimaryHex(): string {
    return this.props.inversePrimaryHex;
  }

  get inversePrimaryRGB(): number[] {
    return this.props.inversePrimaryRGB;
  }

  static from(scheme: Scheme): SchemeAdapter {
    return new SchemeAdapter({
      primaryHex: hexFromInt(scheme.primary),
      onPrimaryHex: hexFromInt(scheme.onPrimary),
      primaryContainerHex: hexFromInt(scheme.primaryContainer),
      onPrimaryContainerHex: hexFromInt(scheme.onPrimaryContainer),
      secondaryHex: hexFromInt(scheme.secondary),
      onSecondaryHex: hexFromInt(scheme.onSecondary),
      secondaryContainerHex: hexFromInt(scheme.secondaryContainer),
      onSecondaryContainerHex: hexFromInt(scheme.onSecondaryContainer),
      tertiaryHex: hexFromInt(scheme.tertiary),
      onTertiaryHex: hexFromInt(scheme.onTertiary),
      tertiaryContainerHex: hexFromInt(scheme.tertiaryContainer),
      onTertiaryContainerHex: hexFromInt(scheme.onTertiaryContainer),
      errorHex: hexFromInt(scheme.error),
      onErrorHex: hexFromInt(scheme.onError),
      errorContainerHex: hexFromInt(scheme.errorContainer),
      onErrorContainerHex: hexFromInt(scheme.onErrorContainer),
      outlineHex: hexFromInt(scheme.outline),
      backgroundHex: hexFromInt(scheme.background),
      onBackgroundHex: hexFromInt(scheme.onBackground),
      surfaceHex: hexFromInt(scheme.surface),
      onSurfaceHex: hexFromInt(scheme.onSurface),
      surfaceVariantHex: hexFromInt(scheme.surfaceVariant),
      onSurfaceVariantHex: hexFromInt(scheme.onSurfaceVariant),
      inverseSurfaceHex: hexFromInt(scheme.inverseSurface),
      inverseOnSurfaceHex: hexFromInt(scheme.inverseOnSurface),
      shadowHex: hexFromInt(scheme.shadow),
      inversePrimaryHex: hexFromInt(scheme.inversePrimary),
      primaryRGB: rgbArrayFromArgb(scheme.primary),
      onPrimaryRGB: rgbArrayFromArgb(scheme.onPrimary),
      primaryContainerRGB: rgbArrayFromArgb(scheme.primaryContainer),
      onPrimaryContainerRGB: rgbArrayFromArgb(scheme.onPrimaryContainer),
      secondaryRGB: rgbArrayFromArgb(scheme.secondary),
      onSecondaryRGB: rgbArrayFromArgb(scheme.onSecondary),
      secondaryContainerRGB: rgbArrayFromArgb(scheme.secondaryContainer),
      onSecondaryContainerRGB: rgbArrayFromArgb(scheme.onSecondaryContainer),
      tertiaryRGB: rgbArrayFromArgb(scheme.tertiary),
      onTertiaryRGB: rgbArrayFromArgb(scheme.onTertiary),
      tertiaryContainerRGB: rgbArrayFromArgb(scheme.tertiaryContainer),
      onTertiaryContainerRGB: rgbArrayFromArgb(scheme.onTertiaryContainer),
      errorRGB: rgbArrayFromArgb(scheme.error),
      onErrorRGB: rgbArrayFromArgb(scheme.onError),
      errorContainerRGB: rgbArrayFromArgb(scheme.errorContainer),
      onErrorContainerRGB: rgbArrayFromArgb(scheme.onErrorContainer),
      outlineRGB: rgbArrayFromArgb(scheme.outline),
      backgroundRGB: rgbArrayFromArgb(scheme.background),
      onBackgroundRGB: rgbArrayFromArgb(scheme.onBackground),
      surfaceRGB: rgbArrayFromArgb(scheme.surface),
      onSurfaceRGB: rgbArrayFromArgb(scheme.onSurface),
      surfaceVariantRGB: rgbArrayFromArgb(scheme.surfaceVariant),
      onSurfaceVariantRGB: rgbArrayFromArgb(scheme.onSurfaceVariant),
      inverseSurfaceRGB: rgbArrayFromArgb(scheme.inverseSurface),
      inverseOnSurfaceRGB: rgbArrayFromArgb(scheme.inverseOnSurface),
      shadowRGB: rgbArrayFromArgb(scheme.shadow),
      inversePrimaryRGB: rgbArrayFromArgb(scheme.inversePrimary),
    });
  }

  private constructor(
    private readonly props: {
      primaryHex: string;
      primaryContainerHex: string;
      onPrimaryHex: string;
      onPrimaryContainerHex: string;
      secondaryHex: string;
      secondaryContainerHex: string;
      onSecondaryHex: string;
      onSecondaryContainerHex: string;
      tertiaryHex: string;
      tertiaryContainerHex: string;
      onTertiaryHex: string;
      onTertiaryContainerHex: string;
      errorHex: string;
      errorContainerHex: string;
      onErrorHex: string;
      onErrorContainerHex: string;
      outlineHex: string;
      backgroundHex: string;
      onBackgroundHex: string;
      surfaceHex: string;
      onSurfaceHex: string;
      surfaceVariantHex: string;
      onSurfaceVariantHex: string;
      inverseSurfaceHex: string;
      inverseOnSurfaceHex: string;
      shadowHex: string;
      inversePrimaryHex: string;
      primaryRGB: number[];
      primaryContainerRGB: number[];
      onPrimaryRGB: number[];
      onPrimaryContainerRGB: number[];
      secondaryRGB: number[];
      secondaryContainerRGB: number[];
      onSecondaryRGB: number[];
      onSecondaryContainerRGB: number[];
      tertiaryRGB: number[];
      tertiaryContainerRGB: number[];
      onTertiaryRGB: number[];
      onTertiaryContainerRGB: number[];
      errorRGB: number[];
      errorContainerRGB: number[];
      onErrorRGB: number[];
      onErrorContainerRGB: number[];
      outlineRGB: number[];
      backgroundRGB: number[];
      onBackgroundRGB: number[];
      surfaceRGB: number[];
      onSurfaceRGB: number[];
      surfaceVariantRGB: number[];
      onSurfaceVariantRGB: number[];
      inverseSurfaceRGB: number[];
      inverseOnSurfaceRGB: number[];
      shadowRGB: number[];
      inversePrimaryRGB: number[];
    }
  ) {}
}
