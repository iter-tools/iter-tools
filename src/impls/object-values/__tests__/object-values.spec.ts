import assert from 'static-type-assert';
import { ResultIterable } from '../../../types/iterable';
import { objectValues } from '@iter-tools/es';

declare const Ø: never;

assert<ResultIterable<number>>(objectValues(Ø as { foo: number }));

assert<ResultIterable<string | null>>(objectValues(Ø as { foo: string; bar: null }));

assert<ResultIterable<never>>(objectValues(Ø as Record<string, never>));
