import { useRoute } from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import { ExerciseSubCategoryScreenRouteProp } from '../../../types';
import ShokenTile from '../../components/shoken-tile/shoken-tile.component';
import { unCamelCase } from '../../utils/utils';


const ExerciseSubCategoryScreen = () => {
  const route = useRoute<ExerciseSubCategoryScreenRouteProp>()

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Muscles</Text>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={[...route.params.muscles, 'All']}
        renderItem={({item}) => {
          const title = unCamelCase(item)
          return (
            <ShokenTile
              title={title}
              style={styles.tile}
              addNew={false}
              accessibilityLabel={item}
              onPress={() => {}}
            />
          );
        }}
      />
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
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  tile: {
    height: 150,
    width: 150,
  },
});

export default ExerciseSubCategoryScreen;
