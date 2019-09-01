import { map } from '../../$map/map';
import raceTo from './race-to';

const makeCanTakeAny = buffers => () => {
  return raceTo(
    Boolean,
    false,
    map(buffers, async buffer => ((await buffer.canTake()) ? buffer : null)),
  );
};

export default makeCanTakeAny;
