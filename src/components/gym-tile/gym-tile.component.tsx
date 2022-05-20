import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { WorkoutsNavProp } from "../../../types";
import { TFbGymEntry } from "../../utils/firebase/types";
import Tile from "../tile/tile.component";
import {useAppDispatch} from '../../redux/hooks'
import {setCurrentGym} from '../../redux/gyms/gyms.slice'

type Props = {
    gymEntry: TFbGymEntry;
    style: StyleProp<ViewStyle>;
}


const GymTile:React.FC<Props> = ({gymEntry, style}) => {
    const name = gymEntry.gym.name
    const navigation = useNavigation<WorkoutsNavProp>()
    const dispatch = useAppDispatch()

    const onGymTapped = () => {
        dispatch(setCurrentGym(gymEntry))    
        navigation.navigate('GymDetailsScreen', {mode: 'edit'})
    }

    return (
        <Tile style={style} onPress={onGymTapped}>
            <Text style={styles.title}>{name}</Text>
        </Tile>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 14,
    }
})

export default GymTile