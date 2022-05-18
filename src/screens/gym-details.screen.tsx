import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {
  GymDetailsScreenScreenRouteProp,
  GymEditScreenProp,
  WorkoutsScreenProp,
  WorkoutStackParamList,
} from '../../types';
import {SliderBox} from 'react-native-image-slider-box';
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import {addGym, setGymInEdit} from '../redux/gyms/gyms.slice';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useWindowDimensions} from 'react-native';
import EquipmentCategories from '../components/equipment-categories/equipment-categories.component';
import { TEquipmentCategories } from '../utils/firebase/firestore.utils';

const GymDetailsScreen = () => {
  const dispatch = useAppDispatch();
  const {gyms} = useAppSelector(state => state.gym);

  const route = useRoute<GymDetailsScreenScreenRouteProp>();
  const currentGym = gyms.find(gym => gym.name === route.params.gymName);
  const categories = currentGym ? Object.keys(currentGym.equipment) as Array<TEquipmentCategories> : [] 
  const navigation = useNavigation<WorkoutsScreenProp | GymEditScreenProp>();

  // set the top right button type depending on edit or create new mode
  navigation.setOptions({
    headerRight: () => {
      switch (route.params.mode) {
        case 'edit':
          return (
            <Button
              title="Edit"
              onPress={() => {
                currentGym && dispatch(setGymInEdit(currentGym));
                navigation.navigate('GymEditScreen', {mode: 'edit'});
              }}
            />
          );
          break;
        case 'add':
          return (
            <Button
              title="Add Gym"
              onPress={() => {
                currentGym && dispatch(addGym(currentGym));
                navigation.navigate('WorkoutsScreen');
              }}
            />
          );
          break;
        default:
          break;
      }
    },
  });

  // boilerplate code for tab-view
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'Equipment', title: 'Equipment'},
    {key: 'Info', title: 'Info'},
  ]);

  const InfoTab = () => 
    <View style={{flex: 1, height: 800}}>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
    </View>;
  

  const EquipmentTab = () => 
    <View style={styles.tabContainer}>
      {
        currentGym && <EquipmentCategories categories={categories} mode='view'/>
      }
      
    </View>;

  const renderScene = SceneMap({
    Equipment: EquipmentTab,
    Info: InfoTab,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'black'}}
      style={{backgroundColor: 'white'}}
      labelStyle={{color: 'black', fontSize: 12}}
    />
  );

  return (
    <View style={styles.container}>
      <SliderBox sliderBoxHeight={200} images={currentGym?.images} />
      <Text style={styles.title}>{currentGym?.name}</Text>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        style={{backgroundColor: 'white'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 15,
    marginLeft: 10,
  },
  tabContainer: {
    margin: 15,
    alignItems: 'center',
  }
});

export default GymDetailsScreen;