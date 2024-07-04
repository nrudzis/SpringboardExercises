function sortedFrequency(arr, num) {
  let left = 0;
  let right = arr.length - 1;

  // binary search for first instance of num
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === num && (arr[mid - 1] < num || mid === 0)) {
      let firstInst = mid;
      left = mid;
      right = arr.length - 1;

      // binary search for last instance of num
      while (left <= right) {
        mid = Math.floor((left + right) / 2);
        if (arr[mid] === num && (arr[mid + 1] > num || mid === arr.length - 1)) {
          let lastInst = mid;
          return lastInst - firstInst + 1;
        } else if (arr[mid] > num) {
          right = mid - 1;
        } else {
          left = mid;
        }
      }
    // if mid is the index of a number < num, search to the right
    } else if (arr[mid] < num) {
      left = mid + 1;

    // otherwise, search to the left
    } else {
      right = mid;
    }
  }
  return -1;
}

module.exports = sortedFrequency;
