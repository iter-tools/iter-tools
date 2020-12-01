import { isAsyncWrappable, asyncWrap } from 'iter-tools-es';

declare const value: unknown;

if (isAsyncWrappable(value)) {
  asyncWrap(value);
}
