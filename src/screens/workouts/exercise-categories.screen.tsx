import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import { WorkoutsNavProp } from '../../../types';
import ExerciseCategories from '../../components/exercise-categories/exercise-categories.component';

const ExerciseCategoriesScreen = () => {

  const navigation = useNavigation<WorkoutsNavProp>()

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return(
          <Button
            title='Done'
            onPress={() => {
              navigation.navigate('WorkoutAddExerciseScreen')
            }}
          />
        )
      }
    })
  }, [])

  return (
    <ExerciseCategories mode='add'/>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ExerciseCategoriesScreen;
