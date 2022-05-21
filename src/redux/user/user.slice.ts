import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  getUserFirestore,
  setUserFirestore,
} from '../../utils/firebase/firestore.utils';
import {TFbGymEntry, TFbUserEntry, TUser} from '../../utils/firebase/types';

type TUserState = {
  user: TUser;
  uid: string;
  isSigningIn: boolean;
  isSignedIn: boolean;
};

export const emptyUser: TUser = {
  name: '',
  height: -1,
  weight: -1,
  image: '',
  level: 0,
  savedGyms: [],
  savedWorkouts: [],
  email: '',
  providerId: '',
};

const userInitialState: TUserState = {
  user: {...emptyUser},
  uid: '',
  isSigningIn: false,
  isSignedIn: false,
};

export const setUser = createAsyncThunk(
  'user/setUser',
  async (user: FirebaseAuthTypes.User, {rejectWithValue}) => {
    try {
      const userDb = await getUserFirestore(user);
      return {
        id: user.uid,
        user: userDb,
      };
    } catch (err) {
      return rejectWithValue('Error getting user data');
    }
  },
);

export const addUserGym = createAsyncThunk(
  'user/addUserGym',
  async (gymEntry: TFbGymEntry, {getState, rejectWithValue}) => {
    try {
      const state: TUserState = getState().user as TUserState;
      const user: TUser = {
        ...state.user,
        savedGyms: [...state.user.savedGyms],
      };
      // only make changes if id is not in savedGyms
      if (!state.user.savedGyms.includes(gymEntry.id)) {
        user.savedGyms = [...state.user.savedGyms, gymEntry.id];
      }
      setUserFirestore({
        id: state.uid,
        user: user,
      });
      return user;

    } catch (err) {
      return rejectWithValue('Error adding user gym');
    }
  },
);

export const removeUserGym = createAsyncThunk(
  'user/removeUserGym',
  async (gymEntry: TFbGymEntry, {getState, rejectWithValue}) => {
    try {
      const state: TUserState = getState().user as TUserState;
      const user: TUser = {
        ...state.user,
        savedGyms: [...state.user.savedGyms],
      };
      user.savedGyms = user.savedGyms.filter(gymId => gymId !== gymEntry.id)
      setUserFirestore({
        id: state.uid,
        user: user,
      });
      return user;
    } catch (err) {
      return rejectWithValue('Error removing user gym');
      
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    resetUser(state: TUserState) {
      state.isSigningIn = false;
      state.isSignedIn = false;
      state.user = {...emptyUser};
      state.uid = '';
    },
  },
  extraReducers: {
    [setUser.pending.toString()]: (state: TUserState) => {
      state.isSigningIn = true;
    },
    [setUser.fulfilled.toString()]: (
      state: TUserState,
      action: PayloadAction<TFbUserEntry>,
    ) => {
      state.user = action.payload.user;
      state.uid = action.payload.id;
      state.isSigningIn = false;
      state.isSignedIn = true;
    },
    [setUser.rejected.toString()]: (state: TUserState) => {
      state.isSigningIn = false;
      state.isSignedIn = false;
    },
    [addUserGym.pending.toString()]: (state: TUserState) => {
      return
    },
    [addUserGym.fulfilled.toString()]: (
      state: TUserState,
      action: PayloadAction<TUser>,
    ) => {
      state.user = action.payload;
    },
    [removeUserGym.fulfilled.toString()]: (
      state: TUserState,
      action: PayloadAction<TUser>,
    ) => {
      state.user = action.payload;
    },
  },
});

export const {resetUser} = userSlice.actions;
export default userSlice.reducer;
