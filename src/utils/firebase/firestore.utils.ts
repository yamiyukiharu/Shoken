import firestore from '@react-native-firebase/firestore';

export interface TGym {
    name: string;
    address: string;
    createdBy: string;
    size: number;
    equipment: { [key: string]: Array<string>};
}

export const createNewGymFirestore = async (gymDetails: TGym):Promise<TGym> => {
    try {
        await firestore().collection('gyms').add(gymDetails)
        return gymDetails
    } catch (err) {
        throw err
    }
}

export const getGymsFirestore = async ():Promise<Array<TGym>> => {
    try {
        const querySnapshot = await firestore().collection('gyms').get();
        const gyms:Array<TGym> = []
        querySnapshot.forEach(documentSnapshot => {
            gyms.push(documentSnapshot.data() as TGym)
        })
        return gyms;
    } catch (err) {
        throw err
    }
}