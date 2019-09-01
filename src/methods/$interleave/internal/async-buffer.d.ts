interface AsyncInterleaveBuffer<T> {
  take(): Promise<T>;
  canTake(): Promise<boolean>;
}

export default AsyncInterleaveBuffer;
