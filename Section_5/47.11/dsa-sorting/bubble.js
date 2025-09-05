function bubbleSort(arr) {
  for (let i = arr.length-1; i > -1; i--) {
    for (let j = 0; j <= i-1; j++) {
      if (arr[j] > arr[j+1]) {
        let bubble = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = bubble;
      }
    }
  }
  return arr;
};

module.exports = bubbleSort;
