import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/page-1">Page 1</Link>
      <Link href="/page-2">Page 2</Link>
      <Link href="/page-3">Page 3</Link>
    </div>
  );
}
