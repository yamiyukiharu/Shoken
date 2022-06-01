import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {useNavigation} from '@react-navigation/native';
import {WorkoutsNavProp} from '../../../types';
import {updateVariation} from '../../redux/workouts/workouts.slice';

const recordTab = () => <View style={styles.recordTabContainer}></View>;

const detailsTab = () => <View style={styles.detailsTabContainer}></View>;

const renderScene = SceneMap({
  Record: recordTab,
  Details: detailsTab,
});

const ExerciseDetailsScreen = () => {
  const navigation = useNavigation<WorkoutsNavProp>();

  const dispatch = useAppDispatch();
  const {currentParentExercise, currentExerciseName, currentVariationEncoding} = useAppSelector(
    state => state.workouts
  );

  useEffect(() => {
    navigation.setOptions({headerTitle: currentExerciseName});
  }, [currentExerciseName]);

  // boilerplate code for tab-view
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'Record', title: 'My Record'},
    {key: 'Details', title: 'Details'},
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'black'}}
      style={{backgroundColor: 'white'}}
      labelStyle={{color: 'black', fontSize: 12}}
    />
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.firstRow}>
        <View style={styles.exerciseImage}></View>

        <View style={styles.variationContainer}>
          {currentVariationEncoding.map((variationIndex, index) => {
            let variation = currentParentExercise.variation;
            for (let i = 0; i < index; i++) {
              variation = variation[currentVariationEncoding[i]].variation;
            }
            const selectedVariant = variation[variationIndex];
            const variants = variation.map(variant => variant.variant);

            return (
              <View>
                <Text>Variation {index + 1}:</Text>
                <SegmentedControl
                  key={index}
                  style={styles.segmentedControl}
                  selectedIndex={variationIndex}
                  values={variants}
                  tintColor="#EF07F"
                  onChange={event => {
                    dispatch(
                      updateVariation({
                        index: index,
                        value: event.nativeEvent.selectedSegmentIndex
                      }),
                    );
                  }}
                />
              </View>
            );
          })}
        </View>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        style={{backgroundColor: 'white'}}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flexDirection: 'column'},
  firstRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseImage: {
    height: 200,
    width: 200,
    borderColor: 'black',
    borderWidth: 1,
    margin: 10,
  },
  variationContainer: {
    flexDirection: 'column',
  },
  segmentedControl: {
    width: 300,
    marginVertical: 10,
  },
  recordTabContainer: {},
  detailsTabContainer: {},
});

export default ExerciseDetailsScreen;
