const {
  staticTimeSerieValues,
} = require('./data/static');

const {
  getSimpleReturns,
  getContinuouslyCompoundedReturns,
} = require('../src/returns');

describe('Return generators', () => {
  test('Generating simple returns on static time serie values', () => {
    const simpleReturns = getSimpleReturns(staticTimeSerieValues);
    const expectedSimpleReturns = [1, 0.5, 0.3333333333333333, 0.25, 0.2, 0.16666666666666666, 0.14285714285714285, 0.125, 0.1111111111111111];
    expect(staticTimeSerieValues.length).toBe(10);
    expect(simpleReturns.length).toBe(9);
    simpleReturns.forEach((element, i) => {
      expect(element).toBe(expectedSimpleReturns[i]);
    });
  });

  test('Generating continuously compounded returns on static time serie values', () => {
    const continuouslyCompoundedReturns = getContinuouslyCompoundedReturns(staticTimeSerieValues);
    expect(staticTimeSerieValues.length).toBe(10);
    expect(continuouslyCompoundedReturns.length).toBe(10);
  });
});
