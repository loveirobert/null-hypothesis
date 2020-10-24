const {
  correlationBaseValues,
} = require('./data/static');

const {
  getRandom,
} = require('./utils/helpers');

const {
  getAverage,
  getVariance,
  getCovariance,
  getLinearRegressionParameters,
  getErrors,
} = require('../src/statistics');

describe('Basic statistical functions', () => {
  test('Calculating average', () => {
    expect(getAverage([1, 2, 3])).toBe(2);
  });

  test('Calculating variance', () => {
    expect(getVariance(correlationBaseValues.x)).toBe(10);
  });

  test('Calculating covariance', () => {
    expect(getCovariance(correlationBaseValues).covariance).toBe(10);
  });

  test('Calculating linear regression parameters', () => {
    const {
      a, b,
    } = getLinearRegressionParameters(correlationBaseValues);
    expect(a).toBe(0);
    expect(b).toBe(1);
  });

  test('Calculating linear regression parameters', () => {
    const modifiedCorrelationBaseValues = {
      x: [...correlationBaseValues.x],
      y: correlationBaseValues.y.map((y) => y + 1),
    };
    const {
      a, b,
    } = getLinearRegressionParameters(modifiedCorrelationBaseValues);
    expect(a).toBe(1);
    expect(b).toBe(1);
  });

  test('Calculating linear regression errors', () => {
    const modifiedCorrelationBaseValues = {
      x: [...correlationBaseValues.x],
      y: correlationBaseValues.y.map((y) => y + getRandom(1, 2)),
    };
    const linearRegression = getLinearRegressionParameters(modifiedCorrelationBaseValues);
    const errors = getErrors(modifiedCorrelationBaseValues, linearRegression);
    errors.forEach((e) => expect(e).not.toBe(0));
  });
});
