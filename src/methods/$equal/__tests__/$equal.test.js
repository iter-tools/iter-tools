import { $async, $await } from '../../../../generate/async.macro';
import { $equal, $wrap } from '../../..';

describe($async`equal`, () => {
  it(
    'returns true if there is only one iterable',
    $async(() => {
      expect($await($equal($wrap([1, 2, 3])))).toEqual(true);
    }),
  );

  it(
    'returns true if all contents are equal',
    $async(() => {
      expect($await($equal($wrap([1, 2, 3]), $wrap([1, 2, 3]), $wrap([1, 2, 3])))).toEqual(true);
    }),
  );

  it(
    'returns false if any contents are not equal',
    $async(() => {
      expect($await($equal($wrap([1, 2, 3]), $wrap([1, 2, 3]), $wrap([1, 2, 4])))).toEqual(false);
    }),
  );

  it(
    'returns false if any arrays are not the same length',
    $async(() => {
      expect($await($equal($wrap([1, 2, 3]), $wrap([1, 2, 3]), $wrap([1, 2, 3, 4])))).toEqual(
        false,
      );
    }),
  );
});
