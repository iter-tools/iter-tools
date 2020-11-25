import assert from 'static-type-assert';
import { ResultIterable } from '../../../types/iterable';
import { objectEntries } from '../../..';

declare const Ø: never;

assert<ResultIterable<[string, number]>>(objectEntries(Ø as { foo: 42 }));

assert<ResultIterable<[string, string | null]>>(objectEntries(Ø as { foo: string; bar: null }));

assert<ResultIterable<[string, never]>>(objectEntries(Ø as Record<string, never>));
