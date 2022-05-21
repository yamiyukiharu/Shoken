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
import {useNavigation} from '@react-navigation/native';
import {WorkoutsNavProp} from '../../../types';
import {TFbGymEntry} from '../../utils/firebase/types';
import { getGyms, resetGymInEdit, setGymSearchString } from '../../redux/gyms/gyms.slice';

const GymAddScreen = () => {
  const navigation = useNavigation<WorkoutsNavProp>();
  const dispatch = useAppDispatch()
  const {gyms, getGymsLoading, gymSearchString} = useAppSelector(state => state.gym);
  const [gymsToDisplay, setGymsToDisplay] = useState<Array<TFbGymEntry>>([]);

  // get all gyms from database
  useEffect(() => {
    dispatch(getGyms());
    dispatch(setGymSearchString(''))
  }, []);

  // filter out gyms to display
  useEffect(() => {
    let entries: Array<TFbGymEntry> = Object.keys(gyms).map(id => {
      return {
        id: id,
        gym: gyms[id],
      };
    });
    entries = entries.filter(entry => entry.gym.name.toLowerCase().includes(gymSearchString))
    setGymsToDisplay(entries);
  }, [gyms, gymSearchString]);

  // top right button to create new gym
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            dispatch(resetGymInEdit())
            navigation.navigate('GymEditScreen', {mode: 'new'})}}
          title="Create New"
        />
      ),
    });
  }, [])

  const onSearchStringChange = (text:string) => {
    dispatch(setGymSearchString(text))
  }

  return (
    <View style={styles.container}>
      <SearchBar placeholder='Search Gyms' onChangeText={onSearchStringChange}/>
      {getGymsLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          style={styles.gymList}
          showsVerticalScrollIndicator={false}
          data={gymsToDisplay}
          renderItem={({item}) => <GymSearchEntry gymEntry={item} />}
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
