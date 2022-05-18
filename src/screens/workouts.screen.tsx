import React, {useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView, FlatList, ActivityIndicator} from 'react-native';

import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {getGyms} from '../redux/gyms/gyms.slice';

import SearchBar from '../components/search-bar/search-bar.component';
import Tile from '../components/tile/tile.component';
import AddNewTile from '../components/add-new-tile/add-new-tile.component';
import { useNavigation } from '@react-navigation/native';
import GymTile from '../components/gym-tile/gym-tile.component';

const WorkoutsScreen = () => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch();
  const {savedGyms, getGymsLoading} = useAppSelector(state => state.gym);

  useEffect(() => {
    dispatch(getGyms());
  }, []);



  return (
    <View>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <SearchBar />
        <Text style={styles.sectionTitle}>My Gyms</Text>
        {
          getGymsLoading ? <ActivityIndicator size='large'/>
          : <FlatList
          style={styles.gymSlider}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[null, ...savedGyms]}
          renderItem={({item}) =>
            item === null
            ? <AddNewTile
                style={styles.gymTile}
                onPress={() => navigation.navigate('GymAddScreen')}
              />
            : <GymTile style={styles.gymTile} gymName={item.name}/>
          }
        />
        }        
        <Text style={styles.sectionTitle}>Workouts</Text>
        <View style={styles.workoutContainer}>
          <Tile style={styles.workoutTile} />
          <Tile style={styles.workoutTile} />
          <Tile style={styles.workoutTile} />
          <Tile style={styles.workoutTile} />
          <Tile style={styles.workoutTile} />
          <AddNewTile
            style={styles.workoutTile}
            onPress={() => navigation.navigate('Workouts-edit')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginHorizontal: 20,
  },
  gymSlider: {
    paddingLeft: 10,
    paddingBottom: 10,
  },
  gymTile: {
    height: 100,
    width: 100,
  },
  workoutContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  workoutTile: {
    height: 150,
    width: 150,
  },
});

export default WorkoutsScreen;