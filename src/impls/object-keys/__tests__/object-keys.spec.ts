import assert from 'static-type-assert';
import { ResultIterable } from '../../../types/iterable';
import { objectKeys } from 'iter-tools-es';

declare const Ø: never;

assert<ResultIterable<string>>(objectKeys(Ø as { foo: string; bar: null }));

assert<ResultIterable<string>>(objectKeys(Ø as Record<string, never>));

assert<ResultIterable<string>>(objectKeys(Ø as { 0: string; 1: null }));
