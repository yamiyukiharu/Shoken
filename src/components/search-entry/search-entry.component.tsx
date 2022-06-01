import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';


import {useAppDispatch} from '../../redux/hooks';
import {
  addEquipmentToGym,
  removeEquipmentFromGym,
} from '../../redux/gyms/gyms.slice';
import type {TEquipmentCategories} from '../../utils/firebase/types';

interface Props {
  title: string;
  isEditable: boolean;
  isClickable:boolean;
  isAdded: boolean;
  onPlusTapped?: () => void;
  onCheckTapped?: () => void;
  onTapped?: () => void;
}

const SearchEntry: React.FC<Props> = ({
  title,
  isEditable,
  isClickable=false,
  isAdded,
  onCheckTapped,
  onPlusTapped,
  onTapped,
}) => {

  return (
    <TouchableOpacity style={styles.container} onPress={onTapped}>
      <Text style={{textTransform: 'capitalize'}}>{title}</Text>

      {
        isEditable ?
          (isAdded ? (
            <TouchableOpacity onPress={onCheckTapped}>
              <MaterialCommunityIcon style={{padding: 10}} name="check" size={20} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onPlusTapped}>
              <MaterialCommunityIcon style={{padding: 10}} name="plus" size={20} />
            </TouchableOpacity>
          ))
          : <MaterialIcon style={{padding: 10}} name="arrow-forward-ios" size={20} />
      }

    </TouchableOpacity>
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

export default SearchEntry;
