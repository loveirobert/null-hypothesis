const {
  findTValue,
} = require('./data/tValues');

const getAverage = (serie) => serie.reduce((a, b) => (a + b)) / serie.length;

const getVariance = (serie) => {
  const serieAvg = getAverage(serie);
  return serie.reduce((p, n) => p + (n - serieAvg) ** 2, 0);
};

const getCovariance = (series) => {
  const serieXAvg = getAverage(series.x);
  const serieYAvg = getAverage(series.y);
  const covariance = series.x.reduce((p, n, i) => p + (n - serieXAvg) * (series.y[i] - serieYAvg), 0);
  return {
    covariance,
    serieXAvg,
    serieYAvg,
  };
};

const getErrors = (series, regression) => {
  const { a, b } = regression;
  return series.x.map((x, i) => series.y[i] - (a + x * b));
};

const getMse = (series, regression) => {
  const errors = getErrors(series, regression);
  return errors.reduce((p, n) => p + n ** 2, 0) / (series.x.length - 2);
};

const getLinearRegressionParameters = (series, confidence = 0.01) => {
  const variance = getVariance(series.x);
  const { covariance, serieXAvg, serieYAvg } = getCovariance(series);
  const b = covariance / variance;
  const a = serieYAvg - b * serieXAvg;

  const regression = {
    b,
    a,
  };

  const t0Input = getMse(series, regression) / variance;
  const t0 = t0Input === 0 ? Infinity : b / ((t0Input) ** (0.5));

  const tValue = findTValue('doubleSided', confidence, series.x.length - 2);

  return {
    t0,
    acceptB: t0 > tValue,
    ...regression,
  };
};

module.exports = {
  getAverage,
  getVariance,
  getCovariance,
  getLinearRegressionParameters,
  getErrors,
  getMse,
};
