import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
  PayloadAction,
} from '@reduxjs/toolkit';
import {flattenAllExercises} from '../../utils/exercises';
import {getAllExercisesFirestore} from '../../utils/firebase/firestore.utils';
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
};

const emptyWorkoutMuscleSelection: TWorkoutMuscleSelection = {
  arms: {},
  back: {},
  chest: {},
  hips: {},
  legs: {},
  others: {},
  shoulders: {},
  waist: {},
};

type TVariationEncoding = Array<number>;

type TVariationUpdate = {
  index: number;
  value: number;
};

export type TWorkoutMuscleSelection = {
  [key in TMuscleCategory]: {
    [key: string]: boolean;
  };
};

type TWorkoutsState = {
  allExercises: TAllExercises;
  allFlattenedExercises: TAllFlattenedExercises;

  currentMuscleCategory: TMuscleCategory;
  currentMuscle: string;
  currentParentExercise: TExercise;
  currentParentExerciseIndex: number;
  currentMuscleFlattenedExercises: TFlattenedExercises;
  currentVariationEncoding: TVariationEncoding;
  currentExerciseName: string;

  // used for ease of displaying
  muscleCategoriesDisplay: Array<TMuscleCategory>;
  musclesDisplay: Array<string>;
  exercisesReverseMap: {[key: string]: string};
  exerciseListDisplay: Array<string>;
  equipmentListDisplay: Array<string>;

  newWorkoutMuscleSelection: TWorkoutMuscleSelection;

  getAllExercisesLoading: boolean;
  exerciseSearchString: string;
};

const workoutsInitialState: TWorkoutsState = {
  allExercises: {...emptyAllExercises},
  allFlattenedExercises: {...emptyAllFlattenedExercises},

  getAllExercisesLoading: false,

  currentMuscleCategory: 'arms',
  currentMuscleFlattenedExercises: {},
  currentMuscle: '',
  currentExerciseName: '',
  currentParentExerciseIndex: 0,
  currentParentExercise: {
    name: 'none',
    variation: [],
  },
  currentVariationEncoding: [], // array of variation indexes

  newWorkoutMuscleSelection: emptyWorkoutMuscleSelection,

  exerciseSearchString: '',
  muscleCategoriesDisplay: [],
  musclesDisplay: [],
  exercisesReverseMap: {},
  exerciseListDisplay: [],
  equipmentListDisplay: [],
};

export const getExercises = createAsyncThunk(
  'workouts/getExercises',
  async () => {
    try {
      return await getAllExercisesFirestore();
    } catch {
      console.log('error getting workouts');
    }
  },
);

const workoutsSlice = createSlice({
  name: 'workouts',
  initialState: workoutsInitialState,
  reducers: {
    setCurrentMuscleCategory: (
      state: TWorkoutsState,
      action: PayloadAction<TMuscleCategory>,
    ) => {
      state.currentMuscleCategory = action.payload;
      state.musclesDisplay = Object.keys(state.allExercises[action.payload]);
    },
    setCurrentMuscle: (
      state: TWorkoutsState,
      action: PayloadAction<string>,
    ) => {
      // set the scope of viewing exercises of current muscle
      state.currentMuscle = action.payload;

      state.currentMuscleFlattenedExercises =
        state.allFlattenedExercises[state.currentMuscleCategory][
          state.currentMuscle
        ];

      // array of exercise names to display
      state.exerciseListDisplay = Object.keys(
        state.currentMuscleFlattenedExercises,
      ).map(id => state.currentMuscleFlattenedExercises[id].name);

      // construct a reverse map of exercise name to id for easy searching
      const reverseMap: {[key: string]: string} = {};

      Object.keys(state.currentMuscleFlattenedExercises).forEach(id => {
        const exerciseName = state.currentMuscleFlattenedExercises[id].name;
        reverseMap[exerciseName] = id;
      });

      state.exercisesReverseMap = reverseMap;
    },
    setExerciseSearchString: (
      state: TWorkoutsState,
      action: PayloadAction<string>,
    ) => {
      state.exerciseSearchString = action.payload;
      state.exerciseListDisplay = state.exerciseListDisplay.filter(name =>
        name.toLocaleLowerCase().includes(action.payload),
      );
      // filter exercises to display
    },
    setCurrentViewingExercise: (
      state: TWorkoutsState,
      action: PayloadAction<string>,
    ) => {
      state.currentExerciseName = action.payload;

      // get the id for the exercise
      const id = state.exercisesReverseMap[action.payload];

      // get the parent exercise with id
      const index0 = Number(id.charAt(0));
      state.currentParentExercise =
        state.allExercises[state.currentMuscleCategory][
          state.currentMuscle
        ].exercises[index0];
      // get indexes to the current variation in the exercise variant data structure
      const currentVariationEncoding = id.split('').map(char => Number(char));
      state.currentParentExerciseIndex = currentVariationEncoding.shift() || 0;
      state.currentVariationEncoding = currentVariationEncoding;

      // set the equipment for the exercise
      state.equipmentListDisplay =
        state.currentMuscleFlattenedExercises[id].equipment || [];
    },
    updateVariation: (
      state: TWorkoutsState,
      action: PayloadAction<TVariationUpdate>,
    ) => {
      // get the full encoding and exercise from user selected variations
      const {index, value} = action.payload;
      let partialEncoding = state.currentVariationEncoding.slice(0, index);
      partialEncoding = [
        state.currentParentExerciseIndex,
        ...partialEncoding,
        value,
      ];
      const partialEncodingStr = partialEncoding.join('');
      const fullEncodingstr =
        Object.keys(state.currentMuscleFlattenedExercises).find(id => {
          const parentExerciseIndex = Number(id[0]);
          if (parentExerciseIndex === state.currentParentExerciseIndex) {
            // slice(1) since we already checked it with parentExerciseIndex
            // make sure the substring is at the begining
            return id.slice(1).indexOf(partialEncodingStr.slice(1)) === 0;
          } else {
            return false;
          }
        }) || '';
      state.currentExerciseName =
        state.currentMuscleFlattenedExercises[fullEncodingstr].name;

      const currentVariationEncoding = fullEncodingstr
        .split('')
        .map(char => Number(char));
      state.currentParentExerciseIndex = currentVariationEncoding.shift() || 0;
      state.currentVariationEncoding = currentVariationEncoding;

      // set the equipment for the exercise
      state.equipmentListDisplay =
        state.currentMuscleFlattenedExercises[fullEncodingstr].equipment || [];
    },
    setNewWorkoutMuscleSelection: (state:TWorkoutsState, action:PayloadAction<TWorkoutMuscleSelection>) => {
      state.newWorkoutMuscleSelection = {...state.newWorkoutMuscleSelection, ...action.payload}
    }
  },
  extraReducers: {
    [getExercises.pending.toString()]: (state: TWorkoutsState) => {
      state.getAllExercisesLoading = true;
    },
    [getExercises.fulfilled.toString()]: (
      state: TWorkoutsState,
      action: PayloadAction<TAllExercises>,
    ) => {

      state.allExercises = action.payload;
      state.allFlattenedExercises = flattenAllExercises(action.payload);
      state.muscleCategoriesDisplay = Object.keys(
        action.payload,
      ) as Array<TMuscleCategory>;

      // initialize newWorkoutMuscleSelection
      Object.keys(state.allExercises).forEach(name => {
        const muscleCategory = name as TMuscleCategory;
        Object.keys(state.allExercises[muscleCategory]).forEach(muscle => {
          state.newWorkoutMuscleSelection[muscleCategory][muscle] = false;
        });
      });

      state.getAllExercisesLoading = false;
    },
    [getExercises.rejected.toString()]: (state: TWorkoutsState) => {
      state.getAllExercisesLoading = false;
    },
  },
});

export const {
  setExerciseSearchString,
  setCurrentMuscle,
  setCurrentMuscleCategory,
  setCurrentViewingExercise,
  updateVariation,
  setNewWorkoutMuscleSelection,
} = workoutsSlice.actions;
export default workoutsSlice.reducer;
