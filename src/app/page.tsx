import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to my portfolio</h1>
      <Link href="/leetcode-help">
        Leetcode Help
      </Link>
    </div>
  );
}
