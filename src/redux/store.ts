import { configureStore, getDe } from "@reduxjs/toolkit";
import gymsReducer from "./gyms/gyms.slice";

export const store = configureStore({
    reducer: {
        gym: gymsReducer,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({immutableCheck: false})],
    
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
