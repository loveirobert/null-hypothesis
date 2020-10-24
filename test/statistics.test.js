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
  getMse,
  getLogAverage,
  getLogCovariance,
  getLogarithmicRegressionParameters,
} = require('../src/statistics');

describe('Basic statistical functions', () => {
  test('Calculating average', () => {
    expect(getAverage([1, 2, 3])).toBe(2);
  });

  test('Calculating log average', () => {
    expect(getLogAverage([1, 2, 3])).toBe(0.930586489742685);
  });

  test('Calculating variance', () => {
    expect(getVariance(correlationBaseValues.x)).toBe(10);
  });

  test('Calculating covariance', () => {
    expect(getCovariance(correlationBaseValues).covariance).toBe(10);
  });

  test('Calculating log covariance', () => {
    expect(getLogCovariance(correlationBaseValues).covariance).toBe(3.912023005428146);
  });

  test('Calculating linear regression parameters', () => {
    const {
      a, b, t0, acceptB,
    } = getLinearRegressionParameters(correlationBaseValues);
    expect(a).toBe(0);
    expect(b).toBe(1);
    expect(t0).toBe(Infinity);
    expect(acceptB).toBe(true);
  });

  test('Calculating log regression parameters', () => {
    const {
      a, b, t0, acceptB,
    } = getLogarithmicRegressionParameters(correlationBaseValues);
    expect(b).toBe(2.1548040409852938);
    expect(a).toBe(0.5058178810968452);
    expect(t0).toBe(0.523864618960621);
    expect(acceptB).toBe(false);
  });

  test('Calculating linear regression parameters with different interceptor', () => {
    const modifiedCorrelationBaseValues = {
      x: [...correlationBaseValues.x],
      y: correlationBaseValues.y.map((y) => y + 1),
    };
    const {
      a, b, t0, acceptB,
    } = getLinearRegressionParameters(modifiedCorrelationBaseValues);
    expect(a).toBe(1);
    expect(b).toBe(1);
    expect(t0).toBe(Infinity);
    expect(acceptB).toBe(true);
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

  test('Calculating linear regression mean squared error', () => {
    const modifiedCorrelationBaseValues = {
      x: [...correlationBaseValues.x],
      y: correlationBaseValues.y.map((y) => y + getRandom(1, 2)),
    };
    const linearRegression = getLinearRegressionParameters(modifiedCorrelationBaseValues);
    const mse = getMse(modifiedCorrelationBaseValues, linearRegression);
    expect(mse).toBeGreaterThan(0);
    expect(mse).toBeLessThan(1);
  });

  test('Accepting slope (b) value', () => {
    const modifiedCorrelationBaseValues = {
      x: [...correlationBaseValues.x],
      y: correlationBaseValues.y.map((y) => y + getRandom(1, 2)),
    };
    const linearRegression = getLinearRegressionParameters(modifiedCorrelationBaseValues);
    expect(linearRegression.acceptB).toBe(true);
  });

  test('Accepting slope (b) value', () => {
    const modifiedCorrelationBaseValues = {
      x: [...correlationBaseValues.x],
      y: correlationBaseValues.y.map((y) => y + getRandom(0, 1000)),
    };
    const linearRegression = getLinearRegressionParameters(modifiedCorrelationBaseValues);
    expect(linearRegression.acceptB).toBe(false);
  });
});
