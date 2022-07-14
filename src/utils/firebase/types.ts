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

export type TExerciseSet = Array<{
  reps: number;
  weight: number; //kg
}>;

type TExerciseHistory = {
  [key in TMuscleCategory]: {
    // muscle category
    // muscle name
    [key: string]: {
      // exercise id
      [key: string]: Array<{
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

export type TWorkoutHistory = {
  workoutTemplate: TWorkoutTemplate;
  startTime: string;
  endTime: string;
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

export type TExerciseIndexer = {
  muscleCategory: TMuscleCategory;
  muscleName: string;
  exerciseId: string;
}

export type TExerciseSetIndexer = {
  muscleCategory: TMuscleCategory;
  muscleName: string;
  exerciseId: string;
  index: number;
}

export interface TExerciseSetEditProps extends TExerciseSetIndexer {
  reps: number;
  weight: number;
}

export interface TExerciseNotesEditProps extends TExerciseIndexer {
  notes: string;
}

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
  | 'barbells'
  | 'benches'
  | 'cardio'
  | 'weights'
  | 'machines'
  | 'racks'
  | 'cableAttachments'
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
