import $cycleTimes from '../$cycle-times/$cycle-times';

export function $cycle(iterable) {
  return $cycleTimes(Infinity, iterable);
}

export default $cycle;
