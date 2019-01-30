import curry from './internal/curry'
import map from './map'
import zip from './zip'

function mapFunc (functions, inputs) {
  return map(([func, input]) => func(input), zip(functions, inputs))
}

export default curry(mapFunc)
