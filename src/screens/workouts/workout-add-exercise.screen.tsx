import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {WorkoutsNavProp} from '../../../types';
import NormalButton from '../../components/normal-button/normal-button.component';
import WorkoutExercise from '../../components/workout-exercise/workout-exercise.component';
import { useAppSelector } from '../../redux/hooks';
import { TMuscleCategory } from '../../utils/firebase/types';

const WorkoutAddExerciseScreen = () => {
  const navigation = useNavigation<WorkoutsNavProp>();
  const {newWorkoutTemplate} = useAppSelector(state => state.workouts)
  const exercises = newWorkoutTemplate.exercises

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {
        Object.entries(exercises).map(([category, muslces]) => (
          Object.entries(muslces).map(([muscle, exercises]) => (
            Object.entries(exercises).map(([id, exerciseEntry]) => (
              <WorkoutExercise key={id} muscleCategory={category as TMuscleCategory} muscleName={muscle} exerciseId={id}/>
            ))
          ))
        ))
      }
      <View style={styles.buttonsContainer}>
        <NormalButton
          style={styles.generateButton}
          text="Generate"
          onPress={() => {}}
        />
        <NormalButton
          style={styles.generateButton}
          text="Add"
          onPress={() => {
            navigation.navigate('ExerciseScreenStack');
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  generateButton: {
    marginRight: 10,
  },
  buttonsContainer: {
    marginVertical: 10,
    flexDirection: 'row',
  },
});

export default WorkoutAddExerciseScreen;
