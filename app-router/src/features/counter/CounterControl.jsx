"use client";
import { useDispatch } from "react-redux";
import { increment, decrement } from "./counterSlice";

export function CounterControl() {
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}
