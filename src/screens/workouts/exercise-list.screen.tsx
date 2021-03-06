import React, { useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {useNavigation, useRoute} from '@react-navigation/native';
import SearchBar from '../../components/search-bar/search-bar.component';
import {FlatList} from 'react-native-gesture-handler';
import { addExerciseToWorkoutTemplate_list, removeExerciseFromWorkoutTemplate_list, setCurrentViewingExercise } from '../../redux/workouts/workouts.slice';
import SearchEntry from '../../components/search-entry/search-entry.component';
import { ExerciseListScreenRouteProp, ExercisesNavProp, WorkoutsNavProp } from '../../../types';

const ExerciseListScreen = () => {

  const [searchString, setSearchString] = useState('')

  const dispatch = useAppDispatch();
  const {exerciseListDisplay} = useAppSelector(state => state.workouts)
  // filter exercises to display
  const filteredExercises = Object.keys(exerciseListDisplay).filter(name => name.toLocaleLowerCase().includes(searchString))

  
  const route = useRoute<ExerciseListScreenRouteProp>()
  const navigation = useNavigation<ExercisesNavProp>()

  const onSearchStringChange = (text: string) => {
    setSearchString(text.toLocaleLowerCase());
  };
  
  return (
    <View>
      <SearchBar
        placeholder="Search Equipment"
        onChangeText={onSearchStringChange}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredExercises}
        renderItem={({item}) => {
          const isAdded = exerciseListDisplay[item]

          const onPlusTapped = () => {
            // create action to add exercise to currentWorkoutTemplate with name
            dispatch(addExerciseToWorkoutTemplate_list(item))
          };

          const onCheckTapped = () => {
            // create action to remove exercise from currentWorkoutTemplate with name
            dispatch(removeExerciseFromWorkoutTemplate_list(item))
          };

          const onTapped = () => {
            dispatch(setCurrentViewingExercise(item))
            navigation.navigate('ExerciseDetailsScreen')
          }

          return (
            <SearchEntry
              title={item}
              isEditable={route.params.mode === 'add'}
              isClickable={route.params.mode === 'view'}
              isAdded={isAdded}
              onPlusTapped={onPlusTapped}
              onCheckTapped={onCheckTapped}
              onTapped={onTapped}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default ExerciseListScreen;
