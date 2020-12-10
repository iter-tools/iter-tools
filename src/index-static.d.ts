export { __deepEqual } from './impls/$deep-equal/deep-equal';
export { __asyncDeepEqual } from './impls/$deep-equal/async-deep-equal';

export type { Peekerator } from './impls/$peekerate/peekerate';
export type { AsyncPeekerator } from './impls/$peekerate/async-peekerate';

export type {
  Iterable,
  Loopable,
  Wrappable,
  IterableIterator,
  SingletonIterableIterator,
  AsyncIterable,
  AsyncLoopable,
  AsyncWrappable,
  AsyncIterableIterator,
  SingletonAsyncIterableIterator,
} from './types';
