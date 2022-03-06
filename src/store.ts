import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todo/reducer";
import userReducer from "./user/reducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
