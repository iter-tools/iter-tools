import $cycleTimes from '../$cycle-times/$cycle-times.js';

export function $cycle(source) {
  return $cycleTimes(Infinity, source);
}

export default $cycle;
