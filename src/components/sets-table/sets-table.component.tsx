import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  addSetToWorkoutTemplateExercise,
  editSetInWorkoutTemplateExercise,
  removeSetFromWorkoutTemplateExercise,
} from '../../redux/workouts/workouts.slice';
import {
  TExerciseIndexer,
  TExerciseSet,
  TMuscleCategory,
} from '../../utils/firebase/types';
import Swipeable from 'react-native-gesture-handler/Swipeable';

interface Props extends TExerciseIndexer {
  sets: TExerciseSet;
}

type TableProps = {
  setNum: number;
  previous: string;
  reps: number;
  kg: number;
};

const SetsTable: React.FC<Props> = ({
  muscleCategory,
  muscleName,
  exerciseId,
  sets,
}) => {
  const dispatch = useAppDispatch();
  const {} = useAppSelector(state => state.workouts);

  const onPlusTapped = () => {
    dispatch(
      addSetToWorkoutTemplateExercise({
        muscleCategory,
        muscleName,
        exerciseId,
      }),
    );
  };



  const HeaderRow = () => {
    return (
      <View style={[styles.rowContainer, styles.headerRowContainer]}>
        <View style={styles.setsColumn}>
          <Text style={styles.header}>Sets</Text>
        </View>
        <View style={styles.previousColumn}>
          <Text style={styles.header}>Previous</Text>
        </View>
        <View style={styles.repsColumn}>
          <Text style={styles.header}>Reps</Text>
        </View>
        <View style={styles.kgColumn}>
          <Text style={styles.header}>kg</Text>
        </View>
      </View>
    );
  };

  const RowEntry: React.FC<TableProps> = ({setNum, previous, reps, kg}) => {
    const rep = reps === 0 ? '' : reps;
    const weight = kg === 0 ? '' : kg;

    const [repsInput, setRepsInput] = useState(reps);
    const [weightInput, setWeightInput] = useState(kg);
    const row = useRef<Swipeable | null>(null);

    const onRowDelete = () => {
      row.current?.close();
      dispatch(
        removeSetFromWorkoutTemplateExercise({
          muscleCategory,
          muscleName,
          exerciseId,
          index: setNum,
        }),
      );
    };

    const onFieldsChange = () => {
      dispatch(
        editSetInWorkoutTemplateExercise({
          muscleCategory,
          muscleName,
          exerciseId,
          index: setNum,
          reps: repsInput,
          weight: weightInput,
        }),
      );
    };

    const swipeRightActionView = () => {
      return (
        <TouchableOpacity style={styles.deleteButton} onPress={onRowDelete}>
          <MaterialIcon
            style={{padding: 2, color: 'red'}}
            name="highlight-remove"
            size={22}
          />
        </TouchableOpacity>
      );
    };

    return (
      <Swipeable
        renderRightActions={(progress, dragX) => swipeRightActionView()}
        ref={ref => (row.current = ref)}>
        <View style={styles.rowContainer}>
          <View style={styles.setsColumn}>
            <Text style={styles.entry}>{setNum + 1}</Text>
          </View>
          <View style={styles.previousColumn}>
            <Text style={styles.entry}>{previous}</Text>
          </View>
          <View style={styles.repsColumn}>
            <TextInput
              style={[styles.entry, styles.editableEntry]}
              keyboardType="number-pad"
              defaultValue={rep.toString()}
              onChangeText={text => setRepsInput(Number(text))}
              onEndEditing={onFieldsChange}
            />
          </View>
          <View style={styles.kgColumn}>
            <TextInput
              style={[styles.entry, styles.editableEntry]}
              keyboardType="number-pad"
              defaultValue={weight.toString()}
              onChangeText={text => setWeightInput(Number(text))}
              onEndEditing={onFieldsChange}
            />
          </View>
        </View>
      </Swipeable>
    );
  };

  const AddSetButton = () => {
    return (
      <TouchableOpacity style={styles.addButton} onPress={onPlusTapped}>
        <MaterialCommunityIcon style={{padding: 10}} name="plus" size={20} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderRow />
      {sets.map((set, index) => (
        <RowEntry
          key={index}
          setNum={index}
          previous={''}
          reps={set.reps}
          kg={set.weight}
        />
      ))}
      <AddSetButton/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: 'column',
    flex: 1,
    
  },
  header: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  entry: {
    fontSize: 16,
  },
  editableEntry: {
    borderRadius: 3,
    borderWidth: 0.2,
    paddingHorizontal: 8,
    paddingVertical: 2,
    width: 55,
    textAlign: 'center',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
    backgroundColor: 'white',
  },
  headerRowContainer: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 3,
  },
  setsColumn: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  previousColumn: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 2,
  },
  repsColumn: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  kgColumn: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 30,
    width: '100%',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 5,
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 3,
  },
});

export default SetsTable;
