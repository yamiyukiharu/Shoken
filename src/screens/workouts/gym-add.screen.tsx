import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Button,
  ActivityIndicator,
} from 'react-native';
import SearchBar from '../../components/search-bar/search-bar.component';
import GymSearchEntry from '../../components/gym-search-entry/gym-search-entry.component';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {useNavigation, useRoute} from '@react-navigation/native';
import {GymAddScreenRouteProp, WorkoutsNavProp} from '../../../types';
import {TFbGymEntry, TGyms} from '../../utils/firebase/types';
import {
  getGyms,
  resetGymInEdit,
  setGymSearchString,
} from '../../redux/gyms/gyms.slice';
import { setNewWorkoutGymId } from '../../redux/workouts/workouts.slice';

const GymAddScreen = () => {
  const navigation = useNavigation<WorkoutsNavProp>();
  const route = useRoute<GymAddScreenRouteProp>();
  const dispatch = useAppDispatch();
  const {gyms, getGymsLoading, gymSearchString} = useAppSelector(
    state => state.gym,
  );
  const {user} = useAppSelector(state => state.user)
  const [gymsToDisplay, setGymsToDisplay] = useState<Array<TFbGymEntry>>([]);

  // get all gyms from database
  useEffect(() => {
    dispatch(getGyms());
    dispatch(setGymSearchString(''));
  }, []);

  // filter out gyms to display
  useEffect(() => {
    let gymToShow:TGyms = {}
    if (route.params.mode === 'select') {
      user.savedGyms.forEach(gymId => gymToShow[gymId] = gyms[gymId])
    } else {
      gymToShow = gyms
    }
    let entries: Array<TFbGymEntry> = Object.keys(gymToShow).map(id => {
      return {
        id: id,
        gym: gyms[id],
      };
    });
    entries = entries.filter(entry =>
      entry.gym.name.toLowerCase().includes(gymSearchString),
    );
    setGymsToDisplay(entries);
  }, [gyms, gymSearchString]);

  // top right button to create new gym
  useEffect(() => {
    if (route.params.mode === 'add') {
      navigation.setOptions({
        headerRight: () => (
          <Button
            title="Create New"
            onPress={() => {
              dispatch(resetGymInEdit());
              navigation.navigate('GymEditScreen', {mode: 'new'});
            }}
          />
        ),
      });
    }
  }, []);

  const onSearchStringChange = (text: string) => {
    dispatch(setGymSearchString(text));
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search Gyms"
        onChangeText={onSearchStringChange}
      />
      {getGymsLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          style={styles.gymList}
          showsVerticalScrollIndicator={false}
          data={gymsToDisplay}
          renderItem={({item}) => {
            if (route.params.mode === 'add') {
              return (<GymSearchEntry gymEntry={item}/>)
            } else {
            return (<GymSearchEntry gymEntry={item} onPress={() => {
              dispatch(setNewWorkoutGymId(item.id))
              navigation.navigate('WorkoutNewScreen')
            }}/>)
            }
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  gymList: {},
});

export default GymAddScreen;
