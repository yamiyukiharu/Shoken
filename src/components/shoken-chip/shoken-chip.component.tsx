import React  from "react";
import { View, StyleSheet, Text, StyleProp, ViewProps } from "react-native";

type Props = {
  text:string;
  style?: StyleProp<ViewProps>
}

const ShokenChip:React.FC<Props> = ({text, style}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={{color: 'white'}}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 4,
  }
})

export default ShokenChip