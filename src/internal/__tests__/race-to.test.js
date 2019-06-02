import raceTo from '../race-to';
import delay from '../delay';

const isOdd = num => num % 2 === 1;

describe('raceTo', () => {
  it('yields the result from the first promise to resolve', async () => {
    expect(await raceTo(() => true, null, [delay(40, 1), delay(20, 2)])).toBe(2);
  });

  it('yields the result of the first promise to resolve with a predicate', async () => {
    expect(await raceTo(isOdd, null, [delay(40, 1), delay(20, 2)])).toBe(1);
  });

  it('yields the not found result if no iterable matches the predicate', async () => {
    expect(await raceTo(() => false, null, [delay(40, 1), delay(20, 2)])).toBe(null);
  });

  it('fails if the first promise to resolve fails', async () => {
    const error = new Error('Success');
    expect.assertions(1);
    await expect(raceTo(isOdd => true, null, [delay(40, 1), delay(20, error)])).rejects.toBe(error);
  });
});
