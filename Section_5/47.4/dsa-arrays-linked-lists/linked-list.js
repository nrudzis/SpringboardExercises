/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }
    newNode.next = this.head;
    this.head = newNode;
    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    const poppedVal = this.tail.val;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      this.length = 0;
    } else {
      let currentNode = this.head;
      while (currentNode.next !== this.tail) {
        currentNode = currentNode.next;
      }
      currentNode.next = null;
      this.tail = currentNode;
      this.length -= 1;
    }
    return poppedVal;
  }

//  /** shift(): return & remove first item. */
//
//  shift() {
//
//  }
//
//  /** getAt(idx): get val at idx. */
//
//  getAt(idx) {
//
//  }
//
//  /** setAt(idx, val): set val at idx to val */
//
//  setAt(idx, val) {
//
//  }
//
//  /** insertAt(idx, val): add node w/val before idx. */
//
//  insertAt(idx, val) {
//
//  }
//
//  /** removeAt(idx): return & remove item at idx, */
//
//  removeAt(idx) {
//
//  }
//
//  /** average(): return an average of all values in the list */
//
//  average() {
//    
//  }
}

module.exports = LinkedList;
