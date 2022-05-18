import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { WorkoutsNavProp } from "../../../types";
import Tile from "../tile/tile.component";

type Props = {
    gymName: string;
    style: StyleProp<ViewStyle>;
}


const GymTile:React.FC<Props> = ({gymName, style}) => {
    const navigation = useNavigation<WorkoutsNavProp>()
    const onGymTapped = () => {
        navigation.navigate('GymDetailsScreen', {gymName: gymName, mode: 'edit'})
    }

    return (
        <Tile style={style} onPress={onGymTapped}>
            <Text style={styles.title}>{gymName}</Text>
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