import React  from "react";
import { View, StyleSheet, Text, StyleProp, ViewStyle } from "react-native";

type Props = {
  text:string;
  fontSize?: number;
  style?: StyleProp<ViewStyle>
}

const ShokenChip:React.FC<Props> = ({text, style, fontSize=14}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={{color: 'white', fontSize: fontSize}}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default ShokenChip