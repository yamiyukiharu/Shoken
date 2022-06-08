import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import SetsTable from "../sets-table/sets-table.component";

type Props = {
  ExerciseName: string;
}

const WorkoutExercise:React.FC<Props> = ({ExerciseName}) => {
  return (
    <View style={styles.container}>
      <View style={styles.firstRow}>
        <View style={styles.exerciseImage}/>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Bench Press</Text>
          <TextInput style={styles.notesContainer} placeholder="Notes"/>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <SetsTable/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
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
  firstRow: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 2,
  },
  titleContainer: {
    flexDirection: 'column',
    flexGrow: 1,
    marginLeft: 10,
  },
  notesContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'grey',
    marginTop: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
  exerciseImage: {
    height: 80,
    width: 80,
    borderWidth: 1,
  },
  setsTableContainer: {

  },
})

export default WorkoutExercise;