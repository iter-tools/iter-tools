declare function apply<Args extends Array<any>, Return>(
  fn: (...args: Args) => Return,
  args: Args,
): Return;

declare function apply<A, Return>(fn: (...args: Array<A>) => Return, args: Iterable<A>): Return;

declare function apply<Return>(
  fn: (...args: Array<any>) => Return,
): (...args: Array<any>) => Return;

export default apply;
