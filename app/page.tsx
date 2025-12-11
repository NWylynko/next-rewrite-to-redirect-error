import Link from "next/link";

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/docs/page-1">Docs Page 1</Link> will redirect to page 2
      </li>
      <li>
        <Link href="/docs/page-2">Docs Page 2</Link>
      </li>
      <li>
        <Link href="/docs/page-3">Docs Page 3</Link> will redirect to page 4
      </li>
      <li>
        <Link href="/docs/page-4">Docs Page 4</Link>
      </li>
    </ul>
  );
}
