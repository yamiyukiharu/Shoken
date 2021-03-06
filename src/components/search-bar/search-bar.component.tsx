import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
    placeholder: string;
    onChangeText: (text:string) => void;
}

const SearchBar:React.FC<Props> = (props) => {


    return (
        <View style={styles.container}>
            <MaterialIcon name={'magnify'} size={30}/>
            <TextInput style={styles.searchText} {...props}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        shadowColor: '0x000000',
        shadowRadius: 2,
        shadowOpacity: 0.4,
        shadowOffset: {
            width: 0,
            height: 0,
        },
    },
    searchText: {
        marginHorizontal: 10,
        fontSize: 18,
    }
})

export default SearchBar;