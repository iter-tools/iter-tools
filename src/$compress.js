import compose from './compose';
import $zip from './$zip';
import $filter from './$filter';
import $map from './$map';

function $compress(iterable, compress) {
  return compose(
    $map(entry => entry[0]),
    $filter(entry => entry[1]),
  )($zip(iterable, compress));
}

export default $compress;
