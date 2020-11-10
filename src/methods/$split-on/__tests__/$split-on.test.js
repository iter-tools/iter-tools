import { $, $async, $await } from '../../../../generate/async.macro';

import { $splitOn } from '../../..';
import { $unwrapDeep as $uw } from '../../../__tests__/$helpers';
import { $wrap } from '../../../__tests__/__framework__/$wrap';

describe($`splitOn`, () => {
  it(
    'should split between every item which is equal to the on argument',
    $async(() => {
      expect($await($uw($splitOn(null, $wrap([1, null, 2, null, 3]))))).toEqual([[1], [2], [3]]);
    }),
  );

  it(
    'should throw when splits are consumed out of order',
    $async(() => {
      const parts = $splitOn(null, $wrap([1, null, 2]));
      const a = $await(parts.next()).value;
      const b = $await(parts.next()).value;
      let error;
      try {
        $await($uw([b, a]));
      } catch (e) {
        error = e;
      }
      expect(error).toMatchSnapshot();
    }),
  );

  it(
    'should yield [] between two separators',
    $async(() => {
      expect($await($uw($splitOn(null, $wrap([1, null, null, 3]))))).toEqual([[1], [], [3]]);
    }),
  );

  it(
    'should yield [], [] when only separator',
    $async(() => {
      expect($await($uw($splitOn(null, $wrap([null]))))).toEqual([[], []]);
    }),
  );

  it(
    'passes through the empty iterable',
    $async(() => {
      expect($await($uw($splitOn(0, null)))).toEqual([]);
    }),
  );
});
