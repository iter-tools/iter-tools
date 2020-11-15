console.log = jest.fn();
console.warn = jest.fn();
console.error = jest.fn();

expect.extend({
  callsMatchSnapshot(received) {
    let error = null;
    try {
      expect(received.mock.calls).toMatchSnapshot();
    } catch (e) {
      error = e;
    }
    return { message: error && error.message, pass: !error };
  },
});
