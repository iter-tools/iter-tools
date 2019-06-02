import map from '../../map';
import raceTo from '../race-to';

const makeCanTakeAny = buffers => () => {
  return raceTo(
    Boolean,
    false,
    map(async buffer => ((await buffer.canTake()) ? buffer : null), buffers),
  );
};

export default makeCanTakeAny;
