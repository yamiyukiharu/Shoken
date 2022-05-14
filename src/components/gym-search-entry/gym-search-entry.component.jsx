import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const images = [
    "https://source.unsplash.com/1024x768/?nature",
    "https://source.unsplash.com/1024x768/?water",
    "https://source.unsplash.com/1024x768/?girl",
    "https://source.unsplash.com/1024x768/?tree", // Network image
  ]

const GymSearchEntry = ({gymName}) => {
    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <Text  style={styles.title}>{gymName}</Text>
                <MaterialIcon name={'arrow-forward-ios'} size={30}/>
            </View>
            <View style={styles.content}>
                <SliderBox images={images} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        borderColor: 'gray',
        borderBottomWidth: 1,
        padding: 5,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        flexDirection: 'row',
    },
})

export default GymSearchEntry;