import { $, $isAsync, $async, $await } from '../../../../generate/async.macro';

import { $execute } from '../../..';

describe($`execute`, () => {
  it(
    'executes forever',
    $async(() => {
      const iter = $execute(() => 1);
      expect($await(iter.next())).toEqual({ value: 1, done: false });
      expect($await(iter.next())).toEqual({ value: 1, done: false });
      expect($await(iter.next())).toEqual({ value: 1, done: false });
    }),
  );

  it(
    'can be passed additional arguments',
    $async(() => {
      const iter = $execute((a, b) => a + b + 1, 4, 6);
      expect($await(iter.next())).toEqual({ value: 11, done: false });
      expect($await(iter.next())).toEqual({ value: 11, done: false });
      expect($await(iter.next())).toEqual({ value: 11, done: false });
    }),
  );

  if ($isAsync) {
    it('executes forever (with promise value)', async () => {
      const iter = $execute(() => Promise.resolve(1));
      expect(await iter.next()).toEqual({ value: 1, done: false });
      expect(await iter.next()).toEqual({ value: 1, done: false });
      expect(await iter.next()).toEqual({ value: 1, done: false });
    });
  }
});
