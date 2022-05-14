import { createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction } from "@reduxjs/toolkit";

import { createNewGymFirestore, getGymsFirestore, TGym } from "../../utils/firebase/firestore.utils";

interface TGymState {
    gyms: Array<TGym>;
    createNewGymLoading: boolean;
    getGymsLoading: boolean;
}

const initialState: TGymState = {
    gyms: [],
    createNewGymLoading: false,
    getGymsLoading: false,
}

export const createNewGym = createAsyncThunk(
    'gyms/createNewGym',
    async (gymDetails: TGym, {rejectWithValue}) => {
        try {
            return await createNewGymFirestore(gymDetails)
        } catch (err) {
            return rejectWithValue('Error creating new gym')
        }
})

export const getGyms = createAsyncThunk(
    'gyms/getGyms',
    async (_, {rejectWithValue}) => {
        try {
            return await getGymsFirestore()
        } catch(err) {
            return rejectWithValue('Error getting gyms')
        }
})

const gymsSlice = createSlice({
    name: 'gyms',
    initialState,
    reducers: {
        addNewGym(state, action) {
            state.gyms.push(action.payload)
        },
    },
    extraReducers: {
        //createNewGym
        [createNewGym.pending]: (state: TGymState) => {
            state.createNewGymLoading = true
        },
        [createNewGym.fulfilled]: (state: TGymState, action:PayloadAction<TGym>) => {
            state.createNewGymLoading = false
            state.gyms.push(action.payload)
        },
        [createNewGym.rejected]: (state: TGymState, action:PayloadAction<string>) => {
            state.createNewGymLoading = false
            console.log(action.payload)
        },
        //getGyms
        [getGyms.pending]: (state: TGymState) => {
            state.getGymsLoading = true
        },
        [getGyms.fulfilled]: (state: TGymState, action:PayloadAction<Array<TGym>>) => {
            state.getGymsLoading = false
            state.gyms = action.payload
        },
        [getGyms.rejected]: (state: TGymState, action:PayloadAction<string>) => {
            state.getGymsLoading = false
            console.log(action.payload)
        },
    }
})

export const { addNewGym } = gymsSlice.actions;
export default gymsSlice.reducer;