const express = require('express');

const app = express();

app.use(express.json());

const OPERATIONS = {
  meanCalc: function(nums) {
    const numsArr = nums.split(',').map(num => parseFloat(num));
    const mean = numsArr.reduce((total, current) => total + current) / numsArr.length;
    return mean;
  },
  median: 'MEDIAN',
  mode: 'MODE'
}

app.get('/:operation', (req, res) => {
  const operation = req.params.operation;
  const { nums } = req.query;
  const result = OPERATIONS[`${operation}Calc`](nums);
  return res.json({ 'operation': operation, 'value': result });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
