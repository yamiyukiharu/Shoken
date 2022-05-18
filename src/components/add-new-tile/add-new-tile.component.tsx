import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Tile from '../tile/tile.component';

interface Props {
    style: StyleProp<ViewStyle>;
    onPress: ()=>void;
    title?: string;
    details?: String;
}

const AddNewTile:React.FC<Props> = (props) => {
    return (
        <Tile {...{...props, style: [styles.container, props.style]}}>
            <Text style={styles.title}>{props.title && props.title.toLocaleUpperCase()}</Text>
            <MaterialIcon name={'plus-circle-outline'} size={30}/>
            <Text style={styles.details}>{props.details && props.details}</Text>
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
    title: {
        fontSize: 20,
        marginBottom: 'auto',
    },
    details: {
        fontSize: 14,
        marginTop: 'auto',
    }

})

export default AddNewTile;