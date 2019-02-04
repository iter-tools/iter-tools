/* eslint-env node, jest */
const { cursor, asyncCursor, asyncToArray } = require('..')

describe('cursor', function () {
  it('frames iterable', function () {
    const iter = cursor({ size: 3 }, [1, 2, 3, 4, 5])
    expect(Array.from(iter)).toEqual([
      [undefined, undefined, 1],
      [undefined, 1, 2],
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5]
    ])
  })

  it('frames iterable (use filler)', function () {
    const iter = cursor({ size: 3, filler: 'x' }, [1, 2, 3, 4, 5])
    expect(Array.from(iter)).toEqual([
      ['x', 'x', 1],
      ['x', 1, 2],
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5]
    ])
  })

  it('frames iterable (cursor equal to the sequence)', function () {
    const iter = cursor({ size: 5 }, [1, 2, 3, 4, 5])
    expect(Array.from(iter)).toEqual([
      [undefined, undefined, undefined, undefined, 1],
      [undefined, undefined, undefined, 1, 2],
      [undefined, undefined, 1, 2, 3],
      [undefined, 1, 2, 3, 4],
      [1, 2, 3, 4, 5]
    ])
  })

  it('frames iterable (cursor bigger than the sequence)', function () {
    const iter = cursor({ size: 6 }, [1, 2, 3, 4, 5])
    expect(Array.from(iter)).toEqual([
      [undefined, undefined, undefined, undefined, undefined, 1],
      [undefined, undefined, undefined, undefined, 1, 2],
      [undefined, undefined, undefined, 1, 2, 3],
      [undefined, undefined, 1, 2, 3, 4],
      [undefined, 1, 2, 3, 4, 5]
    ])
  })

  it('frames iterable (cursor bigger than the sequence) with filler', function () {
    const iter = cursor({ size: 6, filler: 'x' }, [1, 2, 3, 4, 5])
    expect(Array.from(iter)).toEqual([
      ['x', 'x', 'x', 'x', 'x', 1],
      ['x', 'x', 'x', 'x', 1, 2],
      ['x', 'x', 'x', 1, 2, 3],
      ['x', 'x', 1, 2, 3, 4],
      ['x', 1, 2, 3, 4, 5]
    ])
  })

  it('frames iterable (cursor bigger than the sequence)', function () {
    const iter = cursor({ size: 7 }, [1, 2, 3, 4, 5])
    expect(Array.from(iter)).toEqual([
      [undefined, undefined, undefined, undefined, undefined, undefined, 1],
      [undefined, undefined, undefined, undefined, undefined, 1, 2],
      [undefined, undefined, undefined, undefined, 1, 2, 3],
      [undefined, undefined, undefined, 1, 2, 3, 4],
      [undefined, undefined, 1, 2, 3, 4, 5]
    ])
  })

  describe('trailing', function () {
    it('frames iterable', function () {
      const iter = cursor({ size: 3, trailing: true }, [1, 2, 3, 4, 5])
      expect(Array.from(iter)).toEqual([
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5],
        [4, 5, undefined],
        [5, undefined, undefined]
      ])
    })

    it('frames iterable, with filler', function () {
      const iter = cursor({ size: 3, trailing: true, filler: 'x' }, [1, 2, 3, 4, 5])
      expect(Array.from(iter)).toEqual([
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5],
        [4, 5, 'x'],
        [5, 'x', 'x']
      ])
    })

    it('frames iterable (cursor equal to the sequence)', function () {
      const iter = cursor({ size: 5, trailing: true }, [1, 2, 3, 4, 5])
      expect(Array.from(iter)).toEqual([
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, undefined],
        [3, 4, 5, undefined, undefined],
        [4, 5, undefined, undefined, undefined],
        [5, undefined, undefined, undefined, undefined]
      ])
    })

    it('frames iterable (cursor bigger than the sequence)', function () {
      const iter = cursor({ size: 6, trailing: true }, [1, 2, 3, 4, 5])
      expect(Array.from(iter)).toEqual([
        [1, 2, 3, 4, 5, undefined],
        [2, 3, 4, 5, undefined, undefined],
        [3, 4, 5, undefined, undefined, undefined],
        [4, 5, undefined, undefined, undefined, undefined],
        [5, undefined, undefined, undefined, undefined, undefined]
      ])
    })

    it('frames iterable (cursor bigger than the sequence) with filler', function () {
      const iter = cursor({ size: 6, trailing: true, filler: 'x' }, [1, 2, 3, 4, 5])
      expect(Array.from(iter)).toEqual([
        [1, 2, 3, 4, 5, 'x'],
        [2, 3, 4, 5, 'x', 'x'],
        [3, 4, 5, 'x', 'x', 'x'],
        [4, 5, 'x', 'x', 'x', 'x'],
        [5, 'x', 'x', 'x', 'x', 'x']
      ])
    })

    it('frames iterable (cursor bigger than the sequence) 2', function () {
      const iter = cursor({ size: 7, trailing: true }, [1, 2, 3, 4, 5])
      expect(Array.from(iter)).toEqual([
        [1, 2, 3, 4, 5, undefined, undefined],
        [2, 3, 4, 5, undefined, undefined, undefined],
        [3, 4, 5, undefined, undefined, undefined, undefined],
        [4, 5, undefined, undefined, undefined, undefined, undefined],
        [5, undefined, undefined, undefined, undefined, undefined, undefined]
      ])
    })
  })
})

