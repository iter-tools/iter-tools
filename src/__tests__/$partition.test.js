import { $isAsync, $async, $await } from '../../generate/async.macro';
import { $partition, asyncPartition, $zip, asyncZip, $toArray, asyncToArray, range } from '..';

describe($async`partition`, () => {
  describe('sync predicate', () => {
    const predicate = (n: number) => n % 2 === 0;

    describe('sync iterable', () => {
      it(
        'empty iterable',
        $async(() => {
          const [evens, odds] = $partition(predicate, []);

          expect([$await($toArray(evens)), $await($toArray(odds))]).toEqual([[], []]);
        }),
      );

      it(
        'range(10)',
        $async(() => {
          const [evens, odds] = $partition(predicate, range(10));

          expect([$await($toArray(evens)), $await($toArray(odds))]).toEqual([
            [0, 2, 4, 6, 8],
            [1, 3, 5, 7, 9],
          ]);
        }),
      );

      it(
        'calls func once for each item',
        $async(() => {
          const func = jest.fn(predicate);
          const [evens, odds] = $partition(func, range(10));
          $await($toArray(evens));
          $await($toArray(odds));
          expect(func.mock.calls).toEqual(Array.from(range(10)).map(x => [x]));
        }),
      );

      it(
        'iterate both evens and odds at the same time',
        $async(() => {
          const [evens, odds] = $partition(predicate, range(10));
          const zipped = $await($toArray($zip(evens, odds)));
          expect(zipped).toEqual([[0, 1], [2, 3], [4, 5], [6, 7], [8, 9]]);
        }),
      );
    });

    if ($isAsync) {
      describe('async iterable', () => {
        it('empty iterable', async () => {
          const [evens, odds] = asyncPartition(predicate, []);

          expect([await asyncToArray(evens), await asyncToArray(odds)]).toEqual([[], []]);
        });

        it('range(10)', async () => {
          const [evens, odds] = asyncPartition(predicate, range(10));

          expect([await asyncToArray(evens), await asyncToArray(odds)]).toEqual([
            [0, 2, 4, 6, 8],
            [1, 3, 5, 7, 9],
          ]);
        });

        it('calls func once for each item', async () => {
          const func = jest.fn(predicate);
          const [evens, odds] = asyncPartition(func, range(10));
          await asyncToArray(evens);
          await asyncToArray(odds);
          expect(func.mock.calls).toEqual(Array.from(range(10)).map(x => [x]));
        });

        it('iterate both evens and odds at the same time', async () => {
          const [evens, odds] = asyncPartition(predicate, range(10));
          const zipped = await asyncToArray(asyncZip(evens, odds));
          expect(zipped).toEqual([[0, 1], [2, 3], [4, 5], [6, 7], [8, 9]]);
        });
      });
    }
  });

  if ($isAsync) {
    describe('async predicate', () => {
      const predicate = async (n: number) => n % 2 === 0;

      describe('sync iterable', () => {
        it('empty iterable', async () => {
          const [evens, odds] = asyncPartition(predicate, []);

          expect([await asyncToArray(evens), await asyncToArray(odds)]).toEqual([[], []]);
        });

        it('range(10)', async () => {
          const [evens, odds] = asyncPartition(predicate, range(10));

          expect([await asyncToArray(evens), await asyncToArray(odds)]).toEqual([
            [0, 2, 4, 6, 8],
            [1, 3, 5, 7, 9],
          ]);
        });

        it('calls func once for each item', async () => {
          const func = jest.fn(predicate);
          const [evens, odds] = asyncPartition(func, range(10));
          await asyncToArray(evens);
          await asyncToArray(odds);
          expect(func.mock.calls).toEqual(Array.from(range(10)).map(x => [x]));
        });

        it('iterate both evens and odds at the same time', async () => {
          const [evens, odds] = asyncPartition(predicate, range(10));
          const zipped = await asyncToArray(asyncZip(evens, odds));
          expect(zipped).toEqual([[0, 1], [2, 3], [4, 5], [6, 7], [8, 9]]);
        });
      });

      describe('async iterable', () => {
        it('empty iterable', async () => {
          const [evens, odds] = asyncPartition(predicate, []);

          expect([await asyncToArray(evens), await asyncToArray(odds)]).toEqual([[], []]);
        });

        it('range(10)', async () => {
          const [evens, odds] = asyncPartition(predicate, range(10));

          expect([await asyncToArray(evens), await asyncToArray(odds)]).toEqual([
            [0, 2, 4, 6, 8],
            [1, 3, 5, 7, 9],
          ]);
        });

        it('calls func once for each item', async () => {
          const func = jest.fn(predicate);
          const [evens, odds] = asyncPartition(func, range(10));
          await asyncToArray(evens);
          await asyncToArray(odds);
          expect(func.mock.calls).toEqual(Array.from(range(10)).map(x => [x]));
        });

        it('iterate both evens and odds at the same time', async () => {
          const [evens, odds] = asyncPartition(predicate, range(10));
          const zipped = await asyncToArray(asyncZip(evens, odds));
          expect(zipped).toEqual([[0, 1], [2, 3], [4, 5], [6, 7], [8, 9]]);
        });
      });
    });
  }
});
