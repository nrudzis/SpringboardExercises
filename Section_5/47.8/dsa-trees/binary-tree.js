/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (this.root === null) return 0;
    let queue = [{ node: this.root, depth: 1 }];
    while (queue.length) {
      let { node, depth } = queue.shift();
      if (node.left === null && node.right === null) {
        return depth;
      }
      if (node.left) queue.push({ node: node.left, depth: depth + 1 });
      if (node.right) queue.push({ node: node.right, depth: depth + 1 });
    }
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (this.root === null) return 0;
    let stack = [{ node: this.root, depth: 1 }];
    let max = 0;
    while (stack.length) {
      let { node, depth } = stack.pop();
      if (node.left === null && node.right === null) {
        max = Math.max(max, depth);
      }
      if (node.left) stack.push({ node: node.left, depth: depth + 1});
      if (node.right) stack.push({ node: node.right, depth: depth + 1});
    }
    return max;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if (this.root === null) return 0;
    function pathSum(node) {
      if (node === null) return { localMax: 0, globalMax: null };
      const left = pathSum(node.left);
      const right = pathSum(node.right);
      const currentPathSum = node.val + Math.max(0, left.localMax) + Math.max(0, right.localMax);
      const currentMaxSum = Math.max(
        left.globalMax === null ? currentPathSum : left.globalMax,
        right.globalMax === null ? currentPathSum : right.globalMax,
        currentPathSum
      );
      return {
        localMax: node.val + Math.max(0, left.localMax, right.localMax),
        globalMax: currentMaxSum
      };
    }
    return pathSum(this.root).globalMax;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (this.root === null) return null;
    let match = null;
    let stack = [this.root];
    while (stack.length) {
      let current = stack.pop();
      if (match) {
        if (current.val < match && current.val > lowerBound) {
          match = current.val;
        }
      } else {
        if (current.val > lowerBound) {
          match = current.val;
        }
      }
      if (current.left) stack.push(current.left);
      if (current.right) stack.push(current.right);
    }
    return match;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
