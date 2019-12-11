import { ResultIterable } from '../../types/iterable';
import { AsyncResultIterable } from '../../types/async-iterable';

export declare class OneTwoThreeIterable {
  next(): IteratorResult<number>;
  return(): IteratorResult<void>;

  [Symbol.iterator](): ResultIterable<number>;
}

export declare class AsyncOneTwoThreeIterable {
  next(): Promise<IteratorResult<number>>;
  return<R = void>(value?: R): Promise<IteratorResult<R>>;

  [Symbol.asyncIterator](): AsyncResultIterable<number>;
}
