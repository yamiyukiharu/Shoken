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
  title: string;
  isEditable: boolean;
  isAdded: boolean;
  onPlusTapped?: () => void;
  onCheckTapped?: () => void;
}

const SearchEntry: React.FC<Props> = ({
  title,
  isEditable,
  isAdded,
  onCheckTapped,
  onPlusTapped,
}) => {

  return (
    <View style={styles.container}>
      <Text style={{textTransform: 'capitalize'}}>{title}</Text>

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

export default SearchEntry;
