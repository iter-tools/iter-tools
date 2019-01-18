/* eslint-env node, jest */
const { multiFilter, range, chain } = require('iter-tools')

const allToArray = (...args) => args.map(iter => Array.from(iter))

describe('multiFilter', function () {
  describe('full (no unsatisfied)', function () {
    const fns = [
      x => x % 4 === 0,
      x => x % 3 === 0,
      x => x % 2 === 0,
      x => x % 1 === 0
    ]

    it('empty iterable', function () {
      const { satisfied, unsatisfied } = multiFilter(fns, [])
      expect({
        satisfied: allToArray(...satisfied),
        unsatisfied: Array.from(unsatisfied)
      }).toEqual({
        satisfied: Array(fns.length).fill([]),
        unsatisfied: []
      })
    })

    it('range(24)', function () {
      const { satisfied, unsatisfied } = multiFilter(fns, range(24))
      expect({
        satisfied: allToArray(...satisfied),
        unsatisfied: Array.from(unsatisfied)
      }).toEqual({
        satisfied: [
          [0, 4, 8, 12, 16, 20], // satisfy fns[0]
          [3, 6, 9, 15, 18, 21], // satisfy fns[1] but not fns[0]
          [2, 10, 14, 22], // satisfy fns[2] but not fns[1] or fns[0]
          [1, 5, 7, 11, 13, 17, 19, 23] // satisfy fns[3] but not fns[2], fns[1] or fns[0]
        ],
        unsatisfied: []
      })
    })

    it('does not leave any item behind', function () {
      const { satisfied, unsatisfied } = multiFilter(fns, range(24))
      expect(new Set(chain(...satisfied, unsatisfied))).toEqual(new Set(range(24)))
    })
  })

  describe('partial (not all satisfied)', function () {
    const fns = [
      x => x % 4 === 0,
      x => x % 3 === 0
    ]

    it('empty iterable', function () {
      const { satisfied, unsatisfied } = multiFilter(fns, [])
      expect({
        satisfied: allToArray(...satisfied),
        unsatisfied: Array.from(unsatisfied)
      }).toEqual({
        satisfied: Array(fns.length).fill([]),
        unsatisfied: []
      })
    })

    it('range(24)', function () {
      const { satisfied, unsatisfied } = multiFilter(fns, range(24))
      expect({
        satisfied: allToArray(...satisfied),
        unsatisfied: Array.from(unsatisfied)
      }).toEqual({
        satisfied: [
          [0, 4, 8, 12, 16, 20], // satisfy fns[0]
          [3, 6, 9, 15, 18, 21] // satisfy fns[1] but not fns[0]
        ],
        unsatisfied: [1, 2, 5, 7, 10, 11, 13, 14, 17, 19, 22, 23]
      })
    })

    it('does not leave any item behind', function () {
      const { satisfied, unsatisfied } = multiFilter(fns, range(24))
      expect(new Set(chain(...satisfied, unsatisfied))).toEqual(new Set(range(24)))
    })
  })
})
