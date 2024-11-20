import ComponentB from "./ComponentB";

export default function ComponentA({ foo }) {
  return (
    <>
      <h1>ComponentA</h1>
      <ComponentB data={foo} />
      <p>ComponentA-{foo.id}</p>
    </>
  );
}
