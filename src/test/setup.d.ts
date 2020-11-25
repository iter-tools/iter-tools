declare namespace jest {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Matchers<R> {
    callsMatchSnapshot(): CustomMatcherResult;
  }
}
