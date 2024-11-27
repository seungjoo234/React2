import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialstate: {
    Value: 0,
  },
  reducers: {
    increment: (state) => {
      state.Value += 1;
    },
    decrement: (state) => {
      state.Value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
