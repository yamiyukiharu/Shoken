import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WorkoutStackParamList} from '../../../types';

import WorkoutsScreen from '../workouts/workouts.screen';
import WorkoutEditScreen from '../workout-edit.screen';
import GymAddScreen from '../workouts/gym-add.screen';
import GymEditScreen from '../workouts/gym-edit.screen';
import GymEquipmentCategoriesScreen from '../workouts/gym-equipment-categories.screen';
import GymEquipmentListScreen from '../workouts/gym-equipment-list.screen';
import GymDetailsScreen from '../workouts/gym-details.screen';
import ExerciseSubcategoryScreen from '../workouts/exercise-subcategories.screen';
import ExerciseListScreen from '../workouts/exercise-list.screen';
import ExerciseDetailsScreen from '../workouts/exercise-details.screen';
import WorkoutNewScreen from '../workouts/workout-new.screen';
import WorkoutAddExerciseScreen from '../workouts/workout-add-exercise.screen';
import ExerciseCategoriesScreen from '../workouts/exercise-categories.screen';

const WorkoutsStack = createNativeStackNavigator<WorkoutStackParamList>();

export const WorkoutsStackScreen = () => {
  return (
    <WorkoutsStack.Navigator>
      <WorkoutsStack.Screen
        name="WorkoutsScreen"
        component={WorkoutsScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Gyms & Workouts',
        })}
      />
      <WorkoutsStack.Screen
        name="WorkoutEditScreen"
        component={WorkoutEditScreen}
      />
      <WorkoutsStack.Screen
        name="GymAddScreen"
        component={GymAddScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Add Gym',
        })}
      />
      <WorkoutsStack.Screen
        name="GymDetailsScreen"
        component={GymDetailsScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Gym Details',
        })}
      />
      <WorkoutsStack.Screen
        name="GymEditScreen"
        component={GymEditScreen}
        options={() => ({
          headerTitle: 'Create New Gym',
        })}
      />
      <WorkoutsStack.Screen
        name="GymEquipmentCategoriesScreen"
        component={GymEquipmentCategoriesScreen}
        options={() => ({
          headerTitle: 'Add Equipment',
        })}
      />
      <WorkoutsStack.Screen
        name="GymEquipmentListScreen"
        component={GymEquipmentListScreen}
        options={() => ({
          headerTitle: 'Add Equipment',
        })}
      />
      <WorkoutsStack.Screen
        name="ExerciseSubcategoryScreen"
        component={ExerciseSubcategoryScreen}
        options={() => ({
          headerTitle: 'Exercises',
        })}
      />
      <WorkoutsStack.Screen
        name="ExerciseListScreen"
        component={ExerciseListScreen}
        options={() => ({
          headerTitle: 'Exercises',
        })}
      />
      <WorkoutsStack.Screen
        name="ExerciseDetailsScreen"
        component={ExerciseDetailsScreen}
        options={() => ({
          headerTitle: 'Exercise',
        })}
      />
      <WorkoutsStack.Screen
        name="WorkoutNewScreen"
        component={WorkoutNewScreen}
        options={() => ({
          headerTitle: 'New Workout',
        })}
      />
      <WorkoutsStack.Screen
        name="WorkoutAddExerciseScreen"
        component={WorkoutAddExerciseScreen}
        options={() => ({
          headerTitle: 'Add Exercises',
        })}
      />
      <WorkoutsStack.Screen
        name="ExerciseCategoriesScreen"
        component={ExerciseCategoriesScreen}
        options={() => ({
          headerTitle: 'Add Exercises',
        })}
      />
      
    </WorkoutsStack.Navigator>
  );
};
