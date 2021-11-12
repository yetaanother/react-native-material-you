import { Scheme } from "./material-color-utilities/scheme/scheme";
import {
  blueFromInt,
  greenFromInt,
  hexFromInt,
  intFromHex,
  redFromInt,
} from "./material-color-utilities/utils/color_utils";

// RUN USING `npx ts-node themePrinterUtil.ts`

const getDescription = (argbValue: number) => {
  return (
    hexFromInt(argbValue) +
    " [" +
    redFromInt(argbValue) +
    " ," +
    greenFromInt(argbValue) +
    " ," +
    blueFromInt(argbValue) +
    "]"
  );
};

export const scheme = Scheme.dark(intFromHex("#6750a4"));

console.log("Primary:", getDescription(scheme.primary));
console.log("On primary:", getDescription(scheme.onPrimary));
console.log("Primary container:", getDescription(scheme.primaryContainer));
console.log("On primary container:", getDescription(scheme.onPrimaryContainer));
console.log("Secondary", getDescription(scheme.secondary));
console.log("On secondary:", getDescription(scheme.onSecondary));
console.log("Secondary container:", getDescription(scheme.secondaryContainer));
console.log(
  "On secondary container:",
  getDescription(scheme.onSecondaryContainer)
);
console.log("Tertiary:", getDescription(scheme.tertiary));
console.log("On tertiary:", getDescription(scheme.onTertiary));
console.log("Tertiary container:", getDescription(scheme.tertiaryContainer));
console.log(
  "On tertiary container:",
  getDescription(scheme.onTertiaryContainer)
);
console.log("Error:", getDescription(scheme.error));
console.log("On error:", getDescription(scheme.onError));
console.log("Error container:", getDescription(scheme.errorContainer));
console.log("On error container:", getDescription(scheme.onErrorContainer));
console.log("Outline:", getDescription(scheme.outline));
console.log("Background:", getDescription(scheme.background));
console.log("On background:", getDescription(scheme.onBackground));
console.log("Surface:", getDescription(scheme.surface));
console.log("On surface:", getDescription(scheme.onSurface));
console.log("Surface variant:", getDescription(scheme.surfaceVariant));
console.log("On surface variant:", getDescription(scheme.onSurfaceVariant));
console.log("Inverse surface:", getDescription(scheme.inverseSurface));
console.log("Inverse on surface:", getDescription(scheme.inverseOnSurface));
console.log("Shadow", getDescription(scheme.shadow));
console.log("Inverse primary", getDescription(scheme.inversePrimary));

// Primary: #6750a4 [103 ,80 ,164]
// On primary: #ffffff [255 ,255 ,255]
// Primary container: #eaddff [234 ,221 ,255]
// On primary container: #22005d [34 ,0 ,93]
// Secondary #625b71 [98 ,91 ,113]
// On secondary: #ffffff [255 ,255 ,255]
// Secondary container: #e8def8 [232 ,222 ,248]
// On secondary container: #1e192b [30 ,25 ,43]
// Tertiary: #7d5260 [125 ,82 ,96]
// On tertiary: #ffffff [255 ,255 ,255]
// Tertiary container: #ffd8e4 [255 ,216 ,228]
// On tertiary container: #31101d [49 ,16 ,29]
// Error: #ba1b1b [186 ,27 ,27]
// On error: #ffffff [255 ,255 ,255]
// Error container: #ffdad4 [255 ,218 ,212]
// On error container: #410001 [65 ,0 ,1]
// Outline: #79757f [121 ,117 ,127]
// Background: #e6e1e5 [230 ,225 ,229]
// On background: #1c1b1e [28 ,27 ,30]
// Surface: #fffbfe [255 ,251 ,254]
// On surface: #1c1b1e [28 ,27 ,30]
// Surface variant: #e7e0ec [231 ,224 ,236]
// On surface variant: #49454f [73 ,69 ,79]
// Inverse surface: #313033 [49 ,48 ,51]
// Inverse on surface: #f4eff4 [244 ,239 ,244]
// Shadow #000000 [0 ,0 ,0]
// Inverse primary #d0bcff [208 ,188 ,255]

// Primary: #d0bcff [208 ,188 ,255]
// On primary: #381e73 [56 ,30 ,115]
// Primary container: #b69df8 [182 ,157 ,248]
// On primary container: #22005d [34 ,0 ,93]
// Secondary #cbc2db [203 ,194 ,219]
// On secondary: #332d41 [51 ,45 ,65]
// Secondary container: #b0a7c0 [176 ,167 ,192]
// On secondary container: #1e192b [30 ,25 ,43]
// Tertiary: #efb8c8 [239 ,184 ,200]
// On tertiary: #332d41 [51 ,45 ,65]
// Tertiary container: #d29dad [210 ,157 ,173]
// On tertiary container: #31101d [49 ,16 ,29]
// Error: #ffb4a9 [255 ,180 ,169]
// On error: #680003 [104 ,0 ,3]
// Error container: #ff897a [255 ,137 ,122]
// On error container: #410001 [65 ,0 ,1]
// Outline: #948f99 [148 ,143 ,153]
// Background: #1c1b1e [28 ,27 ,30]
// On background: #e6e1e5 [230 ,225 ,229]
// Surface: #1c1b1e [28 ,27 ,30]
// On surface: #e6e1e5 [230 ,225 ,229]
// Surface variant: #49454f [73 ,69 ,79]
// On surface variant: #cac4cf [202 ,196 ,207]
// Inverse surface: #e6e1e5 [230 ,225 ,229]
// Inverse on surface: #313033 [49 ,48 ,51]
// Shadow #000000 [0 ,0 ,0]
// Inverse primary #6750a4 [103 ,80 ,164]
