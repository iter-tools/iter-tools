import { asyncToArray } from '../..';
import splitBy from '../split-by';
import asyncSplitBy from '../async-split-by';
import {
  OneTwoThreeIterable,
  AsyncOneTwoThreeIterable,
} from '../../__tests__/__framework__/fixtures';

describe('splitBy', () => {
  it('splitBy', () => {
    const [a, b, c] = splitBy(undefined, 'AAABBCCCCD');
    expect(Array.from(a)).toEqual(['A', 'A', 'A']);
    expect(Array.from(b)).toEqual(['B', 'B']);
    expect(Array.from(c)).toEqual(['C', 'C', 'C', 'C']);
  });

  it('cleans up the iterable', () => {
    const oneTwoThree = new OneTwoThreeIterable();
    const [a, b, c] = splitBy(undefined, oneTwoThree);
    expect(oneTwoThree).toHaveProperty('isCleanedUp', false);
    Array.from(a);
    expect(oneTwoThree).toHaveProperty('isCleanedUp', false);
    Array.from(b);
    expect(oneTwoThree).toHaveProperty('isCleanedUp', false);
    Array.from(c);
    expect(oneTwoThree).toHaveProperty('isCleanedUp', true);
  });
});

describe('asyncSplitBy', () => {
  it('splitBy', async () => {
    const [a, b, c] = asyncSplitBy(undefined, 'AAABBCCCCD');
    expect(await asyncToArray(a)).toEqual(['A', 'A', 'A']);
    expect(await asyncToArray(b)).toEqual(['B', 'B']);
    expect(await asyncToArray(c)).toEqual(['C', 'C', 'C', 'C']);
  });

  it('cleans up the iterable', async () => {
    const oneTwoThree = new AsyncOneTwoThreeIterable();
    const [a, b, c] = asyncSplitBy(undefined, oneTwoThree);
    expect(oneTwoThree).toHaveProperty('isCleanedUp', false);
    await asyncToArray(a);
    expect(oneTwoThree).toHaveProperty('isCleanedUp', false);
    await asyncToArray(b);
    expect(oneTwoThree).toHaveProperty('isCleanedUp', false);
    await asyncToArray(c);
    expect(oneTwoThree).toHaveProperty('isCleanedUp', true);
  });
});
