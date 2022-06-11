import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {Button} from 'react-native';
import {MenuProvider} from 'react-native-popup-menu';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

import SignInScreen from './src/screens/sign-in.screen';
import HomeScreen from './src/screens/home.screen';
import {WorkoutsStackScreen} from './src/screens/navigation-stacks/workout-stack';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import type {WorkoutStackParamList} from './types';
import {useAppDispatch, useAppSelector} from './src/redux/hooks';
import {setUser, resetUser} from './src/redux/user/user.slice';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const NutritionStack = createNativeStackNavigator();
const PlannerStack = createNativeStackNavigator();
const CommunityStack = createNativeStackNavigator();

const AppBody = () => {
  const dispatch = useAppDispatch();
  const {isSignedIn} = useAppSelector(state => state.user);

  const onAuthStateChanged: (
    user: FirebaseAuthTypes.User | null,
  ) => void = user => {
    if (user) {
      dispatch(setUser(user));
    } else {
      dispatch(resetUser());
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (!isSignedIn) {
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
          <Tab.Screen name="Workouts" component={WorkoutsStackScreen} />
          <Tab.Screen name="Community" component={HomeScreen} />
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
      <MenuProvider>
        <AppBody />
      </MenuProvider>
    </Provider>
  );
};

export default App;
