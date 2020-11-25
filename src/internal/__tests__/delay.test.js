import delay from '../delay';

describe('delay', () => {
  it('delay (fulfilled)', async () => {
    const tenMs = delay(10, 'done');
    await expect(tenMs).resolves.toBe('done');
  });

  it('delay (rejected)', async () => {
    const tenMs = delay(10, new Error('oh no'));
    await expect(tenMs).rejects.toThrow('oh no');
  });
});
