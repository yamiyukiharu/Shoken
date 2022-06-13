import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import { ExercisesNavProp, ExerciseSubcategoryScreenRouteProp, WorkoutsNavProp } from '../../../types';
import ShokenTile from '../../components/shoken-tile/shoken-tile.component';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setCurrentMuscle } from '../../redux/workouts/workouts.slice';
import { unCamelCase } from '../../utils/utils';


const ExerciseSubcategoryScreen = () => {
  const navigation = useNavigation<ExercisesNavProp>()
  const route = useRoute<ExerciseSubcategoryScreenRouteProp>()
  const dispatch = useAppDispatch()
  const {musclesDisplay} = useAppSelector(state => state.workouts)

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={[...musclesDisplay, 'All']}
        renderItem={({item}) => {
          return (
            <ShokenTile
              title={item}
              style={styles.tile}
              addNew={false}
              accessibilityLabel={item}
              onPress={() => {
                dispatch(setCurrentMuscle(item))
                navigation.navigate('ExerciseListScreen', {mode: route.params.mode})
              }}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  tile: {
    height: 150,
    width: 150,
  },
});

export default ExerciseSubcategoryScreen;
