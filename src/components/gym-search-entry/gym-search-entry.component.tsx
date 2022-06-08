import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { WorkoutsNavProp } from '../../../types';
import { setCurrentGym } from '../../redux/gyms/gyms.slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { TFbGymEntry } from '../../utils/firebase/types';

type Props = {
  gymEntry: TFbGymEntry;
  onPress?: () => void
}

const GymSearchEntry: React.FC<Props> = ({gymEntry, onPress}) => {
  const [width, setWidth] = useState(0);
  const navigation = useNavigation<WorkoutsNavProp>()
  const dispatch = useAppDispatch()
  const gym = gymEntry.gym

  const onEntryTapped = () => {
      dispatch(setCurrentGym(gymEntry))
      navigation.navigate('GymDetailsScreen', {mode:'add'})
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress || onEntryTapped} accessible={true} accessibilityLabel={gym.name + ' entry'}>
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
