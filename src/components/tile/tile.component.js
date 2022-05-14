import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';



const Tile = ({style, text, children, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container, style]}>
                {children}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
        flexDirection: 'column',
        backgroundColor: 'pink',
        borderRadius: 10,
        shadowColor: '0x000000',
        shadowRadius: 2,
        shadowOpacity: 0.4,
        shadowOffset: {
            width: 0,
            height: 0,
        },
    },

})

export default Tile;