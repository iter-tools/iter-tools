const makeCanTakeAny = buffers => () => {
  return buffers.find(buffer => buffer.canTake());
};

export default makeCanTakeAny;
