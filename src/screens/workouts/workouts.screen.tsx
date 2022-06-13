import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getGyms} from '../../redux/gyms/gyms.slice';

import SearchBar from '../../components/search-bar/search-bar.component';
import {useNavigation} from '@react-navigation/native';
import {WorkoutsNavProp} from '../../../types';
import {TFbGymEntry, TMuscleCategory} from '../../utils/firebase/types';
import ShokenTile from '../../components/shoken-tile/shoken-tile.component';
import {setCurrentGym} from '../../redux/gyms/gyms.slice';
import {getExercises, resetNewWorkout, setCurrentMuscleCategory} from '../../redux/workouts/workouts.slice';
import ExerciseCategories from '../../components/exercise-categories/exercise-categories.component';
import { stringToColour } from '../../utils/utils';

const WorkoutsScreen = () => {
  const navigation = useNavigation<WorkoutsNavProp>();
  const dispatch = useAppDispatch();
  const {gyms, getGymsLoading} = useAppSelector(state => state.gym);
  const {user} = useAppSelector(state => state.user);
  const {allExercises, getAllExercisesLoading} = useAppSelector(
    state => state.workouts,
  );
  const [gymsToDisplay, setGymsToDisplay] = useState<Array<TFbGymEntry>>([]);

  useEffect(() => {
    dispatch(getGyms());
    dispatch(getExercises());
  }, []);

  useEffect(() => {
    const entries: Array<TFbGymEntry> = [];
    user.savedGyms.forEach(id => {
      if (gyms[id])
        entries.push({
          id: id,
          gym: gyms[id],
        });
    });
    setGymsToDisplay(entries);
  }, [gyms, user]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.sectionTitle}>My Gyms</Text>
        <View style={styles.gymContainer}>
          {getGymsLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={[null, ...gymsToDisplay]}
              renderItem={({item}) =>
                item === null ? (
                  <ShokenTile
                    accessibilityLabel="add new gym"
                    addNew={true}
                    style={styles.gymTile}
                    onPress={() => {
                      navigation.navigate('GymAddScreen', {mode: 'add'});
                    }}
                  />
                ) : (
                  <ShokenTile
                    accessibilityLabel={item.gym.name}
                    addNew={false}
                    details={item.gym.name}
                    style={[styles.gymTile, {backgroundColor: stringToColour(item.gym.name)}]}
                    onPress={() => {
                      dispatch(setCurrentGym(item));
                      navigation.navigate('GymDetailsScreen', {mode: 'edit'});
                    }}
                  />
                )
              }
            />
          )}
        </View>

        <Text style={styles.sectionTitle}>Workouts</Text>
        <View style={styles.workoutsContainer}>
          <ShokenTile
            accessibilityLabel='new workout'
            addNew={true}
            style={styles.workoutTile}
            onPress={() => {
              dispatch(resetNewWorkout())
              navigation.navigate('WorkoutNewScreen')
            }}
          />
          {
            user.savedWorkouts.map((workout, idx) => (
              <ShokenTile
                accessibilityLabel={workout.name}
                key={idx}
                details={workout.name}
                addNew={false}
                style={[styles.workoutTile, {backgroundColor: stringToColour(workout.name)}]}
                onPress={() => {navigation.navigate('WorkoutDetailsScreen', {arrayIndex: idx})}}/>
            ))
          }
        </View>
        <Text style={styles.sectionTitle}>Exercises</Text>
        <ExerciseCategories mode='view'/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    flexGrow: 1,
    backgroundColor: 'white'
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  gymContainer: {
    paddingLeft: 18,
    paddingBottom: 10,

  },
  gymTile: {
    height: 100,
    width: 100,
  },
  workoutTile: {
    height: 100,
    width: 100,
  },
  workoutsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: 18,
  },
});

export default WorkoutsScreen;
