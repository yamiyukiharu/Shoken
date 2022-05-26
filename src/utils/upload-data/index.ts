
import {initializeApp} from 'firebase/app'
import {getFirestore, doc, setDoc, collection} from 'firebase/firestore'
import { TExerciseGroup } from './workouts';

const firebaseConfig = {
  apiKey: 'AIzaSyA5YS0LpyBm4N9EvznPv12e_US_6YeFzUw',
  authDomain: 'shoken-1d9fb.firebaseapp.com',
  projectId: 'shoken-1d9fb',
  storageBucket: 'shoken-1d9fb.appspot.com',
  messagingSenderId: '30686071235',
  appId: '1:30686071235:web:45eb226f83dc9071b55576',
  measurementId: 'G-XSK36NT9Z8',
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();

export async function addCollectionAndDocuments(
  collectionKey: string,
  docName: string,
  objectsToAdd: TExerciseGroup,
) {
  const collectionRef = collection(db, collectionKey);

  const docRef = doc(collectionRef, docName);
  await setDoc(docRef, objectsToAdd);

  console.log('done');
};

// module.exports = { 
//   addCollectionAndDocuments
// };
