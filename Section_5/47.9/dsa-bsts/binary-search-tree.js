class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }
    let current = this.root;
    while (true) {
      if (current.val === val) {
        return this;
      } else if (current.val > val) {
        if (current.left) {
          current = current.left;
        } else {
          current.left = new Node(val);
          return this;
        }
      } else {
        if (current.right) {
          current = current.right;
        } else {
          current.right = new Node(val);
          return this;
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    } else {
      const recursor = (val, node) => {
        if (node.val === val) return;
        if (node.val > val) {
          if (node.left) {
            recursor(val, node.left);
          } else {
            node.left = new Node(val);
          }
        } else {
          if (node.right) {
            recursor(val, node.right);
          } else {
            node.right = new Node(val);
          }
        }
      };
      recursor(val, this.root);
    }
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let match;
    if (this.root === null) return match;
    let current = this.root;
    while (true) {
      if (current.val === val) {
        match = current;
        return match;
      } else if (current.val > val) {
        if (current.left) {
          current = current.left;
        } else {
          return match;
        }
      } else {
        if (current.right) {
          current = current.right;
        } else {
          return match;
        }
      }
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    if (this.root === null) return undefined;
    const recursor = (val, node) => {
      if (node.val === val) {
        return node;
      } else if (node.val > val) {
        if (node.left) {
          return recursor(val, node.left);
        } else {
          return undefined;
        }
      } else {
        if (node.right) {
          return recursor(val, node.right);
        } else {
          return undefined;
        }
      }
    }
    return recursor(val, this.root);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {

  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {

  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {

  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {

  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    
  }
}

module.exports = BinarySearchTree;
