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

const getLinearRegressionParameters = (series) => {
  const variance = getVariance(series.x);
  const { covariance, serieXAvg, serieYAvg } = getCovariance(series);
  const b = covariance / variance;
  const a = serieYAvg - b * serieXAvg;
  return {
    b,
    a,
  };
};

module.exports = {
  getAverage,
  getVariance,
  getCovariance,
  getLinearRegressionParameters,
};
