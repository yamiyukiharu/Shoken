// =================== EXERCISE & WORKOUTS ====================

export type TExerciseVariation = {
  variant: string;
  equipment?: Array<string>;
  images?: Array<string>;
  notes?: string;
  video?: string;
  variation?: Array<TExerciseVariation>;
};

export type TExercise = {
  name: string;
  equipment?: Array<string>;
  variation: Array<TExerciseVariation>;
};

export type TMuscle = {
  [key: string]: {
    scientificName: string;
    exercises: Array<TExercise>;
  };
};

type TExerciseSet = Array<{
  reps: number;
  weight: string;
}>;

type TExerciseHistory = {
  [key in TMuscleCategory]: {
    // muscle category
    // muscle name
    [key: string]: Array<{
      id: string; // workout id
      history: {
        date: string;
        time: string;
        sets: TExerciseSet;
      };
    }>;
  };
};

type TExerciseEntry = {
  [key in TMuscleCategory]: {
    // muscle category
    // muscle name
    [key: string]: Array<{
      id: string; // workout id
      sets: TExerciseSet;
    }>;
  };
};

type TWorkoutTemplate = {
  name: string;
  gym: string;
  exercises: TExerciseEntry;
};

type TWorkoutHistory = {
  workoutTemplate: string;
  date: string;
  startTime: string;
  endTime: string;
  exercises: TExerciseEntry;
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
  [key in TMuscleCategory]: {
    [key: string]: TFlattenedExercises;
  };
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
  [key in TMuscleCategory]: TMuscle;
};

// =================== USER ====================

type TUserExerciseHistory = {
  [key: string]: Array<TExerciseHistory>;
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
