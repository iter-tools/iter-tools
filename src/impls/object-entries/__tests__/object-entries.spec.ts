import assert from 'static-type-assert';
import { IterableIterator } from '../../../types/iterable';
import { objectEntries } from 'iter-tools-es';

declare const Ø: never;

assert<IterableIterator<[string, number]>>(objectEntries(Ø as { foo: 42 }));

assert<IterableIterator<[string, string | null]>>(objectEntries(Ø as { foo: string; bar: null }));

assert<IterableIterator<[string, never]>>(objectEntries(Ø as Record<string, never>));
