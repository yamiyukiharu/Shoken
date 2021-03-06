import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ExerciseStackParamList, WorkoutStackParamList} from '../../../types';

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
import WorkoutDetailsScreen from '../workouts/workout-details.screen';
import WorkoutStartScreen from '../workouts/workout-start.screen';

const WorkoutsStack = createNativeStackNavigator<WorkoutStackParamList>();
const ExerciseStack = createNativeStackNavigator<ExerciseStackParamList>();

const ExerciseStackScreen = () => {
  return (
    <ExerciseStack.Navigator>
      <WorkoutsStack.Group
        screenOptions={{
          // headerShown: false,
        }}>
        <ExerciseStack.Screen
          name="ExerciseCategoriesScreen"
          component={ExerciseCategoriesScreen}
          options={() => ({
            presentation: 'modal',
            headerTitle: 'Muscle Categories',
          })}
        />
        <ExerciseStack.Screen
          name="ExerciseSubcategoryScreen"
          component={ExerciseSubcategoryScreen}
          options={() => ({
            presentation: 'card',
            headerTitle: 'Muscles',
          })}
        />
        <ExerciseStack.Screen
          name="ExerciseListScreen"
          component={ExerciseListScreen}
          options={() => ({
            presentation: 'card',
          })}
        />
        <ExerciseStack.Screen
          name="ExerciseDetailsScreen"
          component={ExerciseDetailsScreen}
          options={() => ({
            presentation: 'card',
          })}
        />
      </WorkoutsStack.Group>
    </ExerciseStack.Navigator>
  );
};

export const WorkoutsStackScreen = () => {
  return (
    <WorkoutsStack.Navigator>
      <WorkoutsStack.Screen
        name="WorkoutsScreen"
        component={WorkoutsScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Workout',
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
          headerTitle: 'Equipment',
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
        name="WorkoutDetailsScreen"
        component={WorkoutDetailsScreen}
      />
      <WorkoutsStack.Screen
        name="ExerciseScreenStack"
        component={ExerciseStackScreen}
        options={() => ({
          headerShown: false,
          presentation: 'modal',
          
        })}
      />
      <WorkoutsStack.Screen
        name="WorkoutStartScreen"
        component={WorkoutStartScreen}
        options={() => ({
          presentation: 'containedModal',
        })}
      />
    </WorkoutsStack.Navigator>
  );
};
