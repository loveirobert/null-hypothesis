const staticTimeSerieLength = 10;
const staticTimeSerieValues = [...Array(staticTimeSerieLength).keys()].map((key) => key + 1);

module.exports = {
  staticTimeSerieValues,
};
