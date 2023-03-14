const express = require('express');

const app = express();

const operations = {
  mean: function(nums) {
    const numsArr = nums.split(',').map(numStr => parseFloat(numStr));
    return numsArr.reduce((total, current) => total + current) / numsArr.length;
  },
  median: 'MEDIAN',
  mode: 'MODE'
}

app.get('/:operation', (req, res) => {
  const operation = req.params.operation;
  const { nums } = req.query;
  const result = operations[operation](nums)
  return res.send(result.toString());
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
