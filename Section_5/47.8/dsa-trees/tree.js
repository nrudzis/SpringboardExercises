/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    let queue = [this.root];
    if (queue[0] === null) return 0;
    let sum = 0;
    while (queue.length) {
      let current = queue.pop();
      sum = sum + current.val;
      for (let child of current.children) {
        queue.push(child);
      }
    }
    return sum;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    let queue = [this.root];
    if (queue[0] === null) return 0;
    let evenCount = 0;
    while (queue.length) {
      let current = queue.pop();
      if (current.val % 2 === 0) {
        evenCount++;
      }
      for (let child of current.children) {
        queue.push(child);
      }
    }
    return evenCount;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    let queue = [this.root];
    if (queue[0] === null) return 0;
    let countGreater = 0;
    while (queue.length) {
      let current = queue.pop();
      if (current.val > lowerBound) {
        countGreater++;
      }
      for (let child of current.children) {
        queue.push(child);
      }
    }
    return countGreater;
  }
}

module.exports = { Tree, TreeNode };
