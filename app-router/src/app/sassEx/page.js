import scss from "@/styles/foo.module.scss";

export default function SassEx() {
  return (
    <>
      <div className={scss.foo}>
        <h1>SassEx Page</h1>
        <h2>in button</h2>
      </div>
      <button>out button</button>
    </>
  );
}
