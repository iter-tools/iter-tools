/* eslint-disable jest/expect-expect */
import { apply } from 'iter-tools-es';

import { wrap } from '../../../test/helpers.js';

describe('apply', () => {
  it('passes the function the iterable of arguments provided to it', () => {
    const testFn = jest.fn();
    apply(testFn, wrap([2, 3]));
    expect(testFn).toHaveBeenCalledTimes(1);
    expect(testFn).toHaveBeenLastCalledWith(2, 3);
  });

  it('can be curried', () => {
    const testFn = jest.fn();
    apply(testFn)(wrap([2, 3]));
    expect(testFn).toHaveBeenCalledTimes(1);
    expect(testFn).toHaveBeenLastCalledWith(2, 3);
  });

  describe('with no arguments', () => {
    let testFn: (...args: any[]) => any;

    const assertNoArgs = () => {
      expect(testFn).toHaveBeenCalledTimes(1);
      expect(testFn).toHaveBeenLastCalledWith();
    };

    beforeEach(() => {
      testFn = jest.fn();
    });

    describe('(undefined)', () => {
      it('calls the function if given two arguments', () => {
        apply(testFn, undefined);
        assertNoArgs();
      });

      it('can be curried', () => {
        apply(testFn)(undefined);
        assertNoArgs();
      });
    });

    describe('(null)', () => {
      it('calls the function if given two arguments', () => {
        apply(testFn, null);
        assertNoArgs();
      });

      it('can be curried', () => {
        apply(testFn)(null);
        assertNoArgs();
      });
    });
  });
});
