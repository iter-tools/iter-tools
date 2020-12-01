import { isWrappable, wrap } from '@iter-tools/es';

declare const value: unknown;

if (isWrappable(value)) {
  wrap(value);
}
