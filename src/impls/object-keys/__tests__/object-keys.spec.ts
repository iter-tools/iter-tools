import assert from 'static-type-assert';
import { IterableIterator } from '../../../types/iterable';
import { objectKeys } from 'iter-tools-es';

declare const Ø: never;

assert<IterableIterator<string>>(objectKeys(Ø as { foo: string; bar: null }));

assert<IterableIterator<string>>(objectKeys(Ø as Record<string, never>));

assert<IterableIterator<string>>(objectKeys(Ø as { 0: string; 1: null }));
