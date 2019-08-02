interface InterleaveBuffer<T> {
  take(): T | undefined;
  canTake(): this is TakableInterleaveBuffer<T>;
}

interface TakableInterleaveBuffer<T> extends InterleaveBuffer<T> {
  take(): T;
}

export default InterleaveBuffer;
