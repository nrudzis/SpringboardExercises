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

module.exports = OPERATIONS;
