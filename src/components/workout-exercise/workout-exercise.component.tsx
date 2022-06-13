import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {TExerciseIndexer} from '../../utils/firebase/types';
import {capitalizeWords} from '../../utils/utils';
import SetsTable from '../sets-table/sets-table.component';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {
  removeExerciseFromWorkoutTemplate,
  setNotesinWorkoutTemplateExercise,
} from '../../redux/workouts/workouts.slice';

const WorkoutExercise: React.FC<TExerciseIndexer> = ({
  muscleCategory,
  muscleName,
  exerciseId,
}) => {
  const dispatch = useAppDispatch();
  const {currentWorkoutTemplate, allFlattenedExercises} = useAppSelector(
    state => state.workouts,
  );
  const exerciseName =
    allFlattenedExercises[muscleCategory][muscleName][exerciseId].name;
  const notes =
    currentWorkoutTemplate.exercises[muscleCategory][muscleName][exerciseId]
      .notes;
  const sets =
    currentWorkoutTemplate.exercises[muscleCategory][muscleName][exerciseId]
      .sets;

  const swipeRightActionView = () => {
    return (
      <TouchableOpacity
        style={styles.actionViewContainer}
        onPress={() => {
          dispatch(
            removeExerciseFromWorkoutTemplate({
              muscleCategory,
              muscleName,
              exerciseId,
            }),
          );
        }}>
        <MaterialIcon
          style={{padding: 2, color: 'white'}}
          name="highlight-remove"
          size={40}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Swipeable
        containerStyle={styles.swipeContainer}
        renderRightActions={(progress, dragX) => swipeRightActionView()}>
        <View style={styles.contents}>
          <View style={styles.firstRow}>
            <View style={styles.exerciseImage} />
            <View style={styles.titleContainer}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.title}>
                  {capitalizeWords(exerciseName)}
                </Text>
              </View>
              <TextInput
                style={styles.notesContainer}
                placeholder="Notes"
                defaultValue={notes}
                onChangeText={(text) =>
                  dispatch(
                    setNotesinWorkoutTemplateExercise({
                      muscleCategory,
                      muscleName,
                      exerciseId,
                      notes: text,
                    }),
                  )
                }
              />
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <SetsTable
              muscleCategory={muscleCategory}
              muscleName={muscleName}
              exerciseId={exerciseId}
              sets={sets}
              isStarted={true}
            />
          </View>
        </View>
      </Swipeable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    shadowColor: '0x000000',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  swipeContainer: {
    flex: 1,
  },
  contents: {
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  firstRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  titleContainer: {
    flexDirection: 'column',
    flexGrow: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 2,
    flex: 1,
  },
  notesContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'grey',
    marginTop: 10,
    paddingHorizontal: 10,
    marginRight: 10,
    height: 30,
  },
  exerciseImage: {
    height: 80,
    width: 80,
    borderWidth: 1,
  },
  actionViewContainer: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WorkoutExercise;
