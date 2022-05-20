import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Button,
  ActivityIndicator,
} from 'react-native';
import SearchBar from '../components/search-bar/search-bar.component';
import GymSearchEntry from '../components/gym-search-entry/gym-search-entry.component';

import {useAppSelector} from '../redux/hooks';
import {useNavigation} from '@react-navigation/native';
import {WorkoutsNavProp} from '../../types';
import { TFbGymEntry } from '../utils/firebase/types';

const GymAddScreen = () => {
  const navigation = useNavigation<WorkoutsNavProp>();
  const {gyms, getGymsLoading} = useAppSelector(state => state.gym);
  const gymsToDisplay: Array<TFbGymEntry> = Object.keys(gyms).map(id => {
    return {
      id: id,
      gym: gyms[id],
    };
  });

  navigation.setOptions({
    headerRight: () => (
      <Button
        onPress={() => navigation.navigate('GymEditScreen', {mode: 'new'})}
        title="Create New"
      />
    ),
  });

  return (
    <View style={styles.container}>
      <SearchBar />
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
