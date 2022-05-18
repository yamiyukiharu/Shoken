import React from 'react';
import {GestureResponderEvent, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';

interface ButtonArguments {
  text: string;
  onPress: () => void;
  inverted?: boolean;
  style?: StyleProp<ViewStyle>;
}

const NormalButton: React.FC<ButtonArguments> = ({text, onPress, inverted, style}) => {
  const containerStyle = inverted
    ? [styles.container, styles.inverted]
    : styles.container;
  const textStyle = inverted ? [styles.text, styles.inverted] : styles.text;

  return (
      <TouchableOpacity onPress={onPress} style={[containerStyle, style]}>
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    elevation: 3,
    backgroundColor: 'black',
    borderWidth: 1,
    width: 150,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  inverted: {
    color: 'black',
    backgroundColor: 'white',
    borderColor: 'black',
  },
});

export default NormalButton;
