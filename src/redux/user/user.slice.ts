import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserFirestore } from '../../utils/firebase/firestore.utils';
import { TFbGymEntry, TUser } from "../../utils/firebase/types";

type TUserState = {
    user: TUser;
    isSigningIn: boolean;
    isSignedIn: boolean;
}

export const emptyUser:TUser = {
    name: '',
    height: -1,
    weight: -1,
    image: '',
    level: 0,
    savedGyms: [],
    savedWorkouts: [],
    email: '',
    providerId: '',
}

const userInitialState:TUserState = {
    user: {...emptyUser},
    isSigningIn: false,
    isSignedIn: false,
}

export const setUser = createAsyncThunk(
    'user/setUser',
    async (user:FirebaseAuthTypes.User, {rejectWithValue}) => {
        try{
            return await getUserFirestore(user);
        } catch (err) {
            return rejectWithValue('Error getting user data')
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        resetUser(state:TUserState) {
            state.isSigningIn = false;
            state.isSignedIn = false;
            state.user = {...emptyUser};
        },
        addUserGym(state:TUserState, action:PayloadAction<TFbGymEntry>) {
            state.user.savedGyms.push(action.payload.id)
        }
    },
    extraReducers: {
        [setUser.pending.toString()]: (state: TUserState) => {
            state.isSigningIn = true;
        },
        [setUser.fulfilled.toString()]: (state: TUserState, action:PayloadAction<TUser>) => {
            const user = action.payload
            if (user) {
                // user exists in database
                state.user = user
            } else {
                // new user

            }
            state.isSigningIn = false;
            state.isSignedIn = true;
        },
        [setUser.rejected.toString()]: (state: TUserState) => {
            state.isSigningIn = false;
            state.isSignedIn = false;
        }
    }
})

export const {resetUser, addUserGym} = userSlice.actions
export default userSlice.reducer