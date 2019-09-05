import { asyncIterableCurry } from '../../internal/async-iterable';
import asyncIterableSplitWith from './async-iterable-split-with';

export default asyncIterableCurry(asyncIterableSplitWith);
