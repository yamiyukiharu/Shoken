import React from 'react';
import {store} from '../../redux/store'
import { Provider } from 'react-redux'
import { cleanup, fireEvent, render, act, waitFor } from '@testing-library/react-native';
import WorkoutScreen from './workouts.screen'
import { NavigationContainer } from '@react-navigation/native';
import { mockGym } from '../../utils/firebase/__mocks__/firestore.utils';

jest.mock('../../utils/firebase/firestore.utils')

describe('workouts screen', () => {

    test('should load existing gyms of the user', async () => {
        
        // check if the gym tiles are rendered
        const component = (
            <Provider store={store}>
                <NavigationContainer>
                    <WorkoutScreen/>            
                </NavigationContainer>
            </Provider>
        )

        const { getByText, debug } = await waitFor(() => render(component)) 
        
        console.log(JSON.stringify(store.getState()))
        const gymName = await getByText(mockGym.name)

    }) 

    afterEach(() => {

    })
})