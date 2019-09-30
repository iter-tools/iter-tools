import { $, $isSync, $async, $await } from '../../../../generate/async.macro';

import { $splitOnAny, $map, $toArray } from '../../..';

describe($`splitOnAny`, () => {
  it(
    'should split on an occurance of any value',
    $async(() => {
      expect(
        $await(
          $toArray(
            $map(group => $toArray(group), $splitOnAny([null, undefined], [1, null, undefined, 3])),
          ),
        ),
      ).toEqual([[1], [], [3]]);
    }),
  );

  it(
    'does not split when passed no values',
    $async(() => {
      expect(
        $await($toArray($map(group => $toArray(group), $splitOnAny(null, [1, 2, 3])))),
      ).toEqual([[1, 2, 3]]);
    }),
  );

  it(
    'passes through the empty iterable',
    $async(() => {
      expect($await($toArray($splitOnAny([], null)))).toEqual([]);
    }),
  );

  it(
    'the empty string is an empty iterable',
    $async(() => {
      expect($await($toArray($splitOnAny([], '')))).toEqual([]);
    }),
  );

  if ($isSync) {
    describe('given a string', () => {
      it('should split on every item which is equal to the on argument', () => {
        expect($toArray($splitOnAny('Ø', '11Ø22Ø33'))).toEqual(['11', '22', '33']);
      });
    });
  }
});
