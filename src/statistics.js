const {
  findTValue,
} = require('./data/tValues');

const decorateLogSerie = (serie) => serie.x.reduce((p, n, i) => ({
  x: serie.x,
  y: serie.y,
  logX: [...(p.logX || []), Math.log(n)],
  logY: [...(p.logY || []), Math.log(serie.y[i])],
}), {});

const getAverage = (serie) => serie.reduce((a, b) => (a + b)) / serie.length;

const getLogAverage = (serie) => serie.reduce((a, b) => (a + Math.log(b))) / serie.length;

const getVariance = (serie) => {
  const serieAvg = getAverage(serie);
  return serie.reduce((p, n) => p + (n - serieAvg) ** 2, 0);
};

const getLogVariance = (serie) => {
  const serieLogAvg = getLogAverage(serie);
  return serie.reduce((p, n) => p + (Math.log(n) - serieLogAvg) ** 2, 0);
};

const getCovariance = (series, mode) => {
  const serieXAvg = getAverage(mode === 'log' ? series.logX : series.x);
  const serieYAvg = getAverage(mode === 'log' ? series.logY : series.y);
  const covariance = (mode === 'log' ? series.logX : series.x)
    .reduce((p, n, i) => p + (n - serieXAvg) * ((mode === 'log' ? series.logY[i] : series.y[i]) - serieYAvg), 0);
  return {
    covariance,
    serieXAvg,
    serieYAvg,
  };
};

const getLogCovariance = (series) => {
  const serieXAvg = getLogAverage(series.x);
  const serieYAvg = getAverage(series.y);
  const covariance = series.x.reduce((p, n, i) => p + (Math.log(n) - serieXAvg) * (series.y[i] - serieYAvg), 0);
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

const getLogarithmicRegressionParameters = (series, confidence = 0.01) => {
  const variance = getLogVariance(series.x);
  const { covariance, serieXAvg, serieYAvg } = getLogCovariance(series);
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

const getExpErrors = (series, regression) => {
  const { a, b } = regression;
  return series.x.map((x, i) => series.y[i] - (a * x ** b));
};

const getExpMse = (series, regression) => {
  const errors = getExpErrors(series, regression);
  return errors.reduce((p, n) => p + n ** 2, 0) / (series.x.length - 2);
};

const getExpRegressionParameters = (series, confidence = 0.01) => {
  const variance = getVariance(series.logX);
  const normalVariance = getVariance(series.x);
  const { covariance, serieXAvg, serieYAvg } = getCovariance(series, 'log');
  const b = covariance / variance;
  const a = serieYAvg - b * serieXAvg;

  const regression = {
    b,
    a: Math.exp(a),
  };

  const t0Input = getExpMse(series, regression) / normalVariance;
  const t0 = t0Input === 0 ? Infinity : b / ((t0Input) ** (0.5));

  const tValue = findTValue('doubleSided', confidence, series.x.length - 2);

  return {
    t0,
    acceptB: t0 > tValue,
    ...regression,
  };
};

module.exports = {
  decorateLogSerie,
  getAverage,
  getVariance,
  getCovariance,
  getLinearRegressionParameters,
  getErrors,
  getMse,
  getLogAverage,
  getLogCovariance,
  getLogarithmicRegressionParameters,
  getExpRegressionParameters,
};
