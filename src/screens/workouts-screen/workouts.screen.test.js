import React from 'react';
import { cleanup, fireEvent, render, act, waitFor } from '@testing-library/react-native';
import { WorkoutsStackScreen } from '../navigation-stacks/workout-stack';
import { mockGym } from '../../utils/firebase/__mocks__/firestore.utils';
import {MockApp} from '../../../__mocks__/utils'
import {store} from '../../redux/store'


jest.mock('../../utils/firebase/firestore.utils')

describe('workouts screen', () => {

    test('should load existing gyms of the user', async () => {
        
        const component = (
            <MockApp>
                <WorkoutsStackScreen/>
            </MockApp>
        )
        
        const { getByText, debug } = render(component)
        
        // console.log(JSON.stringify(store.getState()))
        const gymName = await waitFor(() => (getByText(mockGym.name)))

    }) 

    afterEach(() => {

    })
})