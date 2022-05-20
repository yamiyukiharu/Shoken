import firestore from '@react-native-firebase/firestore';
import { TGym, TAllEquipment, TEquipment, TEquipmentCategories, TUser } from './types';
import { emptyUser } from '../../redux/user/user.slice';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const getUserFirestore:(user:FirebaseAuthTypes.User) => Promise<TUser> = async (user) => {
    try {
        const documentSnapshot = await firestore().collection('users').doc(user.uid).get()
        let userData = documentSnapshot.data() as TUser
        //TODO: handle anonymous signin
        if (!userData) {
            // new user
            userData = {...emptyUser}
            userData.providerId = user.providerId
            if (user.email !== null)  userData.email = user.email
            if (user.displayName !== null)  userData.name = user.displayName
            if (user.photoURL !== null)  userData.image = user.photoURL

            await firestore().collection('users').doc(user.uid).set(userData)
        }
        return userData 
    } catch (err) {
        console.log(err)
        throw err
        
    }
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
        const querySnapshot = await firestore().collection('gyms').get({source: 'cache'});
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
        const documentSnapshot = await firestore().collection('equipment').doc('generic').get({source: 'cache'})
        const data =  documentSnapshot.data() as TAllEquipment
        return data
    } catch (err) {
        throw err
    }
}