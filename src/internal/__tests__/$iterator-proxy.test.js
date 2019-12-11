import { $, $async, $await } from '../../../generate/async.macro';
import { $IteratorProxy } from '../$iterator-proxy';

describe($`IteratorProxy`, () => {
  it(
    'calls a return method if it exists',
    $async(() => {
      let returned = false;
      const source = {
        next: () => ({
          value: undefined,
          done: true,
        }),
        return: () => {
          returned = true;
          return { value: undefined, done: true };
        },
      };

      const proxy = new $IteratorProxy(source);
      $await(proxy.return());
      expect(returned).toBe(true);
    }),
  );

  it(
    'calls a throw method if it exists',
    $async(() => {
      let threw = false;
      const source = {
        next: () => ({
          value: undefined,
          done: true,
        }),
        throw: () => {
          threw = true;
          return { value: undefined, done: true };
        },
      };

      const proxy = new $IteratorProxy(source);
      $await(proxy.throw());
      expect(threw).toBe(true);
    }),
  );

  it(
    'returns done after its source is done',
    $async(() => {
      let i = -1;
      const source = {
        next() {
          i++;
          return {
            value: i === 3 ? undefined : i,
            done: i === 3,
          };
        },
      };

      const proxy = new $IteratorProxy(source);
      expect($await(proxy.next())).toEqual({ value: 0, done: false });
      expect($await(proxy.next())).toEqual({ value: 1, done: false });
      expect($await(proxy.next())).toEqual({ value: 2, done: false });
      expect($await(proxy.next())).toEqual({ value: undefined, done: true });
      expect($await(proxy.next())).toEqual({ value: undefined, done: true });
    }),
  );

  it(
    'returns the value passed to return',
    $async(() => {
      let i = -1;
      const source = {
        next() {
          i++;
          return {
            value: i === 3 ? undefined : i,
            done: i === 1,
          };
        },
      };

      const proxy = new $IteratorProxy(source);
      expect($await(proxy.next())).toEqual({ value: 0, done: false });
      expect($await(proxy.return())).toEqual({ value: undefined, done: true });
      expect($await(proxy.return(-1))).toEqual({ value: -1, done: true });
      expect($await(proxy.return(-2))).toEqual({ value: -2, done: true });
      expect($await(proxy.return())).toEqual({ value: undefined, done: true });
      expect($await(proxy.next())).toEqual({ value: undefined, done: true });
    }),
  );

  it(
    'allows throw to be caught',
    $async(() => {
      let i = 0;
      let caught = false;
      const source = new (class {
        next() {
          return {
            value: i++,
            done: false,
          };
        }

        throw() {
          const item = caught ? { value: undefined, done: true } : { value: i++, done: false };
          caught = true;
          return item;
        }
      })();

      const proxy = new $IteratorProxy(source);
      expect($await(proxy.next())).toEqual({ value: 0, done: false });
      expect($await(proxy.throw())).toEqual({ value: 1, done: false });
      expect($await(proxy.next())).toEqual({ value: 2, done: false });
      expect($await(proxy.throw())).toEqual({ value: undefined, done: true });
      expect($await(proxy.next())).toEqual({ value: undefined, done: true });
    }),
  );
});
