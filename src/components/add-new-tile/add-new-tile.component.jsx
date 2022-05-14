import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Tile from '../tile/tile.component';

const AddNewTile = (props) => {
    return (
        <Tile {...{...props, style: [styles.container, props.style]}}>
            <MaterialIcon name={'plus-circle-outline'} size={30}/>
        </Tile>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
        flexDirection: 'column',
        backgroundColor: 'white',
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

export default AddNewTile;