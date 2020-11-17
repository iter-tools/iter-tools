import assert from 'static-type-assert';
import { ResultIterable } from '../../../types/iterable';
import { range } from '@iter-tools/es';

declare const Ø: never;

assert<ResultIterable<number>>(range(Ø as number));

assert<ResultIterable<number>>(range(Ø as { start: 2 }));

assert<ResultIterable<number>>(range());
