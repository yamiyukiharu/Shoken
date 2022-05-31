import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {useRoute} from '@react-navigation/native';
import SearchBar from '../../components/search-bar/search-bar.component';
import {FlatList} from 'react-native-gesture-handler';
import { setExerciseSearchString } from '../../redux/workouts/workouts.slice';
import SearchEntry from '../../components/search-entry/search-entry.component';

const ExerciseListScreen = () => {

  const dispatch = useAppDispatch();
  const {exerciseList} = useAppSelector(state => state.workouts)
  
  const onSearchStringChange = (text: string) => {
    dispatch(setExerciseSearchString(text.toLocaleLowerCase()));
  };
  
  return (
    <View>
      <SearchBar
        placeholder="Search Equipment"
        onChangeText={onSearchStringChange}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={exerciseList}
        renderItem={({item}) => {
          const isAdded = false
          const mode = 'view'

          const onPlusTapped = () => {

          };

          const onCheckTapped = () => {

          };

          return (
            <SearchEntry
              title={item}
              isEditable={mode === 'edit'}
              isAdded={isAdded}
              onPlusTapped={onPlusTapped}
              onCheckTapped={onCheckTapped}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default ExerciseListScreen;
