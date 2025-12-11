import Link from "next/link";

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/docs/page-1">Docs Page 1</Link>
      </li>
      <li>
        <Link href="/docs/page-2">Docs Page 2</Link>
      </li>
    </ul>
  );
}
