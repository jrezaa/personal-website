import { LinkedList } from "@/app/utils/util-classes";

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
