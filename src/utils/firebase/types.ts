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
    [key: string]: {
      // exercise id
      [key: string]: Array<{
        date: string;
        time: string;
        notes: string;
        sets: TExerciseSet;
      }>;
    };
  };
};

export type TExerciseEntry = {
  [key in TMuscleCategory]: {
    // muscle category
    // muscle name
    [key: string]: {
      // exercise id
      [key: string]: { // sets
        sets: TExerciseSet;
        notes: string;
      };
    };
  };
};

export type TWorkoutTemplate = {
  name: string;
  gymId: string;
  exercises: TExerciseEntry;
};

type TWorkoutHistory = {
  workoutTemplate: string;
  date: string;
  startTime: string;
  endTime: string;
  exercises: TExerciseEntry;
};

export type TFlattenedExercises = {
  // exercise id
  [key: string]: {
    name: string;
    equipment?: Array<string>;
  };
};

export type TAllFlattenedExercises = {
  [key in TMuscleCategory]: {
    // muscle name
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

export type TUser = {
  name: string;
  height: number;
  weight: number;
  image: string;
  level: number;
  savedGyms: Array<string>;
  savedWorkouts: Array<TWorkoutTemplate>;
  workoutHistory: Array<TWorkoutHistory>;
  exerciseHistory: TExerciseHistory;

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
