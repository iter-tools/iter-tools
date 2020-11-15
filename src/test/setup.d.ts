declare namespace jest {
  interface Matchers<R> {
    callsMatchSnapshot(): CustomMatcherResult;
  }
}
