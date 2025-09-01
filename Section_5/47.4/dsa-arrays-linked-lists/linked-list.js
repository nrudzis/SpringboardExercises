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

  /** shift(): return & remove first item. */

  shift() {
    const shiftedVal = this.head.val;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      this.length = 0;
    } else {
      let newHeadNode = this.head.next;
      this.head = newHeadNode;
      this.length -= 1;
    }
    return shiftedVal;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx > this.length-1) {
      return false;
    } else if(idx === this.length-1) {
      return this.tail.val;
    } else {
      let current = this.head;
      let count = 0;
      while (count !== idx) {
        current = current.next;
        count = count++;
      }
      return current.val;
    }
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx > this.length-1) {
      return false;
    } else if (idx === this.length-1) {
      this.tail.val = val;
    } else {
      let current = this.head;
      let count = 0;
      while (count !== idx) {
        current = current.next;
        count = count++;
      }
      current.val = val;
    }
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx > this.length) return false;
    let newNode = new Node(val);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else if (idx === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let current = this.head.next;
      let count = 1;
      while (count !== idx-1) {
        current = current.next;
        count++;
      }
      if (idx === this.length) {
        this.tail = newNode;
      } else {
        newNode.next = current.next;
      }
      current.next = newNode;
    }
    this.length++;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    let removedVal;
    if (idx > this.length-1) {
      return false;
    } else if (this.length === 1) {
      removedVal = this.head.val;
      this.head = null;
      this.tail = null;
    } else if (this.length === 2) {
      if (idx === 0) {
        removedVal = this.head.val;
        this.head = this.tail;
      } else {
        removedVal = this.tail.val;
        this.tail = this.head;
      }
    } else {
      let current = this.head;
      let count = 0;
      while (count !== idx-1) {
        current = current.next;
        count++;
      }
      current.next = current.next.next;
      removedVal = current.next.val;
    }
    this.length--;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) {
      return 0;
    } else {
      let sum = 0;
      let current = this.head;
      while (current !== null) {
        sum = sum + current.val;
        current = current.next;
      }
      const avg = sum / this.length;
      return avg;
    }
  }
}

module.exports = LinkedList;
