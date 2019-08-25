declare function compose<A>(): (x: A) => A;
// prettier-ignore
declare function compose<A, R> (
  fn: (x: A) => R,
): (x: A) => R;
// prettier-ignore
declare function compose<A, R1, R2> (
  fn1: (x: A) => R1,
  fn2: (x: R1) => R2,
): (x: A) => R2;
// prettier-ignore
declare function compose<A, R1, R2, R3> (
  fn1: (x: A) => R1,
  fn2: (x: R1) => R2,
  fn3: (x: R2) => R3,
): (x: A) => R3;
// prettier-ignore
declare function compose<A, R1, R2, R3, R4> (
  fn1: (x: A) => R1,
  fn2: (x: R1) => R2,
  fn3: (x: R2) => R3,
  fn4: (x: R3) => R4,
): (x: A) => R4;
// prettier-ignore
declare function compose<A, R1, R2, R3, R4, R5> (
  fn1: (x: A) => R1,
  fn2: (x: R1) => R2,
  fn3: (x: R2) => R3,
  fn4: (x: R3) => R4,
  fn5: (x: R4) => R5,
): (x: A) => R5;
// prettier-ignore
declare function compose<A, R1, R2, R3, R4, R5, R6> (
  fn1: (x: A) => R1,
  fn2: (x: R1) => R2,
  fn3: (x: R2) => R3,
  fn4: (x: R3) => R4,
  fn5: (x: R4) => R5,
  fn6: (x: R5) => R6,
): (x: A) => R6;

declare function compose<T>(...fns: Array<(x: T) => T>): (x: T) => T;

export default compose;
