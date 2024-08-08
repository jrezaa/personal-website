import Link from "next/link";

export default function LeetcodeHelpPage() {
  return (
    <div>
      <h2>Types of Questions</h2>
      <ul>
        <li>
          <Link href="/leetcode-help/arrays">Arrays</Link>
        </li>
        <li>
          <Link href="/leetcode-help/strings">Strings</Link>
        </li>
        <li>
          <Link href="/leetcode-help/linked-lists">Linked Lists</Link>
        </li>
        <li>
          <Link href="/leetcode-help/stacks">Stacks</Link>
        </li>
        <li>
          <Link href="/leetcode-help/queues">Queues</Link>
        </li>
      </ul>
    </div>
  );
}
