import {
    createAsyncThunk,
    createSlice,
    isRejectedWithValue,
    PayloadAction,
  } from '@reduxjs/toolkit';

import type {TAllExercises, TExercise} from '../../utils/upload-data/exercises'

type TWorkoutState = {
    exercises: TAllExercises;
    currentExercise: TExercise;
}