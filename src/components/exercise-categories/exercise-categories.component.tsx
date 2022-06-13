import { useNavigation } from "@react-navigation/native"
import React from "react"
import { View, StyleSheet, ActivityIndicator } from "react-native"
import { ExercisesNavProp, WorkoutsNavProp } from "../../../types"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { setCurrentMuscleCategory } from "../../redux/workouts/workouts.slice"
import { TMuscleCategory } from "../../utils/firebase/types"
import { stringToColour } from "../../utils/utils"
import ShokenTile from "../shoken-tile/shoken-tile.component"

type Props = {
  mode: 'view' | 'add';
}

const ExerciseCategories:React.FC<Props> = ({mode='view'}) => {
  const navigation = useNavigation<WorkoutsNavProp>()
  const dispatch = useAppDispatch()
  const {allExercises, getAllExercisesLoading} = useAppSelector(state => state.workouts)

  return (
    <View style={styles.container}>
          {getAllExercisesLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            Object.keys(allExercises).map(category => (
              <ShokenTile
                key={category}
                accessibilityLabel={category}
                addNew={false}
                title={category}
                style={[styles.exerciseTile, {backgroundColor: stringToColour(category)}]}
                onPress={() => {
                  dispatch(setCurrentMuscleCategory(category as TMuscleCategory))
                  navigation.navigate('ExerciseScreenStack', {
                    screen: 'ExerciseSubcategoryScreen',
                    params: {mode: mode}
                  });
                }}
              />
            ))
          )}
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseTile: {
    height: 150,
    width: 150,
  },
})

export default ExerciseCategories
