import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../redux/hooks';

import { TEquipmentCategories } from '../../utils/firebase/types';
import { WorkoutsNavProp } from '../../../types';
import ShokenTile from '../shoken-tile/shoken-tile.component';

type Props = {
    categories: Array<TEquipmentCategories>;
    mode: 'view' | 'edit'
}

const EquipmentCategories:React.FC<Props> = ({categories, mode}) => {
    const {gymInEdit, currentGym} = useAppSelector(state => state.gym)
    const navigation = useNavigation<WorkoutsNavProp>()

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={categories}
        renderItem={({item}) => {
          const category = item as TEquipmentCategories;
          if (mode === 'view') {
            return (
                <ShokenTile
                  style={styles.tile}
                  addNew={false}
                  onPress={() =>
                    navigation.navigate('GymAddEquipmentListScreen', {
                      equipmentCategory: item,
                      mode: 'view',
                    })
                  }
                  title={item}
                  details={`${
                    currentGym.gym.equipment[category]
                      ? currentGym.gym.equipment[category].length.toString()
                      : '0'
                  } Equipment`}
                />
              );
          } else {
            return (
                <ShokenTile
                  style={styles.tile}
                  addNew={true}
                  onPress={() =>
                    navigation.navigate('GymAddEquipmentListScreen', {
                      equipmentCategory: item,
                      mode: 'edit',
                    })
                  }
                  title={item}
                  details={`${
                    gymInEdit.gym.equipment[category]
                      ? gymInEdit.gym.equipment[category].length.toString()
                      : '0'
                  } added`}
                />
              );
          }

        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    tile: {
      height: 150,
      width: 150,
    },
  });

export default EquipmentCategories