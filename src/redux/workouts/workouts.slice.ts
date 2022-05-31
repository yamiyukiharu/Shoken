import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
  PayloadAction,
} from '@reduxjs/toolkit';
import { flattenAllExercises } from '../../utils/exercises';
import { getAllExercisesFirestore } from '../../utils/firebase/firestore.utils';
import {
  TAllFlattenedExercises,
  TAllExercises,
  TExercise,
} from '../../utils/firebase/types';

type TWorkoutsState = {
  allExercises: TAllExercises;
  allFlattenedExercises: TAllFlattenedExercises;
  currentExercise: TExercise;
  getAllExercisesLoading: boolean;
};

const emptyAllExercises: TAllExercises = {
  arms: {},
  back: {},
  chest: {},
  hips: {},
  legs: {},
  others: {},
  shoulders: {},
  waist: {},
};

const emptyAllFlattenedExercises: TAllFlattenedExercises = {
  arms: {},
  back: {},
  chest: {},
  hips: {},
  legs: {},
  others: {},
  shoulders: {},
  waist: {},
}

const workoutsInitialState: TWorkoutsState = {
  allExercises: {...emptyAllExercises},
  allFlattenedExercises: {...emptyAllFlattenedExercises},
  getAllExercisesLoading: false,
  currentExercise: {
    name: 'none',
    variation: [],
  },
};

export const getExercises = createAsyncThunk(
  'workouts/getExercises',
 async () => {
   try {
    return await getAllExercisesFirestore()
   } catch {
     console.log('error getting workouts')
   }
 }
)

const workoutsSlice = createSlice({
  name: 'workouts',
  initialState: workoutsInitialState,
  reducers: {

  },
  extraReducers: {
    [getExercises.pending.toString()]: (state: TWorkoutsState) => {
      state.getAllExercisesLoading = true
    },
    [getExercises.fulfilled.toString()]: (state: TWorkoutsState, action: PayloadAction<TAllExercises>) => {
      state.allExercises = action.payload
      state.allFlattenedExercises = flattenAllExercises(action.payload)
      state.getAllExercisesLoading = false
    },
    [getExercises.rejected.toString()]: (state: TWorkoutsState) => {
      state.getAllExercisesLoading = false
    },
  }
})

export const {} = workoutsSlice.actions;
export default workoutsSlice.reducer;