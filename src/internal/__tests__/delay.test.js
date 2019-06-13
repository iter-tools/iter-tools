import delay from '../delay';

describe('delay', () => {
  it('delay (fulfilled)', async () => {
    const tenMs = delay(10, 'done');
    const result = await tenMs;
    expect(result).toBe('done');
  });

  it('delay (rejected)', async () => {
    const tenMs = delay(10, new Error('oh no'));
    try {
      await tenMs;
      throw new Error('assertion error');
    } catch (e) {
      expect(e.message).toBe('oh no');
    }
  });
});
