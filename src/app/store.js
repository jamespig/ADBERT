import { configureStore, createSlice } from "@reduxjs/toolkit";

// 創建一個簡單的 slice 作為預設 reducer
const appSlice = createSlice({
  name: "app",
  initialState: {
    initialized: true,
  },
  reducers: {},
});

export default configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});
