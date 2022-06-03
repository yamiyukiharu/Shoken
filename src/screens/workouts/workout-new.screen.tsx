import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MuscleSelector from '../../components/muscle-selector/muscle-selector.component';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import { setNewWorkoutMuscleSelection } from '../../redux/workouts/workouts.slice';
import {TMuscleCategory} from '../../utils/firebase/types';

const WorkoutNewScreen = () => {
  const dispatch = useAppDispatch()
  const {newWorkoutMuscleSelection} = useAppSelector(state => state.workouts);

  return (
    <ScrollView style={styles.container}>
      <TextInput style={styles.workoutName} placeholder="Untitled Workout" />
      <View style={styles.gymSelectorContainer}>
        <Text style={styles.sectionLabel}>Gym</Text>
        <TouchableOpacity style={styles.gymSelector}>
          <Text style={{marginRight: 10}}>Bishan</Text>
          <MaterialIcon name={'arrow-forward-ios'} size={18} />
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionLabel}>Muscle Group</Text>
      {Object.keys(newWorkoutMuscleSelection).map(name => {
        const muscleCategory = name as TMuscleCategory;
        return (
          <MuscleSelector
            parentTitle={muscleCategory}
            childTitles={newWorkoutMuscleSelection[muscleCategory]}
            onPress={(musclesSelected) => dispatch(setNewWorkoutMuscleSelection(musclesSelected))}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  workoutName: {
    fontSize: 20,
    padding: 8,
    borderBottomWidth: 1,
  },
  gymSelectorContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  gymSelector: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WorkoutNewScreen;
