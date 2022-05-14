import { configureStore } from "@reduxjs/toolkit";
import gymsReducer from "./gyms/gyms.slice";

export const store = configureStore({
    reducer: {
        gym: gymsReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
