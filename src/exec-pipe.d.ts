// prettier-ignore
declare function execPipe<A> (value: A): A
// prettier-ignore
declare function execPipe<A, R1> (
  value: A,
  fn0: (value: A) => R1,
): R1;
// prettier-ignore
declare function execPipe<A, R1, R2> (
  value: A,
  fn0: (value: A) => R1,
  fn1: (value: R1) => R2,
): R2;
// prettier-ignore
declare function execPipe<A, R1, R2, R3> (
  value: A,
  fn0: (value: A) => R1,
  fn1: (value: R1) => R2,
  fn2: (value: R2) => R3,
): R3;
// prettier-ignore
declare function execPipe<A, R1, R2, R3, R4> (
  value: A,
  fn0: (value: A) => R1,
  fn1: (value: R1) => R2,
  fn2: (value: R2) => R3,
  fn3: (value: R3) => R4,
): R4;
// prettier-ignore
declare function execPipe<A, R1, R2, R3, R4, R5> (
  value: A,
  fn0: (value: A) => R1,
  fn1: (value: R1) => R2,
  fn2: (value: R2) => R3,
  fn3: (value: R3) => R4,
  fn4: (value: R4) => R5,
): R5;
// prettier-ignore
declare function execPipe<A, R1, R2, R3, R4, R5, R6> (
  value: A,
  fn0: (value: A) => R1,
  fn1: (value: R1) => R2,
  fn2: (value: R2) => R3,
  fn3: (value: R3) => R4,
  fn4: (value: R4) => R5,
  fn5: (value: R5) => R6,
): R6;
// prettier-ignore
declare function execPipe<T> (
  value: T,
  ...fns: Array<(value: T) => T>
): T;

export default execPipe;
