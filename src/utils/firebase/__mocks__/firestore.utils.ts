import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import type {
  TGym,
  TUser,
  TGyms,
} from '../types';

export const mockGym: TGym = {
  name: 'Mock Gym',
  address: 'Blk 12, St 23, 45678 Singapore',
  createdBy: 'mockUser',
  size: 2000,
  // images: [
  //   'https://www.google.com/url?sa=i&url=https%3A%2F%2Femilypost.com%2Fadvice%2Fdos-and-donts-at-the-gym&psig=AOvVaw3o34vnmaliSESfi-ZkWooy&ust=1653025285293000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNDPjZvt6vcCFQAAAAAdAAAAABAO',
  // ],
  images: [],
  equipment: {
    barbells: [
      {
        name: 'fixed barbell',
        weights: ['15kg', '20kg'],
      },
    ],
    benches: [],
    cardio: [],
    weights: [],
    machines: [],
    racks: [],
  },
};

const mockUser:TUser = {
  name: 'Mr Mock',
  email: 'mock@gmail.com',
  height: 175,
  image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fengineering.unl.edu%2Fkayla-person%2F&psig=AOvVaw07nnM8jTjWJVgTRKJ9TEt3&ust=1653105543810000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCPjstZiY7fcCFQAAAAAdAAAAABAT',
  level: 99,
  providerId: 'firebase',
  weight: 50,
  savedGyms: ['mockGym'],
  savedWorkouts: [],
}

export const getGymsDb = async (): Promise<TGyms> => {
  return {
    'mockGym': mockGym
  }
};

export const getUserDb:(user:FirebaseAuthTypes.User) => Promise<TUser> = async (user) => {
  return mockUser
}

// export const createNewGymDb = async (gymDetails: TGym):Promise<TGym> => {
//     try {
//         await firestore().collection('gyms').add(gymDetails)
//         return gymDetails
//     } catch (err) {
//         throw err
//     }
// }

// export const getEquipmentDb = async():Promise<TAllEquipment> => {
//     try {
//         const documentSnapshot = await firestore().collection('equipment').doc('generic').get()
//         const data =  documentSnapshot.data() as TAllEquipment
//         return data
//     } catch (err) {
//         throw err
//     }
// }
