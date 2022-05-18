import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';

type Props = {
    style? :StyleProp<ViewStyle>;
    children?: JSX.Element | JSX.Element[];
    onPress: ()=>void;
}

const Tile:React.FC<Props> = ({style, children, onPress }) => {
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
        alignItems: 'center',
        justifyContent: 'center',
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

export default Tile;