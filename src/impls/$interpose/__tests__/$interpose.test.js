import { $, $isSync, $async, $await } from '../../../../generate/async.macro.cjs';

import { $interpose } from '@iter-tools/es';
import { $wrap, $unwrap } from '../../../test/$helpers.js';

describe($`interpose`, () => {
  describe('when source is empty', () => {
    it(
      'yields no values',
      $async(() => {
        expect($await($unwrap($interpose('', null)))).toEqual([]);
        expect($await($unwrap($interpose('', undefined)))).toEqual([]);
        expect($await($unwrap($interpose('', $wrap([]))))).toEqual([]);
      }),
    );
  });

  describe('when source contains a single value', () => {
    it(
      'yields that value',
      $async(() => {
        const iter = $interpose(null, $wrap([1]));
        expect($await($unwrap(iter))).toEqual([1]);
      }),
    );
  });

  describe('when source contains multiple values', () => {
    it(
      'yields interposed value between each value from source',
      $async(() => {
        const iter = $interpose(null, $wrap([1, 2, 3]));
        expect($await($unwrap(iter))).toEqual([1, null, 2, null, 3]);
      }),
    );
  });

  if ($isSync) {
    describe('when source is a string', () => {
      it(
        'warns',
        $async(() => {
          $interpose(null, 'abc');
          expect(console.warn).callsMatchSnapshot();
        }),
      );
    });
  }
});
