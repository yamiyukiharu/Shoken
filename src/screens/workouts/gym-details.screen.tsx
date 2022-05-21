import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {GymDetailsScreenScreenRouteProp, WorkoutsNavProp} from '../../../types';
import {SliderBox} from 'react-native-image-slider-box';
import {useAppSelector, useAppDispatch} from '../../redux/hooks';
import {setGymInEdit} from '../../redux/gyms/gyms.slice';
import {addUserGym, removeUserGym} from '../../redux/user/user.slice';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import EquipmentCategories from '../../components/equipment-categories/equipment-categories.component';
import {TEquipmentCategories} from '../../utils/firebase/types';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const GymDetailsScreen = () => {
  const dispatch = useAppDispatch();
  const {currentGym} = useAppSelector(state => state.gym);
  const {user} = useAppSelector(state => state.user);
  const route = useRoute<GymDetailsScreenScreenRouteProp>();
  const gym = currentGym.gym;
  const categories = Object.keys(gym.equipment) as Array<TEquipmentCategories>;
  const navigation = useNavigation<WorkoutsNavProp>();

  const onEditTapped = () => {
    dispatch(setGymInEdit(currentGym))
    navigation.navigate('GymEditScreen', {mode: 'edit'})
  }

  const onRemoveTapped = () => {
    dispatch(removeUserGym(currentGym))
    navigation.navigate('WorkoutsScreen')
  }

  // set the top right button type depending on edit or create new mode
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        switch (route.params.mode) {
          case 'edit':
            return (
              // <Button
              //   title="Edit"
              //   onPress={() => {
              //     dispatch(setGymInEdit(currentGym));
              //     navigation.navigate('GymEditScreen', {mode: 'edit'});
              //   }}
              // />
              <Menu>
              <MenuTrigger>
                <MaterialIcon name={'dots-horizontal'} size={28} color={'#007AFF'} />
                </MenuTrigger>
              <MenuOptions optionsContainerStyle={styles.menuContainer}>
                <MenuOption onSelect={onEditTapped}> 
                  <Text style={styles.menuOption}>Edit</Text>
                </MenuOption>
                <MenuOption onSelect={onRemoveTapped} >
                  <Text style={styles.menuOption}>Remove</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
            );
            break;
          case 'add':
            if (!user.savedGyms.includes(currentGym.id)) {
              return (
                <Button
                  title="Add Gym"
                  onPress={() => {
                    dispatch(addUserGym(currentGym));
                    navigation.navigate('WorkoutsScreen');
                  }}
                />
              );
            }
            break;
          default:
            break;
        }
      },
    });
  }, []);

  // boilerplate code for tab-view
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'Info', title: 'Info'},
    {key: 'Equipment', title: 'Equipment'},
  ]);

  const InfoTab = () => (
    <View style={styles.infoTabContainer}>
      <View style={styles.row}>
        <Text style={styles.subtitle}>Created By:</Text>
        <Text>{gym.createdBy}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.subtitle}>City:</Text>
        <Text>{gym.address}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.subtitle}>Size:</Text>
        <Text>{gym.size}</Text>
      </View>
    </View>
  );

  const EquipmentTab = () => (
    <View style={styles.EquipmentTabContainer}>
      {<EquipmentCategories categories={categories} mode="view" />}
    </View>
  );

  const renderScene = SceneMap({
    Info: InfoTab,
    Equipment: EquipmentTab,
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
      <SliderBox
        sliderBoxHeight={200}
        images={
          // manually insert a blank image for gyms with no images
          gym.images.length === 0
            ? [require('../../../assets/images/placeholder-image.png')]
            : gym.images
        }
      />
      <Text style={styles.title}>{gym.name}</Text>
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
    flexGrow: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 15,
    marginLeft: 10,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  EquipmentTabContainer: {
    flexDirection: 'column',
    flexGrow: 1,
    margin: 15,
    alignItems: 'center',
  },
  infoTabContainer: {
    flexDirection: 'column',
    flexGrow: 1,
    margin: 15,
  },
  menuOption: {
    fontSize: 14,
    padding: 10,
  },
  menuContainer : {
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    borderRadius: 10
  }
});

export default GymDetailsScreen;
