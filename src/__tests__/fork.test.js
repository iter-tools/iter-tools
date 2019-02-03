/* eslint-env node, jest */
const { fork, asyncFork, asyncToArray } = require('..')

function * makeIterable () {
  yield 1
  yield 2
  yield 3
}

class OneTwoThreeIterable {
  constructor () {
    this._counter = 0
    this.isCleanedUp = false
  }

  next () {
    if (this._counter <= 3) {
      return {
        value: ++this._counter,
        done: false
      }
    } else {
      this.isCleanedUp = true
      return {
        value: undefined,
        done: true
      }
    }
  }

  return () {
    this.isCleanedUp = true
  }

  [Symbol.iterator] () {
    return this
  }
}

describe('fork', function () {
  it('creates an iterable of iterables with the same values as its source', function () {
    const [a, b, c] = fork(makeIterable())
    expect(
      [a, b, c].map(iter => Array.from(iter))
    ).toEqual(
      Array(3).fill(Array.from(makeIterable()))
    )
  })

  it('it does not matter which order the fork iterables are consumed in', function () {
    const [a, b, c] = fork(makeIterable())
    expect(
      [c, b, a].map(iter => Array.from(iter))
    ).toEqual(
      Array(3).fill(Array.from(makeIterable()))
    )
  })

  describe('source iterable cleanup', function () {
    it('happens when a fork is exhausted', function () {
      const oneTwoThree = new OneTwoThreeIterable()
      const iterableIterator = fork(oneTwoThree)[Symbol.iterator]()
      Array.from(iterableIterator.next().value)
      expect(oneTwoThree).toHaveProperty('isCleanedUp', true)
    })

    it('happens when fork is exhausted and then all forks are exhausted', function () {
      const oneTwoThree = new OneTwoThreeIterable()
      const [a, b] = fork(oneTwoThree)
      expect(oneTwoThree).toHaveProperty('isCleanedUp', false)
      a[Symbol.iterator]().next()
      a.return()
      expect(oneTwoThree).toHaveProperty('isCleanedUp', false)
      b[Symbol.iterator]().next()
      b.return()
      expect(oneTwoThree).toHaveProperty('isCleanedUp', true)
    })

    it('happens when all forks are exhausted then fork is exhausted', function () {
      const oneTwoThree = new OneTwoThreeIterable()
      const iterableIterator = fork(oneTwoThree)[Symbol.iterator]()

      const a = iterableIterator.next().value
      a[Symbol.iterator]().next()
      a.return()
      expect(oneTwoThree).toHaveProperty('isCleanedUp', false)

      const b = iterableIterator.next().value
      b[Symbol.iterator]().next()
      b.return()
      expect(oneTwoThree).toHaveProperty('isCleanedUp', false)

      iterableIterator.return()

      expect(oneTwoThree).toHaveProperty('isCleanedUp', true)
    })

    it('happens even when a fork is closed without being used', function () {
      const oneTwoThree = new OneTwoThreeIterable()
      const [a, b] = fork(oneTwoThree)
      expect(oneTwoThree).toHaveProperty('isCleanedUp', false)
      a.return()
      expect(oneTwoThree).toHaveProperty('isCleanedUp', false)
      b.return()
      expect(oneTwoThree).toHaveProperty('isCleanedUp', true)
    })
  })
})

async function * asyncMakeIterable () {
  yield 1
  yield 2
  yield 3
}

class AsyncOneTwoThreeIterable {
  constructor () {
    this._counter = 0
    this.isCleanedUp = false
  }

  next () {
    if (this._counter <= 3) {
      return Promise.resolve({
        value: ++this._counter,
        done: false
      })
    } else {
      this.isCleanedUp = true
      return Promise.resolve({
        value: undefined,
        done: true
      })
    }
  }

  return () {
    this.isCleanedUp = true
  }

  [Symbol.asyncIterator] () {
    return this
  }
}

describe('asyncFork', function () {
  it('creates an iterable of iterables with the same values as its source', async function () {
    const [a, b, c] = asyncFork(asyncMakeIterable())
    const originalIter = await asyncToArray(asyncMakeIterable())

    expect(
      await Promise.all([a, b, c].map(iter => asyncToArray(iter)))
    ).toEqual(
      Array(3).fill(originalIter)
    )
  })

  it('it does not matter which order the fork iterables are consumed in', async function () {
    const [a, b, c] = asyncFork(asyncMakeIterable())
    const originalIter = await asyncToArray(asyncMakeIterable())
    expect(
      await Promise.all([c, b, a].map(iter => asyncToArray(iter)))
    ).toEqual(
      Array(3).fill(originalIter)
    )
  })

  describe('source iterable cleanup', function () {
    it('happens when a fork is exhausted', async function () {
      const oneTwoThree = new AsyncOneTwoThreeIterable()
      const iterableIterator = asyncFork(oneTwoThree)[Symbol.iterator]()
      await asyncToArray(iterableIterator.next().value)
      expect(oneTwoThree).toHaveProperty('isCleanedUp', true)
    })

    it('happens when fork is exhausted and then all forks are exhausted', async function () {
      const oneTwoThree = new AsyncOneTwoThreeIterable()
      const [a, b] = asyncFork(oneTwoThree)
      expect(oneTwoThree).toHaveProperty('isCleanedUp', false)
      await a[Symbol.asyncIterator]().next()
      await a.return()
      expect(oneTwoThree).toHaveProperty('isCleanedUp', false)
      await b[Symbol.asyncIterator]().next()
      await b.return()
      expect(oneTwoThree).toHaveProperty('isCleanedUp', true)
    })

    it('happens when all forks are exhausted then fork is exhausted', async function () {
      const oneTwoThree = new AsyncOneTwoThreeIterable()
      const iterableIterator = asyncFork(oneTwoThree)[Symbol.iterator]()

      const a = iterableIterator.next().value
      await a[Symbol.asyncIterator]().next()
      await a.return()
      expect(oneTwoThree).toHaveProperty('isCleanedUp', false)

      const b = iterableIterator.next().value
      await b[Symbol.asyncIterator]().next()
      await b.return()
      expect(oneTwoThree).toHaveProperty('isCleanedUp', false)

      iterableIterator.return()

      expect(oneTwoThree).toHaveProperty('isCleanedUp', true)
    })

    it('happens even when a fork is closed without being used', async function () {
      const oneTwoThree = new AsyncOneTwoThreeIterable()
      const [a, b] = asyncFork(oneTwoThree)
      expect(oneTwoThree).toHaveProperty('isCleanedUp', false)
      await a.return()
      expect(oneTwoThree).toHaveProperty('isCleanedUp', false)
      await b.return()
      expect(oneTwoThree).toHaveProperty('isCleanedUp', true)
    })
  })
})
