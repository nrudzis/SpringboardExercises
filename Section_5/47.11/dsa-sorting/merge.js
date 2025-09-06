function merge(arr1, arr2) {
  let partArr1 = [...arr1].reverse();
  let partArr2 = [...arr2].reverse();
  let mergedArr = [];
  while (mergedArr.length < (arr1.length + arr2.length)) {
    if (partArr1.length === 0) {
      partArr2 = partArr2.reverse();
      return [...mergedArr, ...partArr2];
    } else if (partArr2.length === 0) {
      partArr1 = partArr1.reverse();
      return [...mergedArr, ...partArr1];
    } else {
      let num1 = partArr1[partArr1.length-1];
      let num2 = partArr2[partArr2.length-1];
      if (num1 < num2) {
        mergedArr.push(num1);
        partArr1.pop();
      } else {
        mergedArr.push(num2);
        partArr2.pop();
      }
    }
  }
  return mergedArr;
}

//function mergeSort() {}

module.exports = { merge };
//module.exports = { merge, mergeSort };
