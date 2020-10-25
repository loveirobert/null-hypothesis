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

const incomeExampleValues = {
  x: [
    39.8,
    43.1,
    46.2,
    49.7,
    52.8,
    54.8,
    56.1,
    61.6,
    59.7,
  ],
  y: [
    38.6,
    44.4,
    40.4,
    45.9,
    50.5,
    44.8,
    49.5,
    53.2,
    51.4,
  ],
};

module.exports = {
  getStaticTimeSerieValues,
  correlationBaseValues,
  incomeExampleValues,
};
