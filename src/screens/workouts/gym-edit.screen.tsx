import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Modal, Button, Alert, KeyboardAvoidingView} from 'react-native';
import NormalButton from '../../components/normal-button/normal-button.component';
import {useNavigation, useRoute} from '@react-navigation/native';
import MyTextInput from '../../components/my-text-input/my-text-input.component';
import MyImagePicker from '../../components/image-picker/image-picker.component';

import {useAppSelector, useAppDispatch} from '../../redux/hooks';
import {gymInitialState, setGymInEdit} from '../../redux/gyms/gyms.slice';
import {WorkoutsNavProp, GymEditScreenRouteProp} from '../../../types';
import {ScrollView} from 'react-native-gesture-handler';

const GymEditScreen = () => {
  const navigation = useNavigation<WorkoutsNavProp>();
  const route = useRoute<GymEditScreenRouteProp>();
  const dispatch = useAppDispatch();
  const {gymInEdit} = useAppSelector(state => state.gym);
  const gym = gymInEdit.gym;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.mode === 'new' ? 'Create New Gym' : 'Edit Gym',
      headerRight: () => {
        return(
          <Button title='Next' onPress={() => navigation.navigate('GymEquipmentCategoriesScreen')}/>
        )
      }
    }
    );
  }, []);

  const onGymNameChange: (text: string) => void = text => {
    dispatch(
      setGymInEdit({
        id: gymInEdit.id,
        gym: {...gym, name: text},
      }),
    );
  };

  const onCityChange: (text: string) => void = text => {
    dispatch(
      setGymInEdit({
        id: gymInEdit.id,
        gym: {...gym, address: text},
      }),
    );
  };

  const onSizeChange: (text: string) => void = text => {
    dispatch(
      setGymInEdit({
        id: gymInEdit.id,
        gym: {...gym, size: Number(text)},
      }),
    );
  };

  return (
    <KeyboardAvoidingView>
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <MyImagePicker />
      <View style={styles.formContainer}>
        <Text> Gym Name: * </Text>
        <MyTextInput
          value={gym.name}
          placeholder="Enter gym name..."
          onChangeText={onGymNameChange}
        />
        <Text> City: </Text>
        <MyTextInput
          value={gym.address}
          placeholder="City"
          onChangeText={onCityChange}
        />
        <Text> Size: </Text>
        <MyTextInput
          value={gym.size.toString()}
          placeholder="sqft"
          onChangeText={onSizeChange}
        />
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
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