describe('asyncCursor', function () {
  it('frames iterable', async function () {
    const iter = asyncCursor({ size: 3 }, [1, 2, 3, 4, 5])
    expect(await asyncToArray(iter)).toEqual([
      [undefined, undefined, 1],
      [undefined, 1, 2],
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5]
    ])
  })

  it('frames iterable (user filler)', async function () {
    const iter = asyncCursor({ size: 3, filler: 'x' }, [1, 2, 3, 4, 5])
    expect(await asyncToArray(iter)).toEqual([
      ['x', 'x', 1],
      ['x', 1, 2],
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5]
    ])
  })

  it('frames iterable (cursor equal to the sequence)', async function () {
    const iter = asyncCursor({ size: 5 }, [1, 2, 3, 4, 5])
    expect(await asyncToArray(iter)).toEqual([
      [undefined, undefined, undefined, undefined, 1],
      [undefined, undefined, undefined, 1, 2],
      [undefined, undefined, 1, 2, 3],
      [undefined, 1, 2, 3, 4],
      [1, 2, 3, 4, 5]
    ])
  })

  it('frames iterable (cursor bigger than the sequence)', async function () {
    const iter = asyncCursor({ size: 6 }, [1, 2, 3, 4, 5])
    expect(await asyncToArray(iter)).toEqual([
      [undefined, undefined, undefined, undefined, undefined, 1],
      [undefined, undefined, undefined, undefined, 1, 2],
      [undefined, undefined, undefined, 1, 2, 3],
      [undefined, undefined, 1, 2, 3, 4],
      [undefined, 1, 2, 3, 4, 5]
    ])
  })

  it('frames iterable (cursor bigger than the sequence) with filler', async function () {
    const iter = asyncCursor({ size: 6, filler: 'x' }, [1, 2, 3, 4, 5])
    expect(await asyncToArray(iter)).toEqual([
      ['x', 'x', 'x', 'x', 'x', 1],
      ['x', 'x', 'x', 'x', 1, 2],
      ['x', 'x', 'x', 1, 2, 3],
      ['x', 'x', 1, 2, 3, 4],
      ['x', 1, 2, 3, 4, 5]
    ])
  })

  describe('trailing', function () {
    it('frames iterable', async function () {
      const iter = asyncCursor({ size: 3, trailing: true }, [1, 2, 3, 4, 5])
      expect(await asyncToArray(iter)).toEqual([
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5],
        [4, 5, undefined],
        [5, undefined, undefined]
      ])
    })

    it('frames iterable', async function () {
      const iter = asyncCursor({ size: 3, trailing: true, filler: 'x' }, [1, 2, 3, 4, 5])
      expect(await asyncToArray(iter)).toEqual([
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5],
        [4, 5, 'x'],
        [5, 'x', 'x']
      ])
    })

    it('frames iterable (cursor equal to the sequence)', async function () {
      const iter = asyncCursor({ size: 5, trailing: true }, [1, 2, 3, 4, 5])
      expect(await asyncToArray(iter)).toEqual([
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, undefined],
        [3, 4, 5, undefined, undefined],
        [4, 5, undefined, undefined, undefined],
        [5, undefined, undefined, undefined, undefined]
      ])
    })

    it('frames iterable (cursor bigger than the sequence)', async function () {
      const iter = asyncCursor({ size: 6, trailing: true }, [1, 2, 3, 4, 5])
      expect(await asyncToArray(iter)).toEqual([
        [1, 2, 3, 4, 5, undefined],
        [2, 3, 4, 5, undefined, undefined],
        [3, 4, 5, undefined, undefined, undefined],
        [4, 5, undefined, undefined, undefined, undefined],
        [5, undefined, undefined, undefined, undefined, undefined]
      ])
    })

    it('frames iterable (cursor bigger than the sequence) with filler', async function () {
      const iter = asyncCursor({ size: 6, trailing: true, filler: 'x' }, [1, 2, 3, 4, 5])
      expect(await asyncToArray(iter)).toEqual([
        [1, 2, 3, 4, 5, 'x'],
        [2, 3, 4, 5, 'x', 'x'],
        [3, 4, 5, 'x', 'x', 'x'],
        [4, 5, 'x', 'x', 'x', 'x'],
        [5, 'x', 'x', 'x', 'x', 'x']
      ])
    })

    it('frames iterable (cursor bigger than the sequence) 2', async function () {
      const iter = asyncCursor({ size: 7, trailing: true }, [1, 2, 3, 4, 5])
      expect(await asyncToArray(iter)).toEqual([
        [1, 2, 3, 4, 5, undefined, undefined],
        [2, 3, 4, 5, undefined, undefined, undefined],
        [3, 4, 5, undefined, undefined, undefined, undefined],
        [4, 5, undefined, undefined, undefined, undefined, undefined],
        [5, undefined, undefined, undefined, undefined, undefined, undefined]
      ])
    })
  })
})
