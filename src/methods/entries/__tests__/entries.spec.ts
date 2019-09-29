import assert from 'static-type-assert';
import { GeneratorIterator } from '../../../internal/iterable';
import { entries } from '../../..';

declare var Ø: never;

assert<GeneratorIterator<[string, number]>>(entries(Ø as { foo: 42 }));

assert<GeneratorIterator<[string, string | null]>>(
  entries(Ø as { foo: string, bar: null }),
);

assert<GeneratorIterator<[string, never]>>(entries(Ø as {}));
