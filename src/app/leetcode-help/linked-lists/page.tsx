export default function QuestionTypePage() {
  const ll = new LinkedList(1);
  ll.append(2);
  ll.append(3);
  ll.prepend(4);
  ll.insert(10, 9);
  ll.insert(11313, 2);
  ll.printList();
  ll.reverse();
  ll.printList();
  return <h1>hello</h1>;
}

export class NNode {
  next: NNode | null;
  prev: NNode | null;
  constructor(public value: number) {
    this.next = null;
    this.prev = null;
  }
}
export class LinkedList {
  private head: NNode | null;
  private tail: NNode;
  length: number = 0;
  constructor(val: number) {
    this.head = new NNode(val);
    this.tail = this.head;
    this.length++;
  }
  append(val: number) {
    const newNode = new NNode(val);
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
  }
  printList() {
    let curr: NNode | null = this.head;
    const array = [];
    while (curr) {
      array.push(curr.value);
      curr = curr.next;
    }
    console.log(array);
  }
  prepend(val: number) {
    const newNode = new NNode(val);
    newNode.next = this.head;
    this.head = newNode;
    this.length++;
  }

  find(val: number): NNode | null {
    let curr: NNode | null = this.head;
    while (curr) {
      if (curr.value === val) {
        return curr;
      }
      curr = curr.next;
    }
    console.log(`${val} not found.`);
    return null;
  }
  removeNode(val: number) {
    let curr: NNode | null = this.head;
    let removed = false;
    if (this.head?.value === val) {
      console.log(`Removed: ${val}`);
      this.length--;
      return (this.head = this.head.next);
    }
    while (curr) {
      if (curr.next?.value === val) {
        removed = true;
        curr.next = curr.next?.next ?? null;
        this.length--;
      }
      curr = curr.next;
    }
    if (removed) console.log(`Removed: ${val}`);
    else console.log(`${val} not found.`);
  }
  removeIndex(index: number): NNode | null {
    if (index === 0) {
      this.head = this.head?.next ?? null;
      return this.head;
    }
    let curr = this.head;
    let i = 0;
    while (curr) {
      if (i === index - 1) {
        const ret = curr.next;
        curr.next = curr.next?.next ?? null;
        return ret;
      }
      curr = curr.next;
    }
    return null;
  }
  insert(val: number, index: number): void {
    let dummy: NNode | null = this.head;
    const newNode = new NNode(val);
    if (index === 0) return this.prepend(val);
    else if (index === this.length - 1) return this.append(val);
    else if (index > this.length - 1) {
      console.log(
        `Index ${index} outside bounds [0,${
          this.length - 1
        }]. Appending to end.`
      );
      return this.append(val);
    }
    let counter = 0;
    while (dummy) {
      if (counter === index - 1) {
        newNode.next = dummy.next;
        dummy.next = newNode;
        this.length++;
      }
      dummy = dummy.next;
      counter++;
    }
  }
  reverse() {
    if (this.length === 1) return;

    let curr = this.head;
    this.tail = this.head as NNode;
    let prev = null;
    let next = null;
    while (curr) {
      next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    this.head = prev;
  }
  get end() {
    return this.tail.value;
  }
}

class DoublyLinkedList {
  private head: NNode | null;
  private tail: NNode;
  length: number = 0;
  constructor(val: number) {
    this.head = new NNode(val);
    this.tail = this.head;
    this.length++;
  }
  append(val: number) {
    const newNode = new NNode(val);
    newNode.prev = this.tail;
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
  }
  printList() {
    let curr: NNode | null = this.head;
    const array = [];
    while (curr) {
      array.push(curr.value);
      curr = curr.next;
    }
    console.log(array);
  }
  prepend(val: number) {
    const newNode = new NNode(val);
    if (!this.head) {
      this.head = newNode;
      this.length++;
      return;
    }
    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
    this.length++;
  }
  removeNode(val: number) {
    let curr: NNode | null = this.head;
    let removed = false;
    if (this.head?.value === val) {
      console.log(`Removed: ${val}`);
      this.length--;
      this.head = this.head.next;
      this.head && (this.head.prev = null);
      return;
    }
    while (curr) {
      if (curr.next?.value === val) {
        removed = true;
        curr.next = curr.next?.next ?? null;
        curr.next && (curr.next.prev = curr);
        this.length--;
      }
      curr = curr.next;
    }
    if (removed) console.log(`Removed: ${val}`);
    else console.log(`${val} not found.`);
  }

  find(val: number): NNode | null {
    let curr: NNode | null = this.head;
    while (curr) {
      if (curr.value === val) {
        return curr;
      }
      curr = curr.next;
    }
    console.log(`${val} not found.`);
    return null;
  }

  insert(val: number, index: number): void {
    let dummy: NNode | null = this.head;
    const newNode = new NNode(val);
    if (index === 0) return this.prepend(val);
    else if (index === this.length - 1) return this.append(val);
    else if (index > this.length - 1) {
      console.log(
        `Index ${index} outside bounds [0,${
          this.length - 1
        }]. Appending to end.`
      );
      return this.append(val);
    }
    let counter = 0;
    while (dummy) {
      if (counter === index - 1) {
        newNode.next = dummy.next;
        newNode.prev = dummy;
        dummy.next && (dummy.next.prev = newNode);
        dummy.next = newNode;
        this.length++;
      }
      dummy = dummy.next;
      counter++;
    }
  }
}
