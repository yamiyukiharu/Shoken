import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { TGym, TAllEquipment, TUser, TFbGymEntry, TGyms, TFbUserEntry, TAllFlattenedExercises, TAllExercises } from './types';
import { emptyUser } from '../../redux/user/user.slice';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { allExercises } from '../exercises';

const API_URL = "http://localhost:8000/v1/"

type THttpQueryParams = {
    [key:string]: string
}

const getFromEndpoint = async (endpoint:string, query?:THttpQueryParams):Promise<Response> => {
    const token = (await auth().currentUser!.getIdTokenResult()).token
    let url = API_URL + endpoint
    if (query) {
        url += new URLSearchParams(query)
    }
    return await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            Authorization: 'Bearer ' + token
        }        
    })
}

const postToEndpoint = async (endpoint:string, data:string):Promise<Response> => {
    const token = (await auth().currentUser!.getIdTokenResult()).token
    return await fetch(API_URL + endpoint, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: data    
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


export const getUserDb = async ():Promise<TUser> => {
    try {
        const response = await getFromEndpoint('user')
        const user = await response.json() as TUser
        return user
    } catch (err) {
        console.log(err)
        throw err
        
    }
}

export const setUserDb = async (userEntry: TFbUserEntry) => {
    try {
        await postToEndpoint('user', JSON.stringify(userEntry.user))
    } catch (err) {
        console.log(err)
        throw err
    }
}

// =============== GYM & EQUIPMENT ===================

export const createNewGymDb = async (gymDetails: TGym):Promise<TFbGymEntry> => {
    try {
        const response = await postToEndpoint('gyms', JSON.stringify(gymDetails))
        const gymDoc = await response.json()
        return {
            id: gymDoc._id,
            gym: gymDetails,
        }
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const updateGymDb = async (gymEntry: TFbGymEntry):Promise<TFbGymEntry> => {
    try {
        const response = await postToEndpoint('gyms', JSON.stringify(gymEntry.gym))
        const gymDoc = await response.json()
        return {id: gymDoc._id, gym: gymDoc} as TFbGymEntry
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const getGymsDb = async ():Promise<TGyms> => {
    try {
        const response = await getFromEndpoint('gyms')
        return await response.json() as TGyms
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const getAllEquipmentDb = async():Promise<TAllEquipment> => {
    try {
        const response = await getFromEndpoint('equipment')
        const allEquipment = await response.json() as TAllEquipment
        return allEquipment
    } catch (err) {
        console.log(err)
        throw err
    }
}