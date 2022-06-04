import { Wrappable } from 'src/types';

declare function apply<Return, A>(fn: (...args: Array<A>) => Return, args: Wrappable<A>): Return;

declare function apply<Args extends Array<any>, Return>(
  fn: (...args: Args) => Return,
  args: Args,
): Return;

declare function apply<Return>(
  fn: (...args: Array<any>) => Return,
): (args: Wrappable<any>) => Return;

export { apply };
