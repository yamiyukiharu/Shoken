import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type WorkoutStackParamList = {
    WorkoutsScreen: undefined;
    WorkoutEditScreen: undefined;
    GymAddScreen: undefined;
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
      muscles: Array<string>;
    }
  };



export type WorkoutsNavProp = NativeStackNavigationProp<WorkoutStackParamList>

export type GymEquipmentListScreenRouteProp = RouteProp<WorkoutStackParamList, 'GymEquipmentListScreen'>
export type GymDetailsScreenScreenRouteProp = RouteProp<WorkoutStackParamList, 'GymDetailsScreen'>
export type GymEditScreenRouteProp = RouteProp<WorkoutStackParamList, 'GymEditScreen'>
export type ExerciseSubcategoryScreenRouteProp = RouteProp<WorkoutStackParamList, 'ExerciseSubcategoryScreen'>