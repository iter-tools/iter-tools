export class IteratorProxy {
  constructor(iter) {
    this._iter = iter;
  }

  next() {
    return this._iter.next();
  }

  throw(error) {
    if (typeof this._iter.throw === 'function') {
      this._iter.throw(error);
    }
  }

  return(value) {
    if (typeof this._iter.return === 'function') {
      this._iter.return(value);
    }
  }
}
