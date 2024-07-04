function findRotationCount(arr) {
  let left = 0;
  let right = arr.length - 1;

  // binary search for index of first element of unrotated array
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < arr[mid - 1]) {
      return mid;

    // if mid is the index of a number > than the number at index right, search to the right
    } else if (arr[mid] > arr[right]) {
      left = mid + 1;

    // otherwise, search to the left
    } else {
      right = mid - 1;
    }
  }
  return 0;
}

module.exports = findRotationCount
