import compose from '../compose/compose';
import $zip from '../$zip/$zip';
import $filter from '../$filter/$filter';
import $map from '../$map/$map';

function $compress(iterable, compress) {
  return compose(
    $map(entry => entry[0]),
    $filter(entry => entry[1]),
  )($zip(iterable, compress));
}

export default $compress;
