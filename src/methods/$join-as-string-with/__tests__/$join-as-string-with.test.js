import { $async, $await } from '../../../../generate/async.macro';
import { $joinAsStringWith } from '../../..';

describe($async`joinAsStringWith`, () => {
  it(
    'joins with the empty string',
    $async(() => {
      expect($await($joinAsStringWith('', [['a'], ['b'], ['c']]))).toBe('abc');
    }),
  );

  it(
    'joins with specified separator',
    $async(() => {
      expect($await($joinAsStringWith(' ', [['a'], ['b'], ['c']]))).toBe('a b c');
    }),
  );

  it(
    'joins an iterable of strings',
    $async(() => {
      expect($await($joinAsStringWith(' ', ['a', 'b', 'c']))).toBe('a b c');
    }),
  );

  it(
    'turns the empty iterable into the empty string',
    $async(() => {
      expect($await($joinAsStringWith(' ', null))).toBe('');
    }),
  );
});
