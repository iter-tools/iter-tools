import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $groupBy } from 'iter-tools-es';
import { $unwrapDeep } from '../../../test/$helpers.js';

describe($`groupBy (deprecated)`, () => {
  it(
    'returns source values grouped by identity',
    $async(() => {
      const source = 'ABBAAC';
      const result = [
        ['A', ['A']],
        ['B', ['B', 'B']],
        ['A', ['A', 'A']],
        ['C', ['C']],
      ];
      expect($await($unwrapDeep($groupBy(null, source)))).toEqual(result);
      expect($await($unwrapDeep($groupBy(null, source)))).toEqual(result);
      expect(console.warn).callsMatchSnapshot();
    }),
  );
});
