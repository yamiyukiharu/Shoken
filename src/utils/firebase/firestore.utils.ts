import firestore from '@react-native-firebase/firestore';
import { TGym, TAllEquipment, TUser, TFbGymEntry, TGyms, TFbUserEntry, TAllFlattenedExercises, TAllExercises } from './types';
import { emptyUser } from '../../redux/user/user.slice';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { allExercises } from '../exercises';

// ================== EXERCISES =======================

// TODO: replace with call to firebase
export const getAllExercisesFirestore = async ():Promise<TAllExercises> => {
    return allExercises
}

// TODO: replace with call to firebase
// export const getAllFlattenedExercises = async ():Promise<TAllFlattenedExercises> => {
//     const data = flattenAllExercises(allExercises)
//     return data
// } 

// ==================== USER =========================


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

export const setUserFirestore:(userEntry: TFbUserEntry) => boolean = (userEntry) => {
    firestore().collection('users').doc(userEntry.id).set(userEntry.user).catch(err => {console.log(err)})
    return true
}

// =============== GYM & EQUIPMENT ===================

export const createNewGymFirestore = async (gymDetails: TGym):Promise<TFbGymEntry> => {
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

export const updateGymFirestore = async (gymEntry: TFbGymEntry):Promise<TFbGymEntry> => {
    try {
        await firestore().collection('gyms').doc(gymEntry.id).set(gymEntry.gym)
        return gymEntry
    } catch (err) {
        throw err
    }
}

export const getGymsFirestore = async ():Promise<TGyms> => {
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

export const getEquipmentFirestore = async():Promise<TAllEquipment> => {
    try {
        const documentSnapshot = await firestore().collection('equipment').doc('generic').get()
        const data =  documentSnapshot.data() as TAllEquipment
        return data
    } catch (err) {
        throw err
    }
}