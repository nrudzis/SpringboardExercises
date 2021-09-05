//  # Quick Question #1
new Set([1,1,2,2,3,4]); // {1,2,3,4}

//  # Quick Question #2
[...new Set("referee")].join(""); // "ref"

//  # Quick Question #3
let m = new Map();
m.set([1,2,3]), true);
m.set([1,2,3], false);
/*
{
0: {Array(3) => true}
1: {Array(3) => false}
}
*/

//  # hasDuplicate
const hasDuplicate = arr => arr.length !== [...new Set(arr)].length;

//  # vowelCount
const vowelCount = (str) => {
  const vowels = 'aeiou';
  let m = new Map();
  for(let c of str.toLowerCase()) {
    if(vowels.indexOf(c) > -1) {
      let instances = 1;
      if(m.has(c)) {
        instances = m.get(c);
        instances++;
        m.set(c, instances);
      } else {
        m.set(c, instances);
      }
    }
  }
  return m;
}
