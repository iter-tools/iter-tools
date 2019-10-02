import assert from 'static-type-assert';
import { ResultIterable } from '../../../internal/iterable';
import { values } from '../../..';

declare const Ø: never;

assert<ResultIterable<number>>(values(Ø as { foo: number }));

assert<ResultIterable<string | null>>(values(Ø as { foo: string; bar: null }));

assert<ResultIterable<never>>(values(Ø as {}));
