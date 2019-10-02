import assert from 'static-type-assert';
import { ResultIterable } from '../../../types/iterable';
import { entries } from '../../..';

declare const Ø: never;

assert<ResultIterable<[string, number]>>(entries(Ø as { foo: 42 }));

assert<ResultIterable<[string, string | null]>>(entries(Ø as { foo: string; bar: null }));

assert<ResultIterable<[string, never]>>(entries(Ø as {}));
