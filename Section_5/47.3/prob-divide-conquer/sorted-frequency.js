function sortedFrequency(arr, num) {
  let left = 0;
  let right = arr.length - 1;
  let firstInstance = -1;
  let lastInstance = -1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // if mid is the index of num, perform binary search on each side
    if (arr[mid] === num) {
      firstInstance = mid;
      lastInstance = mid;
      let firstArrLeft = left;
      let firstArrRight = mid - 1;
      let secondArrLeft = mid + 1;
      let secondArrRight = right;

      // binary search for firstInstance
      while(firstArrLeft <= firstArrRight) {
        let firstArrMid = Math.floor((firstArrLeft + firstArrRight) / 2);
        if (arr[firstArrMid] === num) {
          firstInstance = firstArrMid;
          firstArrRight = firstArrMid - 1;
        } else {
          firstArrLeft = firstArrMid + 1;
        }
      }

      // binary search for lastInstance
      while(secondArrLeft <= secondArrRight) {
        let secondArrMid = Math.floor((secondArrLeft + secondArrRight) / 2);
        if (arr[secondArrMid] === num) {
          lastInstance = secondArrMid;
          secondArrLeft = secondArrMid + 1;
        } else {
          secondArrRight = secondArrMid - 1;
        }
      }
      break;
    }

    // if mid is the index of a number < num, search to the right
    else if (arr[mid] < num) {
      left = mid + 1;

    // otherwise, search to the left
    } else {
      right = mid - 1;
    }
  } if (firstInstance === -1 || lastInstance === -1) {
    return -1;
  }
  return lastInstance - firstInstance + 1;
}

module.exports = sortedFrequency;
