import {
  blueFromInt,
  greenFromInt,
  redFromInt,
} from "./material-color-utilities/utils/color_utils";

export const rgbArrayFromArgb = (argb: number): number[] => {
  return [redFromInt(argb), greenFromInt(argb), blueFromInt(argb)];
};

export const rgbaWithOpacity = (rgb: number[], opacity: number): string => {
  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${opacity})`;
};
