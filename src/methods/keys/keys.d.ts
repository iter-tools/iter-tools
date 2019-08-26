import { GeneratorIterator } from '../../internal/iterable';

declare function keys(obj: { [id: string]: any } | null | undefined): GeneratorIterator<string>;

export default keys;
