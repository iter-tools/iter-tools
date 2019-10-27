import { getPropertyDescriptor } from '../../../internal/object';

const { getPrototypeOf } = Object;

export function getStaticSize(iterable) {
  if (iterable == null) {
    return 0;
  }

  if (Array.isArray(iterable)) return iterable.length;

  if ('size' in iterable) {
    const sizeDescriptor = getPropertyDescriptor(getPrototypeOf(iterable), 'size');
    if (sizeDescriptor && typeof sizeDescriptor.get === 'function') {
      const { size } = iterable;
      if (typeof size === 'number' && size > 0) {
        // Note: size may be Infinity. These are iterables!
        return size;
      }
    }
  }

  return null;
}
