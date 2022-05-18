import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { GymDetailsScreenProp } from '../../../types';
import { useAppSelector } from '../../redux/hooks';
import { TGym } from '../../utils/firebase/firestore.utils';

const GymSearchEntry: React.FC<{gym: TGym}> = ({gym}) => {
  const [width, setWidth] = useState(0);
  const navigation = useNavigation<GymDetailsScreenProp>()
  const {savedGyms} = useAppSelector(state => state.gym)

  const onEntryTapped = () => {
    if (savedGyms.filter(savedGym => savedGym.name === gym.name).length > 0) {
      navigation.navigate('GymDetailsScreen', {gymName: gym.name, mode:'none'})
    } else {
      navigation.navigate('GymDetailsScreen', {gymName: gym.name, mode:'add'})
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onEntryTapped}>
        <View style={styles.topRow}>
          <Text style={styles.title}>{gym.name}</Text>
          <MaterialIcon name={'arrow-forward-ios'} size={30} />
        </View>
        <View
          style={styles.content}
          onLayout={e => setWidth(e.nativeEvent.layout.width)}>
          <SliderBox
            parentWidth={width / 2}
            sliderBoxHeight={150}
            images={gym.images}
          />
          <View style={styles.info}>
            <Text style={{fontWeight: 'bold'}}>Created by:</Text>
            <Text>{gym.createdBy}</Text>
            <Text style={{fontWeight: 'bold'}}>Size:</Text>
            <Text>{gym.size ? gym.size : 'N/A'}</Text>
            <Text style={{fontWeight: 'bold'}}>Ratings:</Text>
            <Text>{'N/A'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderColor: 'gray',
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flexDirection: 'row',
  },
  info: {
    flexDirection: 'column',
    padding: 20,
    justifyContent: 'space-between',
  },
});

export default GymSearchEntry;
