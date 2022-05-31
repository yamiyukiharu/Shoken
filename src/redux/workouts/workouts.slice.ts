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
  TMuscleCategory,
  TMuscle,
  TFlattenedExercises,
} from '../../utils/firebase/types';

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

type TWorkoutsState = {
  allExercises: TAllExercises;
  allFlattenedExercises: TAllFlattenedExercises;

  currentMuscleCategory: TMuscleCategory;
  currentMuscle: string;
  currentExercise: TExercise;

  muscleCategories: Array<TMuscleCategory>;
  muscles: Array<string>
  exercises: TFlattenedExercises;
  exerciseList: Array<string>

  getAllExercisesLoading: boolean;
  exerciseSearchString: string;
};

const workoutsInitialState: TWorkoutsState = {
  allExercises: {...emptyAllExercises},
  allFlattenedExercises: {...emptyAllFlattenedExercises},

  getAllExercisesLoading: false,

  currentMuscleCategory: 'arms',
  currentMuscle: '',
  currentExercise: {
    name: 'none',
    variation: [],
  },

  exerciseSearchString: '',
  muscleCategories: [],
  muscles: [],
  exercises: {},
  exerciseList: [],

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
    setCurrentMuscleCategory: (state:TWorkoutsState, action: PayloadAction<TMuscleCategory>) => {
      state.currentMuscleCategory = action.payload
      state.muscles = Object.keys(state.allExercises[action.payload])
    },
    setCurrentMuscle: (state:TWorkoutsState, action: PayloadAction<string>) => {
      state.currentMuscle = action.payload
      // set exercises to display
      state.exercises = state.allFlattenedExercises[state.currentMuscleCategory][state.currentMuscle]
      state.exerciseList = Object.keys(state.exercises).map(id => state.exercises[id].name)
    },
    setExerciseSearchString: (state:TWorkoutsState, action: PayloadAction<string>) => {
      state.exerciseSearchString = action.payload
      state.exerciseList = state.exerciseList.filter(name => name.toLocaleLowerCase().includes(action.payload))
      // filter exercises to display
    }
  },
  extraReducers: {
    [getExercises.pending.toString()]: (state: TWorkoutsState) => {
      state.getAllExercisesLoading = true
    },
    [getExercises.fulfilled.toString()]: (state: TWorkoutsState, action: PayloadAction<TAllExercises>) => {
      state.allExercises = action.payload
      state.allFlattenedExercises = flattenAllExercises(action.payload)
      state.muscleCategories = Object.keys(action.payload) as Array<TMuscleCategory>
      state.getAllExercisesLoading = false
    },
    [getExercises.rejected.toString()]: (state: TWorkoutsState) => {
      state.getAllExercisesLoading = false
    },
  }
})

export const {setExerciseSearchString, setCurrentMuscle, setCurrentMuscleCategory} = workoutsSlice.actions;
export default workoutsSlice.reducer;