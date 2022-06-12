import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type ExerciseStackParamList = {
  ExerciseCategoriesScreen: undefined;
  ExerciseDetailsScreen: undefined;
  ExerciseListScreen: {
    mode: 'view' | 'add';
  };
  ExerciseSubcategoryScreen: {
    mode: 'view' | 'add';
  };
};

export type WorkoutStackParamList = {
  WorkoutsScreen: undefined;
  WorkoutEditScreen: undefined;
  GymAddScreen: {
    mode: 'add' | 'select';
  };
  GymEditScreen: {
    mode: 'new' | 'edit';
  };
  GymEquipmentCategoriesScreen: undefined;
  GymEquipmentListScreen: {
    equipmentCategory: string;
    mode: 'view' | 'edit';
  };
  GymDetailsScreen: {
    mode: 'add' | 'edit';
  };
  WorkoutNewScreen: undefined;
  WorkoutAddExerciseScreen: undefined;
  WorkoutDetailsScreen: {
    arrayIndex: number;
  };
  ExerciseScreenStack: undefined;
  WorkoutStartScreen: undefined;
};

export type WorkoutsNavProp = NativeStackNavigationProp<WorkoutStackParamList>;
export type ExercisesNavProp =
  NativeStackNavigationProp<ExerciseStackParamList>;

export type ExerciseSubcategoryScreenRouteProp = RouteProp<
  ExerciseStackParamList,
  'ExerciseSubcategoryScreen'
>;
export type ExerciseListScreenRouteProp = RouteProp<
  ExerciseStackParamList,
  'ExerciseListScreen'
>;

export type GymAddScreenRouteProp = RouteProp<
  WorkoutStackParamList,
  'GymAddScreen'
>;
export type GymEquipmentListScreenRouteProp = RouteProp<
  WorkoutStackParamList,
  'GymEquipmentListScreen'
>;
export type GymDetailsScreenRouteProp = RouteProp<
  WorkoutStackParamList,
  'GymDetailsScreen'
>;
export type GymEditScreenRouteProp = RouteProp<
  WorkoutStackParamList,
  'GymEditScreen'
>;
export type WorkoutNewScreenRouteProp = RouteProp<
  WorkoutStackParamList,
  'WorkoutNewScreen'
>;

export type WorkoutDetailsScreenRouteProp = RouteProp<
  WorkoutStackParamList,
  'WorkoutDetailsScreen'
>;
