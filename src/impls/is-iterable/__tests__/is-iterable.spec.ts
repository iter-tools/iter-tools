import { isIterable } from 'iter-tools-es';

declare const value: unknown;

if (isIterable(value)) {
  value[Symbol.iterator]();
}
