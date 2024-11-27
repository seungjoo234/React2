"use client";
import { useSelector } from "react-redux";

export function CounterDisplay() {
  const count = useSelector((state) => state.counter.value);

  return (
    <div>
      <h1>{count}</h1>
    </div>
  );
}
