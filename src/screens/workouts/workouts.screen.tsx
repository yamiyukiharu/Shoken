import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getGyms} from '../../redux/gyms/gyms.slice';

import SearchBar from '../../components/search-bar/search-bar.component';
import {useNavigation} from '@react-navigation/native';
import {WorkoutsNavProp} from '../../../types';
import {TFbGymEntry} from '../../utils/firebase/types';
import ShokenTile from '../../components/shoken-tile/shoken-tile.component';
import {setCurrentGym} from '../../redux/gyms/gyms.slice';
import { uploadData } from '../../utils/upload-data';

const WorkoutsScreen = () => {
  const navigation = useNavigation<WorkoutsNavProp>();
  const dispatch = useAppDispatch();
  const {gyms, getGymsLoading} = useAppSelector(state => state.gym);
  const {user} = useAppSelector(state => state.user);
  const [gymsToDisplay, setGymsToDisplay] = useState<Array<TFbGymEntry>>([]);

  useEffect(() => {
    dispatch(getGyms());
  }, []);

  useEffect(() => {
    const entries:Array<TFbGymEntry> = []
    user.savedGyms.forEach(id => {
      if (gyms[id]) entries.push({
        id: id,
        gym: gyms[id]
      })
    })
    setGymsToDisplay(entries)
  }, [gyms, user]);

  useEffect(() => {
    // TODO: fetch workout info from database
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionTitle}>My Gyms</Text>
        {getGymsLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            style={styles.gymSlider}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[null, ...gymsToDisplay]}
            renderItem={({item}) =>
              item === null ? (
                <ShokenTile
                  accessibilityLabel='add new gym'
                  addNew={true}
                  style={styles.gymTile}
                  onPress={() => {
                    navigation.navigate('GymAddScreen');
                  }}
                />
              ) : (
                <ShokenTile
                  accessibilityLabel={item.gym.name}
                  addNew={false}
                  details={item.gym.name}
                  style={styles.gymTile}
                  onPress={() => {
                    dispatch(setCurrentGym(item));
                    navigation.navigate('GymDetailsScreen', {mode: 'edit'});
                  }}
                />
              )
            }
          />
        )}
        <Text style={styles.sectionTitle}>Workouts</Text>
        <View style={styles.workoutContainer}>
          <ShokenTile
            addNew={false}
            style={styles.workoutTile}
            title={''}
            onPress={() => uploadData()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginHorizontal: 20,
    marginVertical: 10,
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
