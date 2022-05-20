import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type WorkoutStackParamList = {
    WorkoutsScreen: undefined;
    WorkoutEditScreen: undefined;
    GymAddScreen: undefined;
    GymEditScreen: {
      mode: 'new' | 'edit';
    };
    GymAddEquipmentCategoriesScreen: undefined;
    GymAddEquipmentListScreen: {
      equipmentCategory: string;
      mode: 'view' | 'edit';
    };
    GymDetailsScreen: {
      mode: 'add' | 'edit';
    }
  };



export type WorkoutsNavProp = NativeStackNavigationProp<WorkoutStackParamList>

export type GymAddEquipmentListScreenRouteProp = RouteProp<WorkoutStackParamList, 'GymAddEquipmentListScreen'>
export type GymDetailsScreenScreenRouteProp = RouteProp<WorkoutStackParamList, 'GymDetailsScreen'>
export type GymEditScreenRouteProp = RouteProp<WorkoutStackParamList, 'GymEditScreen'>