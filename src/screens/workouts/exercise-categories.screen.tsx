import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ExerciseCategories from '../../components/exercise-categories/exercise-categories.component';

const ExerciseCategoriesScreen = () => {

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
