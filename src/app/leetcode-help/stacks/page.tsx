import { NNode } from "@/app/utils/util-classes";

export default function QuestionTypePage() {
  const stack = new StackNode();
  stack.push(1);
  stack.push(2);
  stack.push(3);
  stack.push(4);
  stack.printStack();
  console.log(stack.pop());
  console.log(stack.pop());
  console.log(stack.pop());
  stack.printStack();

  return <h1>Stacks</h1>;
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
}

class StackNode {
  private head: NNode | null = null;
  private tail: NNode | null = null;
  public length = 0;
  constructor() {}

  push(val: number) {
    const newNode = new NNode(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.head = newNode;
    this.length++;
  }
  pop(): number | undefined {
    if (!this.head) return undefined;

    const ret = this.head.value;
    this.head = this.head.next;
    this.length--;
    return ret;
  }
  peek(): number | undefined {
    return this.head?.value;
  }
  printStack() {
    const arr: number[] = [];

    let curr = this.head;
    while (curr) {
      arr.push(curr.value);
      curr = curr.next;
    }
    console.log(arr);
  }
}
