export type InRange8 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type Repeat8<T, Count> = Count extends 0
  ? []
  : Count extends 1
  ? [T]
  : Count extends 2
  ? [T, T]
  : Count extends 3
  ? [T, T, T]
  : Count extends 4
  ? [T, T, T, T]
  : Count extends 5
  ? [T, T, T, T, T]
  : Count extends 6
  ? [T, T, T, T, T, T]
  : Count extends 7
  ? [T, T, T, T, T, T, T]
  : Array<T>;
