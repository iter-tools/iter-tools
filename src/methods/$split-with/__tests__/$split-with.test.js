import { $, $isSync, $async, $await } from '../../../../generate/async.macro';

import { $unwrapDeep as $uw } from '../../../__tests__/$helpers';
import { $splitWith, $toArray } from '../../..';

describe($`splitWith`, () => {
  it(
    'should split between every item which is equal to the on argument',
    $async(() => {
      expect($await($uw($splitWith(i => i === null, [1, null, 2, null, 3])))).toEqual([
        [1],
        [2],
        [3],
      ]);
    }),
  );

  if ($isSync) {
    describe('given a string', () => {
      it('should split on every character which matches the accessor', () => {
        expect($await($toArray($splitWith(i => i === 'Ø', '11Ø22Ø33')))).toEqual([
          '11',
          '22',
          '33',
        ]);
      });

      it('should split on a regex', () => {
        expect($await($toArray($splitWith(/Ø/, '11Ø22Ø33')))).toEqual(['11', '22', '33']);
      });
    });
  }
});
