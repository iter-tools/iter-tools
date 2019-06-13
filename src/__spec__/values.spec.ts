import assert from 'static-type-assert';
import { values } from '..';

declare var Ø: never;

assert<IterableIterator<number>>(values(Ø as { foo: number }));

assert<IterableIterator<string | null>>(values(Ø as { foo: string, bar: null }));

assert<IterableIterator<never>>(values(Ø as {}));
