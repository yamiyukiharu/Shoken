import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

interface MyTextInputArguments {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
}

const MyTextInput: React.FC<MyTextInputArguments> = (props) => {
  return (
    <View>
      <TextInput style={styles.input} {...props}/>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: 'grey',
    fontSize: 14,
    padding: 10,
    width: 250,
    marginVertical: 10,
  },
});

export default MyTextInput;
