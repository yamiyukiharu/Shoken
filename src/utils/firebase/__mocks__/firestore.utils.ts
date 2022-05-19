import type {
  TAllEquipment,
  TEquipmentCategories,
  TEquipment,
  TGym,
} from '../firestore.utils';

export const mockGym: TGym = {
  name: 'Mock Gym',
  address: 'Blk 12, St 23, 45678 Singapore',
  createdBy: 'mockUser',
  size: 2000,
  images: [
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Femilypost.com%2Fadvice%2Fdos-and-donts-at-the-gym&psig=AOvVaw3o34vnmaliSESfi-ZkWooy&ust=1653025285293000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNDPjZvt6vcCFQAAAAAdAAAAABAO',
  ],
  equipment: {
    bars: [
      {
        name: 'fixed barbell',
        weights: ['15kg', '20kg'],
      },
    ],
    benches: [],
    cardio: [],
    dumbbells: [],
    machines: [],
    racks: [],
  },
};

export const getGymsFirestore = async (): Promise<Array<TGym>> => {
  return [mockGym]
};

// export const createNewGymFirestore = async (gymDetails: TGym):Promise<TGym> => {
//     try {
//         await firestore().collection('gyms').add(gymDetails)
//         return gymDetails
//     } catch (err) {
//         throw err
//     }
// }

// export const getEquipmentFirestore = async():Promise<TAllEquipment> => {
//     try {
//         const documentSnapshot = await firestore().collection('equipment').doc('generic').get()
//         const data =  documentSnapshot.data() as TAllEquipment
//         return data
//     } catch (err) {
//         throw err
//     }
// }
