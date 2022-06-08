import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { WorkoutsNavProp } from "../../../types";
import NormalButton from "../../components/normal-button/normal-button.component";
import WorkoutExercise from "../../components/workout-exercise/workout-exercise.component";

const WorkoutAddExerciseScreen = () => {
  const navigation = useNavigation<WorkoutsNavProp>()

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <WorkoutExercise/>
      <View style={styles.buttonsContainer}>
        <NormalButton style={styles.generateButton} text="Generate" onPress={() => {}}/>
        <NormalButton style={styles.generateButton} text="Add" onPress={() => {navigation.navigate('ExerciseCategoriesScreen')}}/>
      </View>

    </ScrollView>
  )
}

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
})

export default WorkoutAddExerciseScreen