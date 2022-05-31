import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import { ExerciseSubcategoryScreenRouteProp, WorkoutsNavProp } from '../../../types';
import ShokenTile from '../../components/shoken-tile/shoken-tile.component';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setCurrentMuscle } from '../../redux/workouts/workouts.slice';
import { unCamelCase } from '../../utils/utils';


const ExerciseSubcategoryScreen = () => {
  const navigation = useNavigation<WorkoutsNavProp>()
  const dispatch = useAppDispatch()
  const {muscles} = useAppSelector(state => state.workouts)

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Muscles</Text>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={[...muscles, 'All']}
        renderItem={({item}) => {
          const title = unCamelCase(item)
          return (
            <ShokenTile
              title={title}
              style={styles.tile}
              addNew={false}
              accessibilityLabel={item}
              onPress={() => {
                dispatch(setCurrentMuscle(item))
                navigation.navigate('ExerciseListScreen')
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
