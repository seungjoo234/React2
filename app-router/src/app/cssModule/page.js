"use client";
import foo from "@/styles/foo.module.css";
import bar from "@/styles/bar.module.css";

export default function CssEx2() {
  return (
    <>
      <h1 className={foo.foo}>CssModule Page</h1>
      <button className={foo.button}>버튼2</button>
      <h1 className={bar.woo}>bar.woo - base</h1>
      <h1 className={bar.gie}>bar.gie - compose</h1>
    </>
  );
}
