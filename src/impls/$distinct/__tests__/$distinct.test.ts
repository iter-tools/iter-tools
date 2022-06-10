import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $distinct } from 'iter-tools-es';
import { $wrap, $unwrap } from '../../../test/$helpers';

describe($`distinct`, () => {
  describe('when source is empty', () => {
    it(
      'yields no values',
      $async(() => {
        expect($await($unwrap($distinct(null)))).toEqual([]);
        expect($await($unwrap($distinct(undefined)))).toEqual([]);
        expect($await($unwrap($distinct($wrap([]))))).toEqual([]);
      }),
    );
  });

  describe('when source has values', () => {
    it(
      'only yield distinct values',
      $async(() => {
        const source = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8];
        const result = [3, 1, 4, 5, 9, 2, 6, 8];
        expect($await($unwrap($distinct($wrap(source))))).toEqual(result);
      }),
    );
  });

  describe('when source has values and a selector is specified', () => {
    it(
      'only yield distinct values based on the selector',
      $async(() => {
        const source = [
          {
            content: 'lorem',
          },
          {
            content: 'ipsum',
          },
          {
            content: 'dolor',
          },
          {
            content: 'ipsum',
          },
          {
            content: 'sit',
          },
        ];
        const result = [
          {
            content: 'lorem',
          },
          {
            content: 'ipsum',
          },
          {
            content: 'dolor',
          },
          {
            content: 'sit',
          },
        ];
        expect($await($unwrap($distinct((item) => item.content, $wrap(source))))).toEqual(result);
      }),
    );
  });
});
