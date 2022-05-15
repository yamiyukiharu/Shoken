import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Button,
  ActivityIndicator
} from 'react-native';
import SearchBar from '../components/search-bar/search-bar.component';
import GymSearchEntry from '../components/gym-search-entry/gym-search-entry.component';

import {useAppSelector} from '../redux/hooks';

const GymAddScreen = () => {
  const {gyms, getGymsLoading} = useAppSelector(state => state.gym);

  return (
    <View style={styles.container}>
      <SearchBar/>
      {getGymsLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          style={styles.gymList}
          showsVerticalScrollIndicator={false}
          data={gyms}
          renderItem={({item, index, seperators}) =>
            <GymSearchEntry gym={item}/>
          }
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
  gymList: {
  }
});

export default GymAddScreen;
