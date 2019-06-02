import { $Promise } from '../$iterable';

interface $InterleaveBuffer<T> {
  take(): $Promise<T>;
  canTake(): $Promise<boolean>;
}

export default $InterleaveBuffer;
