import { configureStore } from "@reduxjs/toolkit";
import gymsReducer from "./gyms/gyms.slice";
import userReducer from "./user/user.slice";
import workoutsReducer from './workouts/workouts.slice'

export const store = configureStore({
    reducer: {
        gym: gymsReducer,
        user: userReducer,
        workouts: workoutsReducer,
    },
    // middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({immutableCheck: false})],
    
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
