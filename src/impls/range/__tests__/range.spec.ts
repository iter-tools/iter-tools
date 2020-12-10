import assert from 'static-type-assert';
import { IterableIterator } from '../../../types/iterable';
import { range } from 'iter-tools-es';

declare const Ø: never;

assert<IterableIterator<number>>(range(Ø as number));

assert<IterableIterator<number>>(range(Ø as { start: 2 }));

assert<IterableIterator<number>>(range());
