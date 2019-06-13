const emptyArr = [];

const { hasOwnProperty } = Object.prototype;

export default function keys(keysable) {
  return {
    *[Symbol.iterator]() {
      if (keysable == null) {
        return emptyArr[Symbol.iterator]();
      } else if (typeof keysable.keys === 'function') {
        yield* keysable.keys();
      } else if (typeof keysable === 'object') {
        // pojo
        for (let key in keysable) {
          if (hasOwnProperty.call(keysable, key)) {
            yield key;
          }
        }
      }
    },
  };
}
