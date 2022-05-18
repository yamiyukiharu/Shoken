import React from 'react';
import {FlatList, View} from 'react-native';

import SearchBar from '../components/search-bar/search-bar.component';
import EquipmentSearchEntry from '../components/equipment-search-entry/equipment-search-entry.component';

import {useAppSelector} from '../redux/hooks';
import {StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {GymAddEquipmentListScreenRouteProp} from '../../types';
import type {TEquipmentCategories} from '../utils/firebase/firestore.utils';

const GymAddEquipmentListScreen = () => {
  const route = useRoute<GymAddEquipmentListScreenRouteProp>();
  const {gymInEdit, currentGym, allEquipment} = useAppSelector(state => state.gym);
  const equipmentCategory = route.params
    .equipmentCategory as TEquipmentCategories;
  const mode = route.params.mode
  const equipment = mode === 'edit' ? allEquipment[equipmentCategory] : currentGym.equipment[equipmentCategory]

  return (
    <View>
      <SearchBar />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={equipment}
        renderItem={({item}) => {
          const isAdded =
            gymInEdit.equipment[equipmentCategory].filter(
              equipment => equipment.name === item.name,
            ).length > 0;
          return (
            <EquipmentSearchEntry
              equipmentName={item.name}
              equipmentCategory={equipmentCategory}
              isEditable={mode === 'edit'}
              isAdded={isAdded}
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

export default GymAddEquipmentListScreen;
