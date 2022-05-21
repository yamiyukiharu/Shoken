import React, {useEffect, useState} from 'react';
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
import {createNewGym, getAllEquipment, updateGym} from '../../redux/gyms/gyms.slice';
import EquipmentCategories from '../../components/equipment-categories/equipment-categories.component';
import NormalButton from '../../components/normal-button/normal-button.component';
import { TEquipmentCategories } from '../../utils/firebase/types';
import { WorkoutsNavProp } from '../../../types';
import { addUserGym } from '../../redux/user/user.slice';

export const GymAddEquipmentCategoriesScreen = () => {
  const [done, setDone] = useState(false)
  const navigation = useNavigation<WorkoutsNavProp>();
  const dispatch = useAppDispatch();
  const {gymInEdit} = useAppSelector(state => state.gym)

  const {allEquipment, getAllEquipmentLoading} = useAppSelector(
    state => state.gym,
  );
  const categories = Object.keys(allEquipment) as Array<TEquipmentCategories>

  useEffect(() => {
    dispatch(getAllEquipment());
  }, []);

  useEffect(() => {
    if (done) {
      dispatch(addUserGym(gymInEdit))
      navigation.navigate('WorkoutsScreen')
    }
  }, [gymInEdit])

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
          text={'Done'}
          onPress={() => {
            if (gymInEdit.id === '') {
              dispatch(createNewGym(gymInEdit.gym))
              setDone(true)

            } else {
              //if editing exiting gym
              dispatch(updateGym(gymInEdit))
              navigation.navigate('WorkoutsScreen')
            }
            }}
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
