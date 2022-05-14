import React from 'react';
import {Text, View, StyleSheet, ScrollView, Button} from 'react-native';
import { createNewGym } from '../redux/gyms/gyms.slice';
import { useAppDispatch } from '../redux/hooks';



const GymEditScreen = () => {

    const dispatch = useAppDispatch()
    const dummyData = {
        name: 'dummy gym'
    }

    return (
        <ScrollView>
            <View  style={styles.container}>
                <Button title='Create Gym' onPress={() => dispatch(createNewGym(dummyData))}/>        
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default GymEditScreen;