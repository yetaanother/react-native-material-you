import {blueFromArgb, greenFromArgb, redFromArgb} from "@material/material-color-utilities/dist";

export const rgbArrayFromArgb = (argb: number): number[] => {
    return [redFromArgb(argb), greenFromArgb(argb), blueFromArgb(argb)];
};

export const rgbaWithOpacity = (rgb: number[], opacity: number): string => {
    return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${opacity})`;
};
