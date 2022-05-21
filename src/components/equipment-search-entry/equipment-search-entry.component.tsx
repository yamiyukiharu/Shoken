import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useAppDispatch} from '../../redux/hooks';
import {
  addEquipmentToGym,
  removeEquipmentFromGym,
} from '../../redux/gyms/gyms.slice';
import type {TEquipmentCategories} from '../../utils/firebase/types';

interface Props {
  equipmentName: string;
  equipmentCategory: TEquipmentCategories;
  isEditable: boolean;
  isAdded: boolean;
}

const EquipmentSearchEntry: React.FC<Props> = ({
  equipmentName,
  equipmentCategory,
  isEditable,
  isAdded,
}) => {
  const dispatch = useAppDispatch();

  const onPlusTapped = () => {
    dispatch(
      addEquipmentToGym({
        category: equipmentCategory,
        equipmentName: equipmentName,
      }),
    );
  };

  const onCheckTapped = () => {
    dispatch(
      removeEquipmentFromGym({
        category: equipmentCategory,
        equipmentName: equipmentName,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{textTransform: 'capitalize'}}>{equipmentName}</Text>

      {isEditable &&
        (isAdded ? (
          <TouchableOpacity onPress={onCheckTapped}>
            <MaterialIcon style={{padding: 10}} name="check" size={20} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onPlusTapped}>
            <MaterialIcon style={{padding: 10}} name="plus" size={20} />
          </TouchableOpacity>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    paddingVertical: 8,
    height: 80,
  },
});

export default EquipmentSearchEntry;
