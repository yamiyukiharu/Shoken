import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WorkoutStackParamList } from "../../../types";

import WorkoutsScreen from '../workouts-screen/workouts.screen';
import WorkoutEditScreen from '../workout-edit.screen';
import GymAddScreen from '../gym-add.screen';
import GymEditScreen from '../gym-edit.screen';
import GymAddEquipmentCategoriesScreen from '../gym-add-equipment-categories.screen';
import GymAddEquipmentListScreen from '../gym-add-equipment-list.screen';
import GymDetailsScreen from '../gym-details.screen';

const WorkoutsStack = createNativeStackNavigator<WorkoutStackParamList>();

export const WorkoutsStackScreen = () => {
    return (
      <WorkoutsStack.Navigator>
        <WorkoutsStack.Group>
          <WorkoutsStack.Screen
            name="WorkoutsScreen"
            component={WorkoutsScreen}
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
            name='GymDetailsScreen'
            component={GymDetailsScreen}
            options={({navigation, route}) => ({
              headerTitle: 'Gym Details',
            })}
          />
        </WorkoutsStack.Group>
        <WorkoutsStack.Group>
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
        </WorkoutsStack.Group>
      </WorkoutsStack.Navigator>
    );
  };
  