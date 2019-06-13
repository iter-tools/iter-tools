import { GeneratorIterator } from '../../internal/iterable';
import { AsyncGeneratorIterator } from '../../internal/async-iterable';

export declare class OneTwoThreeIterable {
  next(): IteratorResult<number>;
  return(): void;

  [Symbol.iterator](): GeneratorIterator<number>;
}

export declare class AsyncOneTwoThreeIterable {
  next(): Promise<IteratorResult<number>>;
  return(): Promise<void>;

  [Symbol.asyncIterator](): AsyncGeneratorIterator<number>;
}
