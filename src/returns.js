const getSimpleReturns = (serie) => serie.reduce((p, n, i, src) => {
  if (i < src.length - 1) p[i] = (src[i + 1] - n) / n;
  return p;
}, []);

const getContinuouslyCompoundedReturns = (serie) => serie.reduce((p, n, i, src) => {
  if (i < src.length - 1) p[i] = 1 + Math.log10(src[i + 1] / n);
  return p;
}, []);

module.exports = {
  getSimpleReturns,
  getContinuouslyCompoundedReturns,
};
