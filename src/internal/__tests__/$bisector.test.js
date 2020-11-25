import { $, $isSync, $async, $await } from '../../../generate/async.macro';
import { $awaitError } from '../../../generate/test.macro';

import { $wrap, $unwrap } from '../../test/$helpers';
import { $Bisector } from '../$bisector';

$async;
function* $testStrategy(split, options, source) {
  let i = 0;
  $await;
  for (const value of source) {
    switch (++i) {
      case 1:
        yield value;
        break;
      case 2:
        yield split;
        yield value;
        return;
    }
  }
}

const $testBisector = (source) => {
  return new $Bisector(source, $testStrategy, {});
};

describe($`Bisector`, () => {
  if ($isSync) {
    it('can spread destructure two part arrays', () => {
      const [[...first], [...second]] = $testBisector($wrap([1, 2, 3]));
      expect([first, second]).toEqual([[1], [2]]);
    });
  }

  it(
    'allows the first half to be skipped',
    $async(() => {
      const [, second] = $testBisector($wrap([1, 2, 3]));
      expect($await($unwrap(second))).toEqual([2]);
    }),
  );

  it(
    'throws if only the first half is taken',
    $async(() => {
      const splits = $testBisector($wrap([1, 2, 3]));
      splits.next();
      expect(() => splits.return()).toThrowErrorMatchingSnapshot();
    }),
  );

  it(
    'throws when the second half is consumed before the first',
    $async(() => {
      const [first, second] = $testBisector($wrap([1, 2, 3]));
      expect($await($unwrap(second))).toEqual([2]);

      expect($awaitError($unwrap(first))).toMatchSnapshot();
    }),
  );
});
