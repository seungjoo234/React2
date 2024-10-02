import { useRouter } from "next/router";

export default function Foo() {
  const router = useRouter();
  const { foo, id, name, pid } = router.query;
  console.log({ foo, id, name, pid });

  return (
    <>
      <h1>Foo[0]: {foo[0]}</h1>
      <h1>Foo[1]: {foo[1]}</h1>
      <h1>Foo[2]: {foo[2]}</h1>
      <h1>Id: {id}</h1>
      <h1>Name: {name}</h1>
      <h1>Pid: {pid}</h1>
    </>
  );
}
