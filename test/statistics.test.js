const {
  correlationBaseValues,
  incomeExampleValues,
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
  decorateLogSerie,
  getExpRegressionParameters,
} = require('../src/statistics');

describe('Basic statistical functions', () => {
  test('Calculating average', () => {
    expect(getAverage([1, 2, 3])).toBe(2);
  });

  test('Calculating log average', () => {
    expect(getLogAverage([1, 2, 3])).toBe(0.930586489742685);
  });

  test('Calculating log serie', () => {
    const logSerie = decorateLogSerie(incomeExampleValues);
    const logX = [
      3.6838669122903918,
      3.763522997109702,
      3.832979798087693,
      3.906004933102583,
      3.966511190712216,
      4.00369019395397,
      4.027135812528651,
      4.120661870539474,
      4.089332020398556,
    ];
    const logY = [
      3.653252276470785,
      3.793239469438179,
      3.6988297849671046,
      3.8264651170664994,
      3.9219733362813143,
      3.8022081394209395,
      3.9019726695746444,
      3.9740583963475986,
      3.9396381724611196,
    ];
    logSerie.logX.forEach((x, i) => expect(x).toBe(logX[i]));
    logSerie.logY.forEach((y, i) => expect(y).toBe(logY[i]));
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

  test('Calculating exp regression parameters', () => {
    const logSerie = decorateLogSerie(incomeExampleValues);
    const {
      a, b, t0, acceptB,
    } = getExpRegressionParameters(logSerie);

    expect(a).toBe(3.5071758437690583);
    expect(b).toBe(0.656001876257869);
    expect(t0).toBe(5.577027148348103);
    expect(acceptB).toBe(true);
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

  test('Accepting slope (b) value for linear regression', () => {
    const modifiedCorrelationBaseValues = {
      x: [...correlationBaseValues.x],
      y: correlationBaseValues.y.map((y) => y + getRandom(1, 2)),
    };
    const linearRegression = getLinearRegressionParameters(modifiedCorrelationBaseValues);
    expect(linearRegression.acceptB).toBe(true);
  });

  test('Accepting slope (b) value for linear regression', () => {
    const modifiedCorrelationBaseValues = {
      x: [...correlationBaseValues.x],
      y: correlationBaseValues.y.map((y) => y + getRandom(0, 1000)),
    };
    const linearRegression = getLinearRegressionParameters(modifiedCorrelationBaseValues);
    expect(linearRegression.acceptB).toBe(false);
  });

  test('Rejecting slope (b) value for exponential regression', () => {
    const modifiedIncomeExampleValues = {
      x: [...incomeExampleValues.x],
      y: incomeExampleValues.y.map((y) => y + getRandom(1, 100)),
    };
    const logSerie = decorateLogSerie(modifiedIncomeExampleValues);
    const {
      acceptB,
    } = getExpRegressionParameters(logSerie);
    expect(acceptB).toBe(false);
  });
});
