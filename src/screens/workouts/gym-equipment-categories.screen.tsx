import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector, useAppDispatch} from '../../redux/hooks';
import {
  createNewGym,
  getAllEquipment,
  updateGym,
} from '../../redux/gyms/gyms.slice';
import EquipmentCategories from '../../components/equipment-categories/equipment-categories.component';
import NormalButton from '../../components/normal-button/normal-button.component';
import {TEquipmentCategories, TGym} from '../../utils/firebase/types';
import {WorkoutsNavProp} from '../../../types';
import {addUserGym} from '../../redux/user/user.slice';

export const GymEquipmentCategoriesScreen = () => {
  const [done, setDone] = useState(false);
  const navigation = useNavigation<WorkoutsNavProp>();
  const dispatch = useAppDispatch();
  const {gymInEdit} = useAppSelector(state => state.gym);
  const {user} = useAppSelector(state => state.user);

  const {allEquipment, getAllEquipmentLoading} = useAppSelector(
    state => state.gym,
  );
  const categories = Object.keys(allEquipment) as Array<TEquipmentCategories>;

  useEffect(() => {
    dispatch(getAllEquipment());
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Button
            title="Finish"
            onPress={() => {
              if (gymInEdit.id === '') {
                const newGym: TGym = {...gymInEdit.gym, createdBy: user.name};
                dispatch(createNewGym(newGym));
                setDone(true);
              } else {
                //if editing exiting gym
                dispatch(updateGym(gymInEdit));
                navigation.navigate('WorkoutsScreen');
              }
            }}
          />
        );
      },
    });
  }, [gymInEdit]);

  useEffect(() => {
    if (done) {
      dispatch(addUserGym(gymInEdit));
      navigation.navigate('WorkoutsScreen');
    }
  }, [gymInEdit]);

  return (
    <View style={styles.container}>
      {getAllEquipmentLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <EquipmentCategories categories={categories} mode={'edit'} />
      )}
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

export default GymEquipmentCategoriesScreen;
