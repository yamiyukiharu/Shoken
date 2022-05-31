import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WorkoutStackParamList} from '../../../types';

import WorkoutsScreen from '../workouts/workouts.screen';
import WorkoutEditScreen from '../workout-edit.screen';
import GymAddScreen from '../workouts/gym-add.screen';
import GymEditScreen from '../workouts/gym-edit.screen';
import GymAddEquipmentCategoriesScreen from '../workouts/gym-add-equipment-categories.screen';
import GymAddEquipmentListScreen from '../workouts/gym-add-equipment-list.screen';
import GymDetailsScreen from '../workouts/gym-details.screen';
import ExerciseSubCategoryScreen from '../workouts/exercise-sub-categories.screen';

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
        name="GymAddEquipmentCategoriesScreen"
        component={GymAddEquipmentCategoriesScreen}
        options={() => ({
          headerTitle: 'Add Equipment',
        })}
      />
      <WorkoutsStack.Screen
        name="GymAddEquipmentListScreen"
        component={GymAddEquipmentListScreen}
        options={() => ({
          headerTitle: 'Add Equipment',
        })}
      />
      <WorkoutsStack.Screen
        name="ExerciseSubCategoryScreen"
        component={ExerciseSubCategoryScreen}
        options={() => ({
          headerTitle: 'Exercises',
        })}
      />
    </WorkoutsStack.Navigator>
  );
};
