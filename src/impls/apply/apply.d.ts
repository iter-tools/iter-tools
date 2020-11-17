declare function apply<Return, A>(
  fn: (...args: Array<A>) => Return,
  args: Iterable<A> | null | undefined,
): Return;

declare function apply<Args extends Array<any>, Return>(
  fn: (...args: Args) => Return,
  args: Args,
): Return;

declare function apply<Return>(
  fn: (...args: Array<any>) => Return,
): (args: Array<any> | null | undefined) => Return;

export default apply;
