/** product: calculate the product of an array of numbers. */

function product(nums) {
  if (nums.length === 0) return 1;
  return nums[0] * product(nums.slice(1));
}

/** longest: return the length of the longest word in an array of words. */

function longest(words) {
  if (words.length === 1) {
    return words[0].length;
  } else if (words[0].length > words[1].length) {
    words.splice(1,1);
    return longest(words);
  } else {
    return longest(words.slice(1));
  }
}

/** everyOther: return a string with every other letter. */

function everyOther(str) {
  if (str.length < 2) return str;
  return str[0] + everyOther(str.slice(2));
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str) {
  if (str[0] === str[str.length - 1]) {
    if (str.length <= 2) {
      return true;
    } else {
      return isPalindrome(str.slice(1, -1));
    }
  }
  else {
    return false;
  }
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val) {
  if (arr.length === 0) return -1;
  const elem = arr[0];
  if (val === elem) {
    return 0;
  } else {
    const result = findIndex(arr.slice(1), val);
    return result === -1
      ? -1
      : 1 + result;
  }
}

/** revString: return a copy of a string, but in reverse. */

function revString(str) {
  if (str.length === 1) {
    return str;
  } else {
    return revString(str.slice(1)) + str.charAt(0);
  }
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let strings = [];
  for (const key in obj) {
    const val = obj[key];
    if (typeof val === "object" && val !== null) {
      strings = [...strings, ...gatherStrings(val)];
    } else {
      if (typeof val === "string") {
        strings.push(val);
      }
    }
  }
  return strings;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val) {
  if (arr.length === 0) return -1;
  const mid = Math.floor(arr.length / 2);
  if (arr[mid] === val) return mid;
  else if (arr[mid] < val) {
    const result = binarySearch(arr.slice(mid + 1), val);
    return result === -1
      ? -1
      : mid + 1 + result;
  } else {
    return binarySearch(arr.slice(0, mid), val);
  }
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
