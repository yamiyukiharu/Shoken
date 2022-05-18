import React, {useState} from 'react';
import {Text, View, StyleSheet, Modal, Button, Alert} from 'react-native';
import NormalButton from '../components/normal-button/normal-button.component';
import {useNavigation, useRoute} from '@react-navigation/native';
import MyTextInput from '../components/my-text-input/my-text-input.component';
import MyImagePicker from '../components/image-picker/image-picker.component';

import {useAppSelector, useAppDispatch} from '../redux/hooks';
import {gymInitialState, setGymInEdit} from '../redux/gyms/gyms.slice';
import {
  WorkoutsNavProp,
  GymEditScreenRouteProp,
} from '../../types';

const GymEditScreen: React.FC = () => {
  const navigation = useNavigation<WorkoutsNavProp>();
  const route = useRoute<GymEditScreenRouteProp>();
  const dispatch = useAppDispatch();
  const {gymInEdit} = useAppSelector(state => state.gym);

  navigation.setOptions(
    route.params.mode === 'new'
      ? {
          headerTitle: 'Create New Gym',
        }
      : {headerTitle: 'Edit Gym'},
  );

  const onGymNameChange: (text: string) => void = text => {
    dispatch(setGymInEdit({...gymInEdit, name: text}));
  };

  return (
    <View style={styles.container}>
      <MyImagePicker />
      <View style={styles.formContainer}>
        <Text> Gym Name: * </Text>
        <MyTextInput
          value={gymInEdit.name}
          placeholder="Enter gym name..."
          onChangeText={onGymNameChange}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <NormalButton
          text={'Cancel'}
          inverted={true}
          onPress={() => {
            // reset gymInEdit to empty state
            dispatch(setGymInEdit(gymInitialState.gymInEdit));
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
  formContainer: {
    marginTop: 20,
    flexDirection: 'column',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom: 40,
  },
  button: {
    marginLeft: 20,
  },
});

export default GymEditScreen;
