import { configureStore } from "@reduxjs/toolkit";
import tourReducer from "./tourSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    tours: tourReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
