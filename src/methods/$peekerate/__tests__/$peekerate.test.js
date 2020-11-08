import { $, $async, $await } from '../../../../generate/async.macro';

import { $peekerate, $PeekeratorClass } from '../../..';
import { $wrap } from '../../../__tests__/__framework__/$wrap';

describe($`peekerate`, () => {
  it(
    'creates a peekerator',
    $async(() => {
      expect($await($peekerate([]))).toBeInstanceOf($PeekeratorClass);
    }),
  );

  it(
    'decorates iterator with the current item in the iterable',
    $async(() => {
      const peekerator = $await($peekerate($wrap([1, 2, 3])));
      const observed = [];

      while (!peekerator.done) {
        const { current, done, value } = peekerator;
        observed.push({ current, done, value });
        $await(peekerator.advance());
      }

      expect(observed).toEqual([
        {
          current: {
            done: false,
            value: 1,
          },
          done: false,
          value: 1,
        },
        {
          current: {
            done: false,
            value: 2,
          },
          done: false,
          value: 2,
        },
        {
          current: {
            done: false,
            value: 3,
          },
          done: false,
          value: 3,
        },
      ]);
    }),
  );
});
