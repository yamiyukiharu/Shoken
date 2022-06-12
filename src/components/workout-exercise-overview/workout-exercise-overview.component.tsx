import React, {useRef, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useAppSelector} from '../../redux/hooks';
import {TExerciseEntry, TMuscleCategory} from '../../utils/firebase/types';
import { capitalizeWords } from '../../utils/utils';

type Props = {
  exercises: TExerciseEntry;
};

type EntryProps = {
  name: string;
  sets: number;
};

const WorkoutExerciseOverview: React.FC<Props> = ({exercises}) => {
  const {allFlattenedExercises} = useAppSelector(state => state.workouts);

  const RowEntry: React.FC<EntryProps> = ({name, sets}) => {
    return (
      <View style={styles.entryContainer}>
        <View style={styles.imageColumn}>
          <View style={styles.imageContainer}></View>
        </View>
        <View style={styles.exerciseColumn}>
          <Text style={styles.entryLabel}>{capitalizeWords(name)}</Text>
        </View>
        <View style={styles.setsColumn}>
          <Text style={styles.entryLabel}>{sets}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.imageColumn}>
          <Text style={styles.headerLabel}>Image</Text>
        </View>
        <View style={styles.exerciseColumn}>
          <Text style={styles.headerLabel}>Exercise</Text>
        </View>
        <View style={styles.setsColumn}>
          <Text style={styles.headerLabel}>Sets</Text>
        </View>
      </View>
      {Object.keys(exercises).map(cat => {
        const category = cat as TMuscleCategory;
        return Object.keys(exercises[category]).map(muscle =>
          Object.keys(exercises[category][muscle]).map(exerciseId => {
            // TODO: image
            const name = allFlattenedExercises[category][muscle][exerciseId].name;
            const sets = exercises[category][muscle][exerciseId].sets.length;
            return <RowEntry key={exerciseId} name={name} sets={sets} />;
          }),
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  headerRow: {
    flexDirection: 'row',
    paddingBottom: 4,
    borderBottomWidth: 1,
  },
  headerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  entryLabel: {
    fontSize: 16,
    alignSelf: 'center',

  },
  imageColumn: {
    flex: 3,
  },
  exerciseColumn: {
    flex: 6,
    marginLeft: 10,
  },
  setsColumn: {
    flex: 1.5,
  },
  entryContainer: {
    marginVertical: 5,
    flexDirection: 'row',
  },
  imageContainer: {
    height: 90,
    width: 90,
    borderWidth: 1,
  },
});

export default WorkoutExerciseOverview;
