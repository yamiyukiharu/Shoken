import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';

import SearchBar from '../../components/search-bar/search-bar.component';
import SearchEntry from '../../components/search-entry/search-entry.component';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {GymEquipmentListScreenRouteProp} from '../../../types';
import type {
  TEquipment,
  TEquipmentCategories,
} from '../../utils/firebase/types';
import {addEquipmentToGym, removeEquipmentFromGym, setEquipmentSearchString} from '../../redux/gyms/gyms.slice';

const GymEquipmentListScreen = () => {
  const route = useRoute<GymEquipmentListScreenRouteProp>();
  const dispatch = useAppDispatch();
  const {gymInEdit, currentGym, allEquipment, equipmentSearchString} =
    useAppSelector(state => state.gym);
  const equipmentCategory = route.params
    .equipmentCategory as TEquipmentCategories;
  const mode = route.params.mode;
  const [equipmentToShow, setEquipmentToShow] = useState<Array<TEquipment>>([]);

  // filter equipment to display
  useEffect(() => {
    let equipment =
      mode === 'edit'
        ? allEquipment[equipmentCategory]
        : currentGym.gym.equipment[equipmentCategory];
    equipment = equipment.filter(item =>
      item.name.includes(equipmentSearchString),
    );
    console.log(equipmentSearchString);
    setEquipmentToShow(equipment);
  }, [equipmentSearchString]);

  // clear search field on mount
  useEffect(() => {
    dispatch(setEquipmentSearchString(''));
  }, []);

  const onSearchStringChange = (text: string) => {
    dispatch(setEquipmentSearchString(text));
  };

  return (
    <View>
      <SearchBar
        placeholder="Search Equipment"
        onChangeText={onSearchStringChange}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={equipmentToShow}
        renderItem={({item}) => {
          const isAdded =
            gymInEdit.gym.equipment[equipmentCategory].filter(
              equipment => equipment.name === item.name,
            ).length > 0;

          const onPlusTapped = () => {
            dispatch(
              addEquipmentToGym({
                category: equipmentCategory,
                equipmentName: item.name,
              }),
            );
          };

          const onCheckTapped = () => {
            dispatch(
              removeEquipmentFromGym({
                category: equipmentCategory,
                equipmentName: item.name,
              }),
            );
          };

          return (
            <SearchEntry
              title={item.name}
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

export default GymEquipmentListScreen;
