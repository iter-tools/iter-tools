import { $, $async, $await } from '../../../../generate/async.macro';

import { $groupBy } from '../../..';
import { $unwrapDeep } from '../../../test/$helpers';

describe($`groupBy (deprecated)`, () => {
  it(
    'returns source values grouped by identity',
    $async(() => {
      const source = 'ABBAAC';
      const result = [['A', ['A']], ['B', ['B', 'B']], ['A', ['A', 'A']], ['C', ['C']]];
      expect($await($unwrapDeep($groupBy(null, source)))).toEqual(result);
      expect($await($unwrapDeep($groupBy(null, source)))).toEqual(result);
      expect(console.warn).callsMatchSnapshot();
    }),
  );
});
