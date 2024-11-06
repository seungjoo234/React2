"use client";
export default function CssEx1() {
  return (
    <>
      <h1>CssEx1 Componet</h1>
      <button className="button">버튼1</button>
      <style jsx>
        {`
          .button {
            background: green;
            color: white;
          }
        `}
      </style>
    </>
  );
}
