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
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import {getAllEquipment} from '../redux/gyms/gyms.slice';
import EquipmentCategories from '../components/equipment-categories/equipment-categories.component';
import NormalButton from '../components/normal-button/normal-button.component';
import { TEquipmentCategories } from '../utils/firebase/firestore.utils';
import { GymAddEquipmentCategoriesScreenProp } from '../../types';

export const GymAddEquipmentCategoriesScreen = () => {
  const navigation = useNavigation<GymAddEquipmentCategoriesScreenProp>();
  const dispatch = useAppDispatch();

  const {allEquipment, getAllEquipmentLoading} = useAppSelector(
    state => state.gym,
  );
  const categories = Object.keys(allEquipment) as Array<TEquipmentCategories>

  useEffect(() => {
    dispatch(getAllEquipment());
  }, []);

  return (
    <View style={styles.container}>
      {getAllEquipmentLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <EquipmentCategories categories={categories} mode={'edit'}/>
      )}

      <View style={styles.buttonsContainer}>
        <NormalButton
          text={'Back'}
          inverted={true}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <NormalButton
          style={styles.button}
          text={'Next'}
          onPress={() => navigation.navigate('GymAddEquipmentCategoriesScreen')}
        />
      </View>
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

export default GymAddEquipmentCategoriesScreen;
