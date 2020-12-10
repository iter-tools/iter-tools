import assert from 'static-type-assert';
import { IterableIterator } from '../../../types/iterable';
import { objectValues } from 'iter-tools-es';

declare const Ø: never;

assert<IterableIterator<number>>(objectValues(Ø as { foo: number }));

assert<IterableIterator<string | null>>(objectValues(Ø as { foo: string; bar: null }));

assert<IterableIterator<never>>(objectValues(Ø as Record<string, never>));
