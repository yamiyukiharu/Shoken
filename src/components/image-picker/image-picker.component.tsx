import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import BottomSheet from 'react-native-bottomsheet';
import {useAppDispatch, useAppSelector} from '../../redux/hooks'
import { setGymInEdit } from '../../redux/gyms/gyms.slice'

type SheetState = 'library' | 'camera' | 'cancel';

const MyImagePicker: React.FC = () => {
  const [sheetState, setSheetState] = useState<SheetState>('cancel');

  const dispatch = useAppDispatch()
  const {gymInEdit} = useAppSelector(state => state.gym)

  const options: ImageLibraryOptions = {
    mediaType: 'photo',
  };

  useEffect(() => {
    const openLibrary = async () => {
      const res = await launchImageLibrary(options, response => {
        if (response.assets) {
          response.assets[0].uri &&
            dispatch(setGymInEdit({...gymInEdit, images: [response.assets[0].uri]}))
        }
        setSheetState('cancel');
      });
    };

    const openCamera = async () => {
      const res = await launchCamera(options, response => {
        console.log(response);
        if (response.assets) {
          response.assets[0].uri &&
          dispatch(setGymInEdit({...gymInEdit, images: [response.assets[0].uri]}))
        }
        setSheetState('cancel');
      });
    };

    switch (sheetState) {
      case 'library':
        openLibrary();
        break;
      case 'camera':
        openCamera();
        break;
      default:
        break;
    }
  }, [sheetState]);

  const selectFile = () => {
    BottomSheet.showBottomSheetWithOptions(
      {
        options: ['Choose from photo library', 'Take from camera', 'Cancel'],
        title: 'Upload gym image',
        dark: true,
        cancelButtonIndex: 2,
      },
      value => {
        switch (value) {
          case 0:
            setSheetState('library');
            break;
          case 1:
            setSheetState('camera');
            break;
          case 2:
            setSheetState('cancel');
            break;
          default:
            break;
        }
      },
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={selectFile}>
      {gymInEdit.image !== '' && (
        <Image
          style={{width: '100%', height: '100%'}}
          source={{uri: gymInEdit.image}}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    height: 200,
    width: 200,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
});

export default MyImagePicker;
