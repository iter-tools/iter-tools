import { regexpExec } from '../../..';

describe('regexpExec', () => {
  it('should find matches', () => {
    const re = /[0-9]{4}/;
    const iter = regexpExec(re, '10/2/2013, 03/03/2015 12/4/1997');
    const results = [];
    for (const [i] of iter) {
      results.push(i);
    }
    expect(results).toEqual(['2013', '2015', '1997']);
  });

  it('can be reused', () => {
    const re = /[0-9]{4}/;
    const iter = regexpExec(re, '10/2/2013, 03/03/2015 12/4/1997');
    const results = [];
    for (const [i] of iter) {
      results.push(i);
    }
    expect(results).toEqual(['2013', '2015', '1997']);
    const results2 = [];
    for (const [i] of iter) {
      results2.push(i);
    }
    expect(results2).toEqual(['2013', '2015', '1997']);
  });

  it('can be curried', () => {
    const re = /[0-9]{4}/;
    const iter = regexpExec(re);
    const results = [];
    for (const [i] of iter('10/2/2013, 03/03/2015 12/4/1997')) {
      results.push(i);
    }
    expect(results).toEqual(['2013', '2015', '1997']);
  });
});
