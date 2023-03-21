const express = require('express');
const ExpressError = require('./expressError');

const app = express();

app.use(express.json());

const OPERATIONS = {
  meanCalc: function(nums) {
    const numsArr = nums.split(',').map(num => parseFloat(num));
    const mean = numsArr.reduce((total, current) => total + current) / numsArr.length;
    return mean;
  },
  medianCalc: function(nums) {
    let median;
    const numsArr = nums.split(',').map(num => parseFloat(num)).sort((a, b) => a - b);
    const numsArrLen = numsArr.length;
    if (numsArrLen % 2 === 0) {
      median = (numsArr[numsArrLen / 2 - 1] + numsArr[numsArrLen / 2]) / 2;
    } else {
      median = numsArr[Math.floor(numsArrLen / 2)];
    }
    return median;
  },
  modeCalc: function(nums) {
    const numsArr = nums.split(',').map(num => parseFloat(num)).sort((a, b) => a - b);
    const numsArrCounts = {};
    numsArr.forEach(num => !numsArrCounts[num] ? numsArrCounts[num] = 1 : numsArrCounts[num]++);
    let mode;
    const numsArrCountsVals = Object.values(numsArrCounts);
    const numsArrCountsKeys = Object.keys(numsArrCounts);
    const maxVal = Math.max(...numsArrCountsVals);
    if (numsArr.length === numsArrCountsVals.length) {
      mode = null;
    } else if (numsArrCountsVals.filter(val => val === maxVal).length === 1) {
      mode = parseFloat(numsArrCountsKeys.find(key => numsArrCounts[key] === maxVal));
    } else {
      mode = numsArrCountsKeys.filter(key => numsArrCounts[key] === maxVal).map(num => parseFloat(num));
    }
    return mode;
  }
}

app.get('/:operation', (req, res, next) => {
  try {
    const operation = req.params.operation;
    if (['mean', 'median', 'mode'].indexOf(operation) < 0) throw new ExpressError('Not Found', 404);
    const { nums } = req.query;
    if (!nums || nums.split(',').length < 2 || !nums.split(',').every(elem => !isNaN(elem))) throw new ExpressError('Bad Request', 400);
    const result = OPERATIONS[`${operation}Calc`](nums);
    return res.json({ 'operation': operation, 'value': result });
  } catch (err) {
    return next(err);
  }
});

app.use((req, res, next) => {
  const notFoundError = new ExpressError('Not Found', 404);
  return next(notFoundError);
});

app.use((err, req, res, next) => {
  let status = err.status || 500;
  let msg = err.msg;
  return res.status(status).json({
    error: {msg, status}
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
