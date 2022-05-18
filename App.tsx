import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {Button} from 'react-native';

import {
  NavigationContainer,
  NavigationController,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import auth from '@react-native-firebase/auth';

import SignInScreen from './src/screens/sign-in.screen';
import HomeScreen from './src/screens/home.screen';
import WorkoutsScreen from './src/screens/workouts.screen';
import WorkoutEditScreen from './src/screens/workout-edit.screen';
import GymAddScreen from './src/screens/gym-add.screen';
import GymEditScreen from './src/screens/gym-edit.screen';
import GymAddEquipmentCategoriesScreen from './src/screens/gym-add-equipment-categories.screen';
import GymAddEquipmentListScreen from './src/screens/gym-add-equipment-list.screen';
import GymDetailsScreen from './src/screens/gym-details.screen';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import type {WorkoutStackParamList} from './types';

const Tab = createBottomTabNavigator();
const WorkoutsStack = createNativeStackNavigator<WorkoutStackParamList>();
const HomeStack = createNativeStackNavigator();
const NutritionStack = createNativeStackNavigator();
const PlannerStack = createNativeStackNavigator();
const CommunityStack = createNativeStackNavigator();

const WorkoutsStackScreen = () => {
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

const AppBody = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return <SignInScreen />;
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              switch (route.name) {
                case 'Home':
                  return (
                    <MaterialIcon name={'hexagon'} size={size} color={color} />
                  );
                  break;
                case 'Workouts':
                  return (
                    <MaterialIcon name={'dumbbell'} size={size} color={color} />
                  );
                  break;
                case 'Nutrition':
                  return (
                    <MaterialIcon
                      name={'silverware-fork-knife'}
                      size={size}
                      color={color}
                    />
                  );
                case 'Planner':
                  return (
                    <MaterialIcon
                      name={'calendar-multiselect'}
                      size={size}
                      color={color}
                    />
                  );
                case 'Community':
                  return (
                    <MaterialIcon name={'arm-flex'} size={size} color={color} />
                  );
                default:
                  break;
              }
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}>
          <Tab.Screen name="Community" component={HomeScreen} />
          <Tab.Screen name="Workouts" component={WorkoutsStackScreen} />
          <Tab.Screen name="Home" component={SignInScreen} />
          <Tab.Screen name="Nutrition" component={HomeScreen} />
          <Tab.Screen name="Planner" component={HomeScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
};

const App = () => {
  return (
    <Provider store={store}>
      <AppBody />
    </Provider>
  );
};

export default App;
