import { objectKeys } from '../../..';

describe('objectKeys', () => {
  it('works with Objects', () => {
    const i = objectKeys({ 1: 1, 2: 2 });
    expect(Array.from(i)).toEqual(['1', '2']);
  });

  it('can be reused', () => {
    const i = objectKeys({ 1: 1, 2: 2 });
    expect(Array.from(i)).toEqual(['1', '2']);
    expect(Array.from(i)).toEqual(['1', '2']);
  });

  it('works with null', () => {
    const i = objectKeys(null);
    expect(Array.from(i)).toEqual([]);
  });

  it('throws with non-object', () => {
    const obj: any = 4;
    expect(() => objectKeys(obj)).toThrowErrorMatchingSnapshot();
  });
});
