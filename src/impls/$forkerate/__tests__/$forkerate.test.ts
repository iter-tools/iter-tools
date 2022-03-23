import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $forkerate, $startsWithSeq, $str } from 'iter-tools-es';
import { $wrap, $unwrap } from '../../../test/$helpers.js';

describe($`forkerate`, () => {
  describe('forkerator', () => {
    it(
      'yields values from source',
      $async(() => {
        expect($await($unwrap($await($forkerate($wrap([1, 2, 3]))).asIterator()))).toEqual([
          1,
          2,
          3,
        ]);
      }),
    );
  });

  describe('fork', () => {
    it(
      'yields values including and after forkr.current',
      $async(() => {
        const forkr = $await($forkerate($wrap([1, 2, 3])));

        expect($await($unwrap(forkr.fork()))).toEqual([1, 2, 3]);
        expect($await($unwrap(forkr))).toEqual([1, 2, 3]);

        $await(forkr.advance());

        expect($await($unwrap(forkr.fork()))).toEqual([2, 3]);
        expect($await($unwrap(forkr))).toEqual([2, 3]);

        $await(forkr.advance());

        expect($await($unwrap(forkr.fork()))).toEqual([3]);
        expect($await($unwrap(forkr))).toEqual([3]);

        $await(forkr.advance());

        expect($await($unwrap(forkr.fork()))).toEqual([]);
        expect($await($unwrap(forkr))).toEqual([]);

        expect($await(forkr.fork().next())).toEqual({ value: undefined, done: true });
      }),
    );
  });

  it(
    'can be used to strip comments',
    $async(() => {
      $async;
      function* stripComments(source) {
        let forkr = $await($forkerate(source));

        while (true) {
          const isComment = $await($startsWithSeq('//', forkr.fork()));

          while (!forkr.done && forkr.value !== '\n') {
            if (!isComment) yield forkr.value;
            forkr = $await(forkr.advance());
          }

          if (forkr.done) break;

          if (!isComment) yield '\n';
          forkr = $await(forkr.advance());
        }
      }

      expect($await($str(stripComments('// comment\ncode')))).toBe('code');
    }),
  );
});
