/**
 * @generated-from ./$split-at.spec.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import assert from 'static-type-assert';

import { IterableIterator as SyncIterableIterator } from '../../../types/iterable';
import { AsyncIterable, AsyncIterableIterator } from '../../../types/async-iterable';
import { asyncSplitAt } from 'iter-tools-es';

declare const Ø: never;

assert<SyncIterableIterator<AsyncIterableIterator<number>>>(
  asyncSplitAt(3, Ø as AsyncIterable<number>),
);

assert<SyncIterableIterator<AsyncIterableIterator<number>>>(
  asyncSplitAt(3)(Ø as AsyncIterable<number>),
);
