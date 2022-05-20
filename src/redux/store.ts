import { configureStore } from "@reduxjs/toolkit";
import gymsReducer from "./gyms/gyms.slice";
import userSlice from "./user/user.slice";

export const store = configureStore({
    reducer: {
        gym: gymsReducer,
        user: userSlice,
    },
    // middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({immutableCheck: false})],
    
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
