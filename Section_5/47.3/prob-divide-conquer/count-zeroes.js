function countZeroes(arr) {
  let zeroCount = 0;
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === 1) {
      left = mid + 1;
    } else {
      zeroCount += right - mid + 1;
      right = mid - 1;
    }
  }
  return zeroCount;
}

module.exports = countZeroes
