import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $prepend, $toArray, $wrap } from 'iter-tools-es';

describe($`prepend`, () => {
  describe('when source is empty', () => {
    it(
      'yields only the prepended value',
      $async(() => {
        expect($await($toArray($prepend('hello', null)))).toEqual(['hello']);
        expect($await($toArray($prepend('cruel', undefined)))).toEqual(['cruel']);
        expect($await($toArray($prepend('world', $wrap([]))))).toEqual(['world']);
      }),
    );
  });

  it(
    'prepends a value',
    $async(() => {
      expect($await($toArray($prepend(1, $wrap([2, 3]))))).toEqual([1, 2, 3]);
    }),
  );
});
