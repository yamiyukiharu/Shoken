import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { TMuscleCategory } from '../../utils/firebase/types';


type Props = {
  muscleCategory: TMuscleCategory;
  muscleName: string;
  exerciseId: string;
};

type TableProps = {
  setNum: number;
  previous: string;
  reps: number;
  kg: number;
}

const SetsTable: React.FC<Props> = ({muscleCategory, muscleName, exerciseId}) => {

  const dispatch = useAppDispatch();
  const {} = useAppSelector(state => state.workouts)

  const RowEntry:React.FC<TableProps> = ({setNum, previous, reps, kg}) => {
    return (
      <View style={styles.rowContainer}>
        <View style={styles.setsColumn}>
          <Text style={styles.entry}>{setNum}</Text>
        </View>
        <View style={styles.previousColumn}>
          <Text style={styles.entry}>{previous}</Text>
        </View>
        <View style={styles.repsColumn}>
          <TextInput style={[styles.entry, styles.editableEntry]}>{reps}</TextInput>
        </View>
        <View style={styles.kgColumn}>
          <TextInput style={[styles.entry, styles.editableEntry]}>{kg}</TextInput>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
      <RowEntry setNum={1} previous={'45kgx12'} reps={12} kg={50} />
      <RowEntry setNum={1} previous={'45kgx12'} reps={12} kg={50} />
      <RowEntry setNum={1} previous={'45kgx12'} reps={12} kg={50} />
      <TouchableOpacity style={styles.addButton}>
        <MaterialCommunityIcon style={{padding: 10}} name="plus" size={20} />
      </TouchableOpacity>
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
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
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

  }
});

export default SetsTable;
