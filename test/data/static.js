const getStaticTimeSerieValues = (staticTimeSerieLength) => [...Array(staticTimeSerieLength).keys()].map((key) => key + 1);
const correlationBaseValues = {
  x: [
    1,
    2,
    3,
    4,
    5,
  ],
  y: [
    1,
    2,
    3,
    4,
    5,
  ],
};

module.exports = {
  getStaticTimeSerieValues,
  correlationBaseValues,
};
