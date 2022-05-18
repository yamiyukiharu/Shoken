import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {TGym } from "./src/utils/firebase/firestore.utils";

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
    };
    GymDetailsScreen: {
      gymName: string;
      mode: 'add' | 'edit' | 'none';
    }
  };



export type WorkoutsScreenProp = NativeStackNavigationProp<WorkoutStackParamList,'WorkoutsScreen'>
export type GymEditScreenProp = NativeStackNavigationProp<WorkoutStackParamList,'GymEditScreen'>
export type GymAddScreenProp = NativeStackNavigationProp<WorkoutStackParamList,'GymAddScreen'>
export type GymAddEquipmentCategoriesScreenProp = NativeStackNavigationProp<WorkoutStackParamList,'GymAddEquipmentCategoriesScreen'>

export type GymDetailsScreenProp = NativeStackNavigationProp<WorkoutStackParamList,'GymDetailsScreen'>

export type GymAddEquipmentListScreenRouteProp = RouteProp<WorkoutStackParamList, 'GymAddEquipmentListScreen'>
export type GymDetailsScreenScreenRouteProp = RouteProp<WorkoutStackParamList, 'GymDetailsScreen'>
export type GymEditScreenRouteProp = RouteProp<WorkoutStackParamList, 'GymEditScreen'>