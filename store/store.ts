import { configureStore } from "@reduxjs/toolkit";
import tourReducer from "./tourSlice";

export const store = configureStore({
    reducer: {
        tours: tourReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
