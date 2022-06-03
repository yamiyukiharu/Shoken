import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {TWorkoutMuscleSelection} from '../../redux/workouts/workouts.slice';
import {TMuscleCategory} from '../../utils/firebase/types';
import {unCamelCase} from '../../utils/utils';

type ChipProps = {
  text: string;
  isChecked: boolean;
  onPress: () => void;
  fontSize?: number;
  style?: StyleProp<ViewStyle>;
};

const MuscleChip: React.FC<ChipProps> = ({
  text,
  style,
  isChecked,
  onPress,
  fontSize = 14,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.chipContainer,
        style,
        isChecked && {backgroundColor: '#71D4FF'},
      ]}
      onPress={onPress}>
      <Text style={{color: 'black', fontSize: fontSize}}>{text}</Text>
    </TouchableOpacity>
  );
};

type Props = {
  parentTitle: TMuscleCategory;
  childTitles: {
    [key: string]: boolean;
  };
  onPress: (musclesSelected: TWorkoutMuscleSelection) => void;
};

const MuscleSelector: React.FC<Props> = ({
  parentTitle,
  childTitles,
  onPress,
}) => {
  const [parentChecked, setParentChecked] = useState<boolean>(false);

  const isAllChildSelected = (childTitles: {[key: string]: boolean}):boolean => {
    let isAllSelected = true;
    for (const muscle in childTitles) {
      isAllSelected = childTitles[muscle] && isAllSelected;
    }
    return isAllSelected;
  };

  const onParentChipTapped = () => {
    const muscleSelection: {[key: string]: boolean} = {};

    // deselect all is all were selected, select all otherwise
    const isAllSelected = isAllChildSelected(childTitles)
    for (const muscle in childTitles) {
      muscleSelection[muscle] = !isAllSelected;
    }
    setParentChecked(!isAllChildSelected(childTitles));

    const result: TWorkoutMuscleSelection = {};
    result[parentTitle] = muscleSelection;
    onPress(result);
  };

  return (
    <View style={styles.container}>
      <MuscleChip
        style={styles.parentGroup}
        isChecked={parentChecked}
        fontSize={22}
        text={unCamelCase(parentTitle)}
        onPress={onParentChipTapped}
      />
      <View style={styles.childMusclesContainer}>
        {Object.keys(childTitles).map(muscleName => {
          const capitalizedName = unCamelCase(muscleName);

          const onChipTapped = () => {
            const result: TWorkoutMuscleSelection = {};
            result[parentTitle] = {...childTitles};
            result[parentTitle][muscleName] = !result[parentTitle][muscleName];

            setParentChecked(isAllChildSelected({...result[parentTitle]}))

            onPress(result);
          };
          return (
            <MuscleChip
              style={styles.childMuscle}
              text={capitalizedName}
              isChecked={childTitles[muscleName]}
              onPress={onChipTapped}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  chipContainer: {
    paddingHorizontal: 8,
    marginRight: 5,
    marginBottom: 8,
    paddingVertical: 5,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C5ECD2',
  },
  parentGroup: {
    height: 120,
    width: 120,
    borderRadius: 10,
  },
  childMusclesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginLeft: 5,
    flex: 1,
  },
  childMuscle: {
    marginVertical: 2,
  },
});

export default MuscleSelector;
