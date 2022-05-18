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
import {useAppSelector, useAppDispatch} from '../../redux/hooks';
import {getAllEquipment, setGymInEdit} from '../../redux/gyms/gyms.slice';

import { TEquipment, TEquipmentCategories } from '../../utils/firebase/firestore.utils';
import AddNewTile from '../add-new-tile/add-new-tile.component';
import { WorkoutsNavProp } from '../../../types';

type Props = {
    categories: Array<TEquipmentCategories>;
    mode: 'view' | 'edit'
}

const EquipmentCategories:React.FC<Props> = ({categories, mode}) => {
    const {gymInEdit} = useAppSelector(state => state.gym)
    const navigation = useNavigation<WorkoutsNavProp>()

  return (
    <View>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={categories}
        renderItem={({item}) => {
          const category = item as TEquipmentCategories;
          if (mode === 'view') {
            return (
                <AddNewTile
                  style={styles.tile}
                  onPress={() =>
                    navigation.navigate('GymAddEquipmentListScreen', {
                      equipmentCategory: item,
                    })
                  }
                  title={item}
                  details={`${
                    gymInEdit.equipment[category]
                      ? gymInEdit.equipment[category].length.toString()
                      : '0'
                  } added`}
                />
              );
          } else {
            return (
                <AddNewTile
                  style={styles.tile}
                  onPress={() =>
                    navigation.navigate('GymAddEquipmentListScreen', {
                      equipmentCategory: item,
                    })
                  }
                  title={item}
                  details={`${
                    gymInEdit.equipment[category]
                      ? gymInEdit.equipment[category].length.toString()
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
    buttonsContainer: {
      flexDirection: 'row',
      marginTop: 'auto',
      marginBottom: 40,
    },
    button: {
      marginLeft: 20,
    },
    tile: {
      height: 150,
      width: 150,
    },
  });

export default EquipmentCategories