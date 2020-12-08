import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $roundRobin } from 'iter-tools-es';
import { $wrap, $unwrap } from '../../../test/$helpers.js';

describe($`roundRobin`, () => {
  it(
    'starts at 0 with step 1 if given no config arguments',
    $async(() => {
      const iter = $roundRobin($wrap([1, 4, 7]), $wrap([2, 5, 8]), $wrap([3, 6, 9]));
      expect($await($unwrap(iter))).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }),
  );

  it(
    'can have a configurable step',
    $async(() => {
      const iter = $roundRobin(2, $wrap([1, 4, 7]), $wrap([3, 6, 9]), $wrap([2, 5, 8]));
      expect($await($unwrap(iter))).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }),
  );

  it(
    'can have a configurable start and step',
    $async(() => {
      const iter = $roundRobin(1, 2, $wrap([2, 5, 8]), $wrap([1, 4, 7]), $wrap([3, 6, 9]));
      expect($await($unwrap(iter))).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }),
  );

  it(
    'can have start and step specified in a config object',
    $async(() => {
      const iter = $roundRobin(
        { start: 1, step: 1 },
        $wrap([3, 6, 9]),
        $wrap([1, 4, 7]),
        $wrap([2, 5, 8]),
      );
      expect($await($unwrap(iter))).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }),
  );

  it(
    'works with input iterables of different lengths',
    $async(() => {
      const iter = $roundRobin($wrap([]), $wrap([1, 3]), $wrap([2]));
      expect($await($unwrap(iter))).toEqual([1, 2, 3]);
    }),
  );

  describe('when step is invalid', () => {
    it(
      'throws',
      $async(() => {
        expect(() => $roundRobin({ step: 0 }, $wrap([]))).toThrowErrorMatchingSnapshot();
      }),
    );
  });
});
