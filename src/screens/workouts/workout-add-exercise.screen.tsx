import {useNavigation} from '@react-navigation/native';
import React, { useEffect } from 'react';
import {View, StyleSheet, ScrollView, Button} from 'react-native';
import {WorkoutsNavProp} from '../../../types';
import NormalButton from '../../components/normal-button/normal-button.component';
import WorkoutExercise from '../../components/workout-exercise/workout-exercise.component';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addUserWorkoutTemplate } from '../../redux/user/user.slice';
import { TMuscleCategory } from '../../utils/firebase/types';
import WorkoutsScreen from './workouts.screen';

const WorkoutAddExerciseScreen = () => {
  const navigation = useNavigation<WorkoutsNavProp>();
  const dispatch = useAppDispatch()
  const {newWorkoutTemplate} = useAppSelector(state => state.workouts)
  const exercises = newWorkoutTemplate.exercises

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Done"
          onPress={onDoneTapped}
        />
      ),
    });
}, [newWorkoutTemplate]);

  const onDoneTapped = () => {
    dispatch(addUserWorkoutTemplate(newWorkoutTemplate))
    navigation.navigate('WorkoutsScreen')
  }

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
