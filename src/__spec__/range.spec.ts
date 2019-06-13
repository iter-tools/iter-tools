import assert from 'static-type-assert';
import { range } from '..';

declare var Ø: never;

assert<IterableIterator<number>>(range(Ø as number));

assert<IterableIterator<number>>(range(Ø as { start: 2 }));

assert<IterableIterator<number>>(range());
