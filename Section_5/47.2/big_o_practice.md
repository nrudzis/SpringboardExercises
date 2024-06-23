### Big O Notation Practice


# Step One: Simplifying Expressions

1. O(n + 10)
2. O(100 * n)
3. O(25)
4. O(n^2 + n^3)
5. O(n + n + n + n)
6. O(1000 * log(n) + n)
7. O(1000 * n * log(n) + n)
8. O(2^n + n^2)
9. O(5 + 3 + 1)
10. O(n + n^(1/2) + n^2 n * log(n)^10)


# Step Two: Calculating Time Complexity

```
function logUpTo(n) {
  for (let i = 1; i <= n; i++) {
    console.log(i);
  }
}
```
Time complexity:

```
function logAtLeast10(n) {
  for (let i = 1; i <= Math.max(n, 10); i++) {
    console.log(i);
  }
}
```
Time complexity:

```
function logAtMost10(n) {
  for (let i = 1; i <= Math.min(n, 10); i++) {
    console.log(i);
  }
}
```
Time complexity:

```
function onlyElementsAtEvenIndex(array) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    if (i % 2 === 0) {
      newArray.push(array[i]);
    }
  }
  return newArray;
}
```
Time complexity:

```
function subtotals(array) {
  let subtotalArray = [];
  for (let i = 0; i < array.length; i++) {
    let subtotal = 0;
    for (let j = 0; j <= i; j++) {
      subtotal += array[j];
    }
    subtotalArray.push(subtotal);
  }
  return subtotalArray;
}
```
Time complexity:

```
function vowelCount(str) {
  let vowelCount = {};
  const vowels = "aeiouAEIOU";

  for (let char of str) {
    if(vowels.includes(char)) {
      if(char in vowelCount) {
        vowelCount[char] += 1;
      } else {
        vowelCount[char] = 1;
      }
    }
  }

  return vowelCount;
}
```
Time complexity:


# Part 3 - short answer

1. True or false: n^2 + n is O(n^2).
2. True or false: n^2 * n is O(n^3).
3. True or false: n^2 + n is O(n).
4. What’s the time complexity of the .indexOf array method?
5. What’s the time complexity of the .includes array method?
6. What’s the time complexity of the .forEach array method?
7. What’s the time complexity of the .sort array method?
8. What’s the time complexity of the .unshift array method?
9. What’s the time complexity of the .push array method?
10. What’s the time complexity of the .splice array method?
11. What’s the time complexity of the .pop array method?
12. What’s the time complexity of the Object.keys() function?
13. What’s the space complexity of the Object.keys() function?
