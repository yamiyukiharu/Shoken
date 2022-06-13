import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  getUserFirestore,
  setUserFirestore,
} from '../../utils/firebase/firestore.utils';
import {
  TFbGymEntry,
  TFbUserEntry,
  TMuscleCategory,
  TUser,
  TWorkoutHistory,
  TWorkoutTemplate,
} from '../../utils/firebase/types';

type TUserState = {
  user: TUser;
  uid: string;
  isSigningIn: boolean;
  isSignedIn: boolean;
  workoutStartTime: string;
};

export const emptyUser: TUser = {
  name: '',
  height: -1,
  weight: -1,
  image: '',
  level: 0,
  savedGyms: [],
  savedWorkouts: [],
  exerciseHistory: {
    arms: {},
    back: {},
    chest: {},
    hips: {},
    legs: {},
    others: {},
    shoulders: {},
    waist: {},
  },
  workoutHistory: [],
  email: '',
  providerId: '',
};

const userInitialState: TUserState = {
  user: {...emptyUser},
  uid: '',
  isSigningIn: false,
  isSignedIn: false,
  workoutStartTime: '',
};

export const setUser = createAsyncThunk(
  'user/setUser',
  async (user: FirebaseAuthTypes.User, {rejectWithValue}) => {
    try {
      const userDb = await getUserFirestore(user);
      return {
        id: user.uid,
        user: {...emptyUser, ...userDb},
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
      user.savedGyms = user.savedGyms.filter(gymId => gymId !== gymEntry.id);
      setUserFirestore({
        id: state.uid,
        user: user,
      });
      return user;
    } catch (err) {
      return rejectWithValue('Error removing user gym');
    }
  },
);

export const saveUserWorkoutTemplate = createAsyncThunk(
  'user/saveUserWorkoutTemplate',
  async (
    currentWorkoutTemplate: TWorkoutTemplate,
    {getState, rejectWithValue},
  ) => {
    try {
      const state: TUserState = getState().user as TUserState;

      // replace workout if they have the same name
      const savedWorkouts = [...state.user.savedWorkouts];
      const foundIdx = savedWorkouts.findIndex(
        workout => workout.name === currentWorkoutTemplate.name,
      );
      if (foundIdx !== -1) {
        savedWorkouts[foundIdx] = currentWorkoutTemplate;
      } else {
        savedWorkouts.push(currentWorkoutTemplate);
      }

      // write to firestore
      const user: TUser = {
        ...state.user,
        savedWorkouts: savedWorkouts,
      };
      setUserFirestore({
        id: state.uid,
        user: user,
      });
      return user;
    } catch (err) {
      return rejectWithValue('Error adding user workout');
    }
  },
);

export const endWorkout = createAsyncThunk(
  'user/endWorkout',
  async (
    currentWorkoutTemplate: TWorkoutTemplate,
    {getState, rejectWithValue},
  ) => {
    try {
      const state: TUserState = getState().user as TUserState;

      // replace workout template if they have the same name
      const savedWorkouts = [...state.user.savedWorkouts];
      const foundIdx = savedWorkouts.findIndex(
        workout => workout.name === currentWorkoutTemplate.name,
      );
      if (foundIdx !== -1) {
        savedWorkouts[foundIdx] = currentWorkoutTemplate;
      } else {
        savedWorkouts.push(currentWorkoutTemplate);
      }

      // add to workout history
      const endTime = new Date()
      const workoutHistory: TWorkoutHistory = {
        workoutTemplate: currentWorkoutTemplate,
        startTime: state.workoutStartTime,
        endTime: endTime.toJSON(),
      };

      // insert exercise records into user exerciseHistory data structue
      const exercises = currentWorkoutTemplate.exercises;
      const exerciseHistory = JSON.parse(JSON.stringify(state.user.exerciseHistory));

      Object.keys(exercises).forEach(cat => {
        const category = cat as TMuscleCategory;
        
        Object.keys(exercises[category]).forEach(muscle => {
          console.log(state.user)
          
          if (exerciseHistory[category][muscle] === undefined) {
            exerciseHistory[category][muscle] = {};
            console.log('undefined')
          }
          console.log('passed')
          Object.keys(exercises[category][muscle]).forEach(id => {
            console.log(id)

            if (exerciseHistory[category][muscle][id] === undefined) {
              exerciseHistory[category][muscle][id] = [];
            }

            exerciseHistory[category][muscle][id].push({
              time: state.workoutStartTime,
              sets: exercises[category][muscle][id].sets,
              notes: exercises[category][muscle][id].notes,
            });
          });
        });
      });

      // write to firestore
      const user: TUser = {
        ...state.user,
        savedWorkouts: savedWorkouts,
        workoutHistory: [...state.user.workoutHistory, workoutHistory],
        exerciseHistory: exerciseHistory,
      };

      setUserFirestore({
        id: state.uid,
        user: user,
      });
      return user;
    } catch (err) {
      return rejectWithValue(String(err));
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    resetUser: (state: TUserState) => {
      state.isSigningIn = false;
      state.isSignedIn = false;
      state.user = {...emptyUser};
      state.uid = '';
    },
    startWorkout: (state: TUserState) => {
      const startTime = new Date()
      state.workoutStartTime = startTime.toJSON();
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
      return;
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
    [saveUserWorkoutTemplate.fulfilled.toString()]: (
      state: TUserState,
      action: PayloadAction<TUser>,
    ) => {
      state.user = action.payload;
    },
    [endWorkout.fulfilled.toString()]: (
      state: TUserState,
      action: PayloadAction<TUser>,
    ) => {
      state.user = action.payload;
    },
  },
});

export const {resetUser, startWorkout} = userSlice.actions;
export default userSlice.reducer;
