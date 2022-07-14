import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { TGym, TAllEquipment, TUser, TFbGymEntry, TGyms, TFbUserEntry, TAllFlattenedExercises, TAllExercises } from './types';
import { emptyUser } from '../../redux/user/user.slice';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { allExercises } from '../exercises';

const API_URL = "http://localhost:8000/v1/"

const getFromEndpoint = async (endpoint:string):Response => {
    const token = (await auth().currentUser!.getIdTokenResult()).token
    return await fetch(API_URL + endpoint, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        }        
    })

}

// ================== EXERCISES =======================

// TODO: replace with call to firebase
export const getAllExercisesDb = async ():Promise<TAllExercises> => {
    try {
        const response = await getFromEndpoint('exercises')
        const allExercises = await response.json()
        return allExercises
    } catch(err) {
        throw err
    }

}

// TODO: replace with call to firebase
// export const getAllFlattenedExercises = async ():Promise<TAllFlattenedExercises> => {
//     const data = flattenAllExercises(allExercises)
//     return data
// } 

// ==================== USER =========================


export const getUserDb:(user:FirebaseAuthTypes.User) => Promise<TUser> = async (user) => {
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

export const setUserDb:(userEntry: TFbUserEntry) => boolean = (userEntry) => {
    firestore().collection('users').doc(userEntry.id).set(userEntry.user).catch(err => {console.log(err)})
    return true
}

// =============== GYM & EQUIPMENT ===================

export const createNewGymDb = async (gymDetails: TGym):Promise<TFbGymEntry> => {
    try {
        const documentReference = await firestore().collection('gyms').add(gymDetails)
        return {
            id: documentReference.id,
            gym: gymDetails,
        }
    } catch (err) {
        throw err
    }
}

export const updateGymDb = async (gymEntry: TFbGymEntry):Promise<TFbGymEntry> => {
    try {
        await firestore().collection('gyms').doc(gymEntry.id).set(gymEntry.gym)
        return gymEntry
    } catch (err) {
        throw err
    }
}

export const getGymsDb = async ():Promise<TGyms> => {
    try {
        const querySnapshot = await firestore().collection('gyms').get();
        let gyms:TGyms = {}
        querySnapshot.forEach(documentSnapshot => {
            gyms[documentSnapshot.id] = documentSnapshot.data() as TGym

        })
        return gyms;
    } catch (err) {
        throw err
    }
}

export const getEquipmentDb = async():Promise<TAllEquipment> => {
    try {
        const response = await getFromEndpoint('equipment')
        const allEquipment = await response.json() as TAllEquipment
        console.log(allEquipment)
        return allEquipment
    } catch (err) {
        throw err
    }
}