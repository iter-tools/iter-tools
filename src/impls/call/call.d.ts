declare function call<Args extends Array<any>, Return>(
  fn: (...args: Args) => Return,
  ...args: Args
): Return;

export default call;
