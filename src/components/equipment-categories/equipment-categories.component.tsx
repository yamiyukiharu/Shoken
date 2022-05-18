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
import ShokenTile from '../shoken-tile/shoken-tile.component';

type Props = {
    categories: Array<TEquipmentCategories>;
    mode: 'view' | 'edit'
}

const EquipmentCategories:React.FC<Props> = ({categories, mode}) => {
    const {gymInEdit, currentGym} = useAppSelector(state => state.gym)
    const navigation = useNavigation<WorkoutsNavProp>()

  return (
    <View>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={categories}
        renderItem={({item}) => {
          const category = item as TEquipmentCategories;
          console.log(item)
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
                    currentGym.equipment[category]
                      ? currentGym.equipment[category].length.toString()
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