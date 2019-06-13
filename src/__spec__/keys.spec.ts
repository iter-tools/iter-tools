import assert from 'static-type-assert';
import { keys } from '..';

declare var Ø: never;

assert<IterableIterator<string>>(keys(Ø as { foo: string, bar: null }));

assert<IterableIterator<string>>(keys(Ø as {}));

assert<IterableIterator<string>>(keys(Ø as { 0: string, 1: null }));
