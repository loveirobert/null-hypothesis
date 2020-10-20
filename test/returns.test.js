const {
  staticTimeSerieValues,
} = require('./data/static');

test('Testing returns on static time serie values', () => {
  expect(staticTimeSerieValues.length).toBe(10);
});
