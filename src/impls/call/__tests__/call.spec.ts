import assert from 'static-type-assert';
import { call } from '@iter-tools/es';

declare const Ø: never;

declare function add(a: number, b: number): number;

assert<number>(call(add, Ø as number, Ø as number));
