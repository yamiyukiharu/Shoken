import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import { TExerciseIndexers, TMuscleCategory } from "../../utils/firebase/types";
import { capitalizeWords } from "../../utils/utils";
import SetsTable from "../sets-table/sets-table.component";


const WorkoutExercise:React.FC<TExerciseIndexers> = ({muscleCategory, muscleName, exerciseId}) => {
 
  const {newWorkoutTemplate, allFlattenedExercises} = useAppSelector(state => state.workouts)
  const exerciseName = allFlattenedExercises[muscleCategory][muscleName][exerciseId].name
  const notes = newWorkoutTemplate.exercises[muscleCategory][muscleName][exerciseId].notes
  const sets = newWorkoutTemplate.exercises[muscleCategory][muscleName][exerciseId].sets

  return (
    <View style={styles.container}>
      <View style={styles.firstRow}>
        <View style={styles.exerciseImage}/>
        <View style={styles.titleContainer}>
          <View style={{flexDirection: 'row',}}>
            <Text style={styles.title}>{capitalizeWords(exerciseName)}</Text>
          </View>
          <TextInput style={styles.notesContainer} placeholder="Notes" value={notes}/>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <SetsTable muscleCategory={muscleCategory} muscleName={muscleName} exerciseId={exerciseId} sets={sets}/>
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
    alignItems: 'center',
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
    height: 30,
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