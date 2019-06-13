import assert from 'static-type-assert';
import { entries } from '..';

declare var Ø: never;

assert<IterableIterator<[string, number]>>(entries(Ø as { foo: 42 }));

assert<IterableIterator<[string, string | null]>>(
  entries(Ø as { foo: string, bar: null }),
);

assert<IterableIterator<[string, never]>>(entries(Ø as {}));
