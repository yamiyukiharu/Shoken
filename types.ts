import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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
    }
    ExerciseSubcategoryScreen: {
      mode: 'view' | 'add'
    };
    ExerciseListScreen: {
      mode: 'view' | 'add'
    };
    ExerciseDetailsScreen: undefined;
    WorkoutNewScreen: {
      mode: 'new' | 'edit';
    };
    WorkoutAddExerciseScreen: undefined;
    ExerciseCategoriesScreen: undefined;
  };



export type WorkoutsNavProp = NativeStackNavigationProp<WorkoutStackParamList>

export type GymAddScreenRouteProp = RouteProp<WorkoutStackParamList, 'GymAddScreen'>
export type GymEquipmentListScreenRouteProp = RouteProp<WorkoutStackParamList, 'GymEquipmentListScreen'>
export type GymDetailsScreenRouteProp = RouteProp<WorkoutStackParamList, 'GymDetailsScreen'>
export type GymEditScreenRouteProp = RouteProp<WorkoutStackParamList, 'GymEditScreen'>
export type ExerciseSubcategoryScreenRouteProp = RouteProp<WorkoutStackParamList, 'ExerciseSubcategoryScreen'>
export type ExerciseListScreenRouteProp = RouteProp<WorkoutStackParamList, 'ExerciseListScreen'>
export type WorkoutNewScreenRouteProp = RouteProp<WorkoutStackParamList, 'WorkoutNewScreen'>