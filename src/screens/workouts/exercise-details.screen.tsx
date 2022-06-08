import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Tabs} from 'react-native-collapsible-tab-view';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {useNavigation} from '@react-navigation/native';
import {WorkoutsNavProp} from '../../../types';
import {updateVariation} from '../../redux/workouts/workouts.slice';
import ShokenChip from '../../components/shoken-chip/shoken-chip.component';
import {stringToColour} from '../../utils/utils';

type TEquipmentChips = Array<{
  color: string;
  equipment: string;
}>;

const ExerciseDetailsScreen = () => {
  const navigation = useNavigation<WorkoutsNavProp>();

  const dispatch = useAppDispatch();
  const {
    equipmentListDisplay,
    currentParentExercise,
    currentExerciseName,
    currentVariationEncoding,
  } = useAppSelector(state => state.workouts);

  const [equipmentToDisplay, setEquipmentToDisplay] = useState<TEquipmentChips>(
    [],
  );

  useEffect(() => {
    navigation.setOptions({headerTitle: currentExerciseName});
  }, [currentExerciseName]);

  useEffect(() => {
    const data: TEquipmentChips = [];
    equipmentListDisplay.forEach(equipmentGroup => {
      const equipment = equipmentGroup.split(', ');
      const color = stringToColour(equipment[0]);
      equipment.forEach(name =>
        data.push({
          color: color,
          equipment: name,
        }),
      );
    });
    setEquipmentToDisplay(data);
  }, [equipmentListDisplay]);

  const header = () => (
    <View style={styles.firstRow}>
      <View style={styles.exerciseImage}></View>
      <View style={styles.variationContainer}>
        {currentVariationEncoding.map((variationIndex, index) => {
          let variation = currentParentExercise.variation;
          for (let i = 0; i < index; i++) {
            variation = variation[currentVariationEncoding[i]].variation;
          }
          const variants = variation.map(variant => variant.variant);

          return (
            <View key={index}>
              <Text>Variation {index + 1}:</Text>
              <SegmentedControl
                style={styles.segmentedControl}
                selectedIndex={variationIndex}
                values={variants}
                tintColor="#EF07F"
                onChange={event => {
                  dispatch(
                    updateVariation({
                      index: index,
                      value: event.nativeEvent.selectedSegmentIndex,
                    }),
                  );
                }}
              />
            </View>
          );
        })}
      </View>
    </View>
  );

  return (
    <View style={{flexGrow: 1}}>
      <Tabs.Container renderHeader={header}>
        <Tabs.Tab name="Details">
          <Tabs.ScrollView style={styles.detailsTabContainer}>
            <Text style={styles.sectionTitle}>Equipment Required</Text>
            <View style={styles.chipContainer}>
              {equipmentToDisplay.map((data, idx) => (
                <ShokenChip
                  style={[styles.chips, {backgroundColor: data.color}]}
                  key={idx}
                  text={data.equipment}
                />
              ))}
            </View>
            <Text style={styles.sectionTitle}>Instructions</Text>
            <Text style={styles.sectionTitle}>References</Text>
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name='My Record'>

        </Tabs.Tab>
      </Tabs.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  firstRow: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
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
  recordTabContainer: {
    flexDirection: 'column',
    height: 200,
    borderWidth: 1,
    borderColor: 'black',
    flexGrow: 1,
    flex: 1,
    margin: 15,
    alignItems: 'center',
  },
  detailsTabContainer: {
    flexDirection: 'column',
    flexGrow: 1,
    padding: 20,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chips: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
});

export default ExerciseDetailsScreen;
