const emptyArr = [];

const { hasOwnProperty } = Object.prototype;

export default function values(valuesable) {
  return {
    *[Symbol.iterator]() {
      if (valuesable == null) {
        return emptyArr[Symbol.iterator]();
      } else if (typeof valuesable.values === 'function') {
        yield* valuesable.values();
      } else if (typeof valuesable === 'object') {
        // pojo
        for (let key in valuesable) {
          if (hasOwnProperty.call(valuesable, key)) {
            yield valuesable[key];
          }
        }
      }
    },
  };
}
