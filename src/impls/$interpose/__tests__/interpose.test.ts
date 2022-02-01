/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$interpose.test.ts#1643837503076
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { interpose } from 'iter-tools-es';
import { wrap, unwrap } from '../../../test/helpers.js';

describe('interpose', () => {
  describe('when source is empty', () => {
    it('yields no values', () => {
      expect(unwrap(interpose('', null))).toEqual([]);
      expect(unwrap(interpose('', undefined))).toEqual([]);
      expect(unwrap(interpose('', wrap([])))).toEqual([]);
    });
  });

  describe('when source contains a single value', () => {
    it('yields that value', () => {
      const iter = interpose(null, wrap([1]));
      expect(unwrap(iter)).toEqual([1]);
    });
  });

  describe('when source contains multiple values', () => {
    it('yields interposed value between each value from source', () => {
      const iter = interpose(null, wrap([1, 2, 3]));
      expect(unwrap(iter)).toEqual([1, null, 2, null, 3]);
    });
  });

  describe('when source is a string', () => {
    it('warns', () => {
      interpose(null, 'abc');
      expect(console.warn).callsMatchSnapshot();
    });
  });
});
