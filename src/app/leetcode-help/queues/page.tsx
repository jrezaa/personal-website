import { NNode } from "@/app/utils/util-classes";

export default function QuestionTypePage() {
  const queue = new QueueUsingStacks();
  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);
  queue.enqueue(4);
  queue.enqueue(5);
  queue.printQueue();

  console.log(queue.peek());
  console.log(queue.dequeue());
  console.log(queue.dequeue());
  console.log(queue.dequeue());
  console.log(queue.dequeue());
  console.log(queue.dequeue());
  queue.printQueue();

  return <h1>Queues</h1>;
}

class QueueList {
  private q: any[] = [];
  constructor(val?: any) {
    if (val !== undefined) this.q.push(val);
  }
  enqueue(val: any) {
    this.q.unshift(val);
  }
  dequeue(): any {
    return this.q.pop();
  }
  peek(): any {
    return this.q[this.q.length - 1];
  }
}

class Queue {
  private head: NNode | null = null;
  private tail: NNode | null = null;
  public length = 0;
  constructor() {}
  enqueue(val: number) {
    const newNode = new NNode(val);
    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }
  dequeue(): number | undefined {
    const head = this.head;
    this.head = this.head?.next ?? null;
    this.length--;
    return head?.value;
  }
  peek(): number | undefined {
    return this.head?.value;
  }
  printQueue() {
    const arr: number[] = [];

    let curr = this.head;
    while (curr) {
      arr.push(curr.value);
      curr = curr.next;
    }
    console.log(arr);
  }
}

class Stack {
  private stack: any[] = [];
  constructor(val?: any) {
    if (val !== undefined) this.stack.push(val);
  }
  push(val: any) {
    this.stack.push(val);
  }
  pop(): any {
    return this.stack.pop();
  }
  peek(): any {
    return this.stack[this.stack.length - 1];
  }
  get length(): number {
    return this.stack.length;
  }
  printStack() {
    console.log(this.stack);
  }
}

class QueueUsingStacks {
  stack: Stack = new Stack();
  constructor() {}
  enqueue(val: number) {
    const tempStack = new Stack();
    while (this.stack.length > 0) {
      tempStack.push(this.stack.pop());
    }
    this.stack.push(val);
    while (tempStack.length > 0) {
      this.stack.push(tempStack.pop());
    }
  }
  dequeue() {
    return this.stack.pop();
  }
  peek() {
    return this.stack.peek();
  }
  printQueue() {
    this.stack.printStack();
  }
}
