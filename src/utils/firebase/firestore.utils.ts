import firestore from '@react-native-firebase/firestore';

export type TEquipmentCategories = 'bars'|'benches'|'cardio'|'dumbbells'|'machines'|'racks'
type dict<TValue> = {[key in TEquipmentCategories]: TValue}

export interface TEquipment {
    name: string,
    weights?: Array<string>;
}

export type TAllEquipment = dict<Array<TEquipment>>

export interface TGym {
    name: string;
    address: string;
    createdBy: string;
    size: number;
    images: string[];
    equipment: TAllEquipment;
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
        let gyms:Array<TGym> = []
        querySnapshot.forEach(documentSnapshot => {
            gyms.push(documentSnapshot.data() as TGym)
        })
        // manually insert a blank image for gyms with no images
        gyms = gyms.map(gym => (gym.images === undefined || gym.images.length) ? gym : {...gym, images: [require('../../../assets/images/placeholder-image.png')]})
        return gyms;
    } catch (err) {
        throw err
    }
}

export const getEquipmentFirestore = async():Promise<TAllEquipment> => {
    try {
        const documentSnapshot = await firestore().collection('equipment').doc('generic').get()
        const data =  documentSnapshot.data() as TAllEquipment
        return data
    } catch (err) {
        throw err
    }
}