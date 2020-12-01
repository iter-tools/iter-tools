import { isAsyncIterable } from '@iter-tools/es';

declare const value: unknown;

if (isAsyncIterable(value)) {
  value[Symbol.asyncIterator]();
}
