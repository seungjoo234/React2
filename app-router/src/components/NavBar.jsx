import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <Link href="/"> Home </Link> |<Link href="/about"> About </Link>|
      <Link href="/foo"> Foo </Link>|<Link href="/blog"> Blog </Link>|
      <Link href="/bar/2024/10/14"> Slug </Link>
    </nav>
  );
}
