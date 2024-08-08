export default function QuestionTypePage() {
  const tree = new BST();
  tree.insert(9);
  tree.insert(4);
  tree.insert(6);
  tree.insert(20);
  tree.insert(170);
  tree.insert(15);
  tree.insert(1);
  console.log(JSON.stringify(traverse(tree.root as NNode)));

  return <h1>Trees</h1>;
}
class BST {
  root: NNode | null;
  constructor() {
    this.root = null;
  }
  insert(value: number): NNode {
    const newNode = new NNode(value);
    if (!this.root) {
      this.root = newNode;
      return newNode;
    }
    let curr: NNode | null = this.root;
    let index = 0;
    while (curr && index < 100) {
      index++;
      if (value > curr.value) {
        if (!curr.right) {
          curr.right = newNode;
          return newNode;
        } else curr = curr.right;
      } else {
        if (!curr.left) {
          curr.left = newNode;
          return newNode;
        } else curr = curr.left;
      }
    }
    return newNode;
  }

  lookup(value: number): NNode | undefined {
    let curr: NNode | null = this.root;
    let index = 0;
    while (curr && index < 100) {
      index++;
      if (value > curr.value) {
        if (!curr.right) return undefined;
        else curr = curr.right;
      } else if (value < curr.value) {
        if (!curr.left) return undefined;
        else curr = curr.left;
      } else {
        return curr;
      }
    }
    return undefined;
  }
  remove(value: number) {}
}

class NNode {
  left: NNode | null;
  right: NNode | null;
  constructor(public value: number) {
    this.left = null;
    this.right = null;
  }
}

function traverse(node: NNode): NNode {
  const tree: { value: number; left: NNode | null; right: NNode | null } = {
    value: node.value,
    left: null,
    right: null,
  };
  tree.left = node.left === null ? null : traverse(node.left);
  tree.right = node.right === null ? null : traverse(node.right);
  return tree;
}
