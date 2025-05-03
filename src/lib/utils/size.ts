export const SIZES = {
  xs: [
    [13, 18],
    [10, 15],
  ],
  s: [
    [18, 24],
    [13, 18],
  ],
  "m-square": [
    [23, 23],
    [13, 13],
  ],
  m: [
    [21, 30],
    [13, 18],
  ],
  l: [
    [30, 40],
    [21, 30],
  ],
  xl: [
    [40, 50],
    [30, 40],
  ],
};

export type SizeKeys = keyof typeof SIZES;
