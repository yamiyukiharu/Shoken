// =================== EXERCISE & WORKOUTS ====================

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
  exerciseHistory: Array<TWorkoutHistory>;
  workoutHistory: TUserExerciseHistory;

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
