import React from 'react';
// import {store} from '../../redux/store'
import { Provider } from 'react-redux'
import { cleanup, fireEvent, render } from '@testing-library/react-native';
import WorkoutScreen from './workouts.screen'

describe('workouts screen', () => {

    beforeEach(() => {
        // mock user gyms from database
        jest.mock('../../utils/firebase/firestore.utils')
    })

    // it('should load existing gyms of the user', () => {
        
    //     // check if the tiles are rendered
    //     const component = (
    //         <Provider store={store}>
    //             <WorkoutScreen/>
    //         </Provider>
    //     )
    // }) 

    afterEach(() => {

    })
})