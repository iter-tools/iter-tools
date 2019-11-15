import { $, $isAsync, $async, $await } from '../../../../generate/async.macro';

import { $groupBy } from '../../..';
import { $unwrapDeep as $uw } from '../../../__tests__/$helpers';

describe($`groupBy`, () => {
  it(
    'returns source values grouped by key function',
    $async(() => {
      const iter = $groupBy(item => item.toLowerCase(), 'AaaBbaACccCD');
      expect($await($uw(iter))).toEqual([
        ['a', ['A', 'a', 'a']],
        ['b', ['B', 'b']],
        ['a', ['a', 'A']],
        ['c', ['C', 'c', 'c', 'C']],
        ['d', ['D']],
      ]);
    }),
  );

  it(
    'returns source values grouped by identity',
    $async(() => {
      const iter = $groupBy(_ => _)('AAABBAACCCCD');
      expect($await($uw(iter))).toEqual([
        ['A', ['A', 'A', 'A']],
        ['B', ['B', 'B']],
        ['A', ['A', 'A']],
        ['C', ['C', 'C', 'C', 'C']],
        ['D', ['D']],
      ]);
    }),
  );

  it(
    'returns grouped keys',
    $async(() => {
      const iter = $groupBy(_ => _, 'AAABBAACCCCD').keys();
      expect($await($uw(iter))).toEqual(['A', 'B', 'A', 'C', 'D']);
    }),
  );

  it(
    'returns grouped values',
    $async(() => {
      const iter = $groupBy(_ => _, 'AAABBAACCCCD').values();
      expect($await($uw(iter))).toEqual([
        ['A', 'A', 'A'],
        ['B', 'B'],
        ['A', 'A'],
        ['C', 'C', 'C', 'C'],
        ['D'],
      ]);
    }),
  );

  it(
    'returns grouped entries',
    $async(() => {
      const iter = $groupBy(item => item.toLowerCase(), 'AaaBbaACccCD').entries();
      expect($await($uw(iter))).toEqual([
        ['a', ['A', 'a', 'a']],
        ['b', ['B', 'b']],
        ['a', ['a', 'A']],
        ['c', ['C', 'c', 'c', 'C']],
        ['d', ['D']],
      ]);
    }),
  );

  it(
    'empty source returns empty iterable',
    $async(() => {
      expect($await($uw($groupBy(_ => _, null)))).toEqual([]);
      expect($await($uw($groupBy(_ => _)(null)))).toEqual([]);
      expect($await($uw($groupBy(_ => _, undefined)))).toEqual([]);
      expect($await($uw($groupBy(_ => _)(undefined)))).toEqual([]);
    }),
  );

  if ($isAsync) {
    it(
      'with key function',
      $async(() => {
        const iter = $groupBy(async item => item.toLowerCase(), 'AaaBbaACccCD');
        expect($await($uw(iter))).toEqual([
          ['a', ['A', 'a', 'a']],
          ['b', ['B', 'b']],
          ['a', ['a', 'A']],
          ['c', ['C', 'c', 'c', 'C']],
          ['d', ['D']],
        ]);
      }),
    );
  }
});
