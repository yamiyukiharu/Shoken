import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import {WorkoutDetailsScreenRouteProp, WorkoutsNavProp} from '../../../types';
import NormalButton from '../../components/normal-button/normal-button.component';
import ShokenChip from '../../components/shoken-chip/shoken-chip.component';
import WorkoutExerciseOverview from '../../components/workout-exercise-overview/workout-exercise-overview.component';
import {useAppSelector} from '../../redux/hooks';
import {TMuscleCategory} from '../../utils/firebase/types';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { startWorkoutFromTemplate } from '../../redux/workouts/workouts.slice';
import { startWorkout } from '../../redux/user/user.slice';


const WorkoutDetailsScreen = () => {
  const dispatch = useDispatch()
  const route = useRoute<WorkoutDetailsScreenRouteProp>();
  const navigation = useNavigation<WorkoutsNavProp>();
  const {user} = useAppSelector(state => state.user);
  const {gyms} = useAppSelector(state => state.gym);

  const workout = user.savedWorkouts[route.params.arrayIndex];
  const muscles: Array<string> = [];

  Object.keys(workout.exercises).forEach(cat => {
    const category = cat as TMuscleCategory;
    Object.keys(workout.exercises[category]).forEach(muscle =>
      muscles.push(muscle),
    );
  });

  const onEditTapped = () => {
    // TODO: go to workoutNewScreen in edit mode
  }

  const onRemoveTapped = () => {
    // TODO: remove workout template from user state and firestore
    navigation.navigate('WorkoutsScreen')
  }

  const onStartWorkoutTapped = () => {
    // send start workout action
    dispatch(startWorkoutFromTemplate(workout))
    dispatch(startWorkout())
    navigation.navigate('WorkoutStartScreen')
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: workout.name,
      headerRight: () => {
        return (
          <Menu>
            <MenuTrigger>
              <MaterialIcon
                name={'dots-horizontal'}
                size={28}
                color={'#007AFF'}
              />
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={styles.menuContainer}>
              <MenuOption onSelect={onEditTapped}>
                <Text style={styles.menuOption}>Edit</Text>
              </MenuOption>
              <MenuOption onSelect={onRemoveTapped}>
                <Text style={styles.menuOption}>Remove</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        );
      },
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsRow}>
        <Text style={styles.label}>Last trained</Text>
        <Text>4 days ago, 02/05/2022</Text>
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.label}>Gym</Text>
        <Text>{gyms[workout.gymId].name}</Text>
      </View>
      <View style={styles.musclesRow}>
        <Text style={styles.label}>Muscles trained</Text>
        <View style={styles.musclesContaier}>
          {muscles.map((muscle, idx) => (
            <ShokenChip text={muscle} key={idx} style={styles.chips} />
          ))}
        </View>
      </View>
      <NormalButton
        style={styles.startButton}
        text="Start Workout"
        onPress={onStartWorkoutTapped}
      />

      <WorkoutExerciseOverview exercises={workout.exercises} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  musclesRow: {
    marginTop: 5,
  },
  musclesContaier: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5,
  },
  chips: {
    backgroundColor: '#71D4FF',
    margin: 2,
  },
  startButton: {
    alignSelf: 'center',
    width: 200,
    marginVertical: 10,
  },
  menuOption: {
    fontSize: 14,
    padding: 10,
  },
  menuContainer : {
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    borderRadius: 10
  }
});

export default WorkoutDetailsScreen;
