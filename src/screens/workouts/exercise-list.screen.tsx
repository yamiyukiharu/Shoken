import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {useNavigation, useRoute} from '@react-navigation/native';
import SearchBar from '../../components/search-bar/search-bar.component';
import {FlatList} from 'react-native-gesture-handler';
import { addExerciseToWorkoutTemplate_list, removeExerciseFromWorkoutTemplate_list, setCurrentViewingExercise, setExerciseSearchString } from '../../redux/workouts/workouts.slice';
import SearchEntry from '../../components/search-entry/search-entry.component';
import { ExerciseListScreenRouteProp, ExercisesNavProp, WorkoutsNavProp } from '../../../types';

const ExerciseListScreen = () => {

  const dispatch = useAppDispatch();
  const {exerciseListDisplay, newWorkoutTemplate} = useAppSelector(state => state.workouts)
  
  const route = useRoute<ExerciseListScreenRouteProp>()
  const navigation = useNavigation<ExercisesNavProp>()

  const onSearchStringChange = (text: string) => {
    dispatch(setExerciseSearchString(text.toLocaleLowerCase()));
  };
  
  return (
    <View>
      <SearchBar
        placeholder="Search Equipment"
        onChangeText={onSearchStringChange}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={Object.keys(exerciseListDisplay)}
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
              isClickable={true}
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
