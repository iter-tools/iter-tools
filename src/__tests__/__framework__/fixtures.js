export class OneTwoThreeIterable {
  constructor() {
    this._counter = 0;
    this.isCleanedUp = false;
  }

  next() {
    if (this._counter <= 2) {
      return {
        value: ++this._counter,
        done: false,
      };
    } else {
      this.isCleanedUp = true;
      return {
        value: undefined,
        done: true,
      };
    }
  }

  return() {
    this.isCleanedUp = true;
  }

  [Symbol.iterator]() {
    return this;
  }
}

export class AsyncOneTwoThreeIterable {
  constructor() {
    this._counter = 0;
    this.isCleanedUp = false;
  }

  next() {
    if (this._counter <= 2) {
      return Promise.resolve({
        value: ++this._counter,
        done: false,
      });
    } else {
      this.isCleanedUp = true;
      return Promise.resolve({
        value: undefined,
        done: true,
      });
    }
  }

  return() {
    this.isCleanedUp = true;
  }

  [Symbol.asyncIterator]() {
    return this;
  }
}
