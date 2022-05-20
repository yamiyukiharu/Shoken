import React, {useEffect} from 'react';
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

const WorkoutsScreen = () => {
  const navigation = useNavigation<WorkoutsNavProp>();
  const dispatch = useAppDispatch();
  const {gyms, getGymsLoading} = useAppSelector(state => state.gym);
  const {user} = useAppSelector(state => state.user);
  const gymsToDisplay: Array<TFbGymEntry> = user.savedGyms.map(id => {
    return {
      id: id,
      gym: gyms[id],
    };
  });

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
                  addNew={true}
                  style={styles.gymTile}
                  onPress={() => {
                    navigation.navigate('GymAddScreen');
                  }}
                />
              ) : (
                <ShokenTile
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
            addNew={true}
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
