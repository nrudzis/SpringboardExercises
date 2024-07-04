function findRotatedIndex(arr, num) {
  let left = 0;
  let right = arr.length - 1;

  // binary search for index of first element of unrotated array
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] < arr[mid - 1]) {

      // find section of array num is in
      if (arr[0] <= num) {
        left = 0;
        right = mid - 1;
      } else {
        left = mid;
        right = arr.length - 1;
      }

      //binary search for num in section
      while (left <= right) {
        mid = Math.floor((left + right) / 2);
        if (arr[mid] < num) {
          left = mid + 1;
        } else if (arr[mid] > num) {
          right = mid - 1;
        } else {
          return mid;
        }
      }

    // if mid is the index of a number > than the number at index right, search to the right
    } else if (arr[mid] > arr[right]) {
      left = mid + 1;

    // otherwise, search to the left
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

module.exports = findRotatedIndex
