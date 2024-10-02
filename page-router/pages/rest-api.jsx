export async function getStaticProps() {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const repo = await res.json();
  return {
    props: { repo },
    revalidate: 60,
  };
}

export default function Foo({ repo }) {
  return;
}
