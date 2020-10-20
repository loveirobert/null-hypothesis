const getSimpleReturns = (serie) => serie.reduce((p, n, i, src) => {
  if (i < src.length - 1) p[i] = (src[i + 1] - n) / n;
  return p;
}, []);

const getContinuouslyCompoundedReturns = (serie) => {
  const newSerie = serie;
  return newSerie;
};

module.exports = {
  getSimpleReturns,
  getContinuouslyCompoundedReturns,
};
