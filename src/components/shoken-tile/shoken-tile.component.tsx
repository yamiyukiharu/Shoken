import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { capitalizeWords, unCamelCase } from '../../utils/utils';

interface Props {
  style: StyleProp<ViewStyle>;
  onPress: () => void;
  title?: string;
  details?: String;
  addNew: boolean;
  accessibilityLabel?: string;
}

const ShokenTile: React.FC<Props> = props => {
  return (
    <TouchableOpacity
      accessible={true}
      {...props}
      style={[styles.container, props.style ]}>
      {props.title && (
        <Text style={styles.title}>
          {props.title && capitalizeWords(unCamelCase(props.title))}
        </Text>
      )}
      {props.addNew && <MaterialIcon name={'plus-circle-outline'} size={30} />}
      {props.details && (
        <Text style={styles.details}>{props.details && props.details}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 10,
    padding: 10,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '0x000000',
    shadowRadius: 1,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ShokenTile;
