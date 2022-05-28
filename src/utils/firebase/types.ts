// =================== EXERCISE & WORKOUTS ====================

export type TExerciseVariation = {
  variant: string;
  equipment?: Array<string>;
  images?: Array<string>;
  notes?: string;
  video?: string;
  variation?: TExerciseVariations;
};

export type TExerciseVariations = Array<TExerciseVariation>;

export type TExercise = {
  name: string;
  equipment?: Array<string>;
  variation: TExerciseVariations;
};

export type TExercises = Array<TExercise>;

export type TMuscleGroup = {
  [key: string]: {
    scientificName: string;
    exercises: TExercises;
  };
};

type TExerciseHistory = {
  date: string;
  time: string;
  sets: Array<{
    weight: string;
    reps: number;
  }>;
};

type TExerciseId = string;
type TMuscleName = string;

type TWorkoutTemplate = {
  name: string;
  gym: string;
  muscles: Array<TMuscleName>;
  exercises: {
    // muscle name
    [key: TMuscleName]: {
      id: TExerciseId; // encoded exercise id
      sets: number;
    };
  };
};

type TWorkoutHistory = {
  workoutTemplate: string;
  date: string;
  startTime: string;
  endTime: string;
  exercises: Array<TExerciseId>;
};

export type TFlattenedExerciseVariations = Array<{
  id: Array<number>;
  name: string;
  equipment?: Array<string>;
}>;

export type TFlattenedExercises = {
  [key: string]: {
    name: string;
    equipment?: Array<string>;
  };
};

export type TAllFlattenedExercises = {
  [key: TMuscleName]: TFlattenedExercises;
};

export type TMuscleCategory =
  | 'shoulders'
  | 'arms'
  | 'back'
  | 'chest'
  | 'waist'
  | 'hips'
  | 'legs'
  | 'others';

export type TAllExercises = {
  [key in TMuscleCategory]: TMuscleGroup;
};

// =================== USER ====================

type TUserExerciseHistory = {
  [key: TExerciseId]: Array<TExerciseHistory>;
};

export type TUser = {
  name: string;
  height: number;
  weight: number;
  image: string;
  level: number;
  savedGyms: Array<string>;
  savedWorkouts: Array<TWorkoutTemplate>;
  workoutHistory: Array<TWorkoutHistory>;
  exerciseHistory: TUserExerciseHistory;

  email: string;
  providerId: string;
};

// =================== GYM & EQUIPMENT ====================

export type TEquipmentCategories =
  | 'bars'
  | 'benches'
  | 'cardio'
  | 'dumbbells'
  | 'machines'
  | 'racks'
  | 'cableAttachment'
  | 'others';

type dict<TValue> = {[key in TEquipmentCategories]: TValue};

export type TEquipment = {
  name: string;
  weights?: Array<string>;
};

export type TAllEquipment = dict<Array<TEquipment>>;

export type TGym = {
  name: string;
  address: string;
  createdBy: string;
  size: number;
  images: string[];
  equipment: TAllEquipment;
};

export type TFbGymEntry = {
  id: string;
  gym: TGym;
};

export type TFbUserEntry = {
  id: string;
  user: TUser;
};

export type TGyms = {[key: string]: TGym};
