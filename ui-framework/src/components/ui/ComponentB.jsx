import ComponentC from "./ComponentC";

export default function ComponentB({ data }) {
  return (
    <>
      <h1>ComponentB</h1>
      <ComponentC props={data} />
      <p>ComponentB-{data.name}</p>
    </>
  );
}
