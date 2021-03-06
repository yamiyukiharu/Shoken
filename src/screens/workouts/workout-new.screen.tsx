import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {WorkoutNewScreenRouteProp, WorkoutsNavProp} from '../../../types';
import MuscleSelector from '../../components/muscle-selector/muscle-selector.component';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {setNewWorkoutMuscleSelection, setNewWorkoutName} from '../../redux/workouts/workouts.slice';
import {TMuscleCategory} from '../../utils/firebase/types';

const WorkoutNewScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<WorkoutsNavProp>();
  const route = useRoute<WorkoutNewScreenRouteProp>()
  const {newWorkoutMuscleSelection, currentWorkoutTemplate} = useAppSelector(
    state => state.workouts,
  );
  const {gyms} = useAppSelector(state => state.gym);
  const [selectedGym, setSelectedGym] = useState('');

  useEffect(() => {
    gyms[currentWorkoutTemplate.gymId] && setSelectedGym(gyms[currentWorkoutTemplate.gymId].name);
  }, [currentWorkoutTemplate.gymId]);

  // top right button to create new gym
  useEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <Button
            title="Next"
            onPress={onNextTapped}
          />
        ),
      });
  }, [currentWorkoutTemplate, selectedGym]);

  const onNextTapped = () => {
    if (currentWorkoutTemplate.name === '') {
      Alert.alert('Please input a workout name')
    } else if (selectedGym ===  '') {
      Alert.alert('Please select a gym')
    } else {
      navigation.navigate('WorkoutAddExerciseScreen');
    }
  }

  return (
    <ScrollView style={styles.container}>
      <TextInput style={styles.workoutName} placeholder="Untitled Workout" onChangeText={(text) => dispatch(setNewWorkoutName(text))}/>
      <View style={styles.gymSelectorContainer}>
        <Text style={styles.sectionLabel}>Gym</Text>
        <TouchableOpacity
          style={styles.gymSelector}
          onPress={() => navigation.navigate('GymAddScreen', {mode: 'select'})}>
          <Text style={{marginRight: 10}}>{selectedGym}</Text>
          <MaterialIcon name={'arrow-forward-ios'} size={18} />
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionLabel}>Muscle Group</Text>
      {Object.keys(newWorkoutMuscleSelection).map((name, idx) => {
        const muscleCategory = name as TMuscleCategory;
        return (
          <MuscleSelector
            key={idx}
            parentTitle={muscleCategory}
            childTitles={newWorkoutMuscleSelection[muscleCategory]}
            onPress={musclesSelected =>
              dispatch(setNewWorkoutMuscleSelection(musclesSelected))
            }
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
