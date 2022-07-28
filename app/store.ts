import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import formReducer from "./formSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
