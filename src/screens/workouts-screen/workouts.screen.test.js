import React from 'react';
import { cleanup, fireEvent, render, act, waitFor } from '@testing-library/react-native';
import { WorkoutsStackScreen } from '../navigation-stacks/workout-stack';
import { mockGym } from '../../utils/firebase/__mocks__/firestore.utils';
import {MockApp} from '../../../__mocks__/utils'
import {store} from '../../redux/store'

jest.mock('../../utils/firebase/firestore.utils')

let component = undefined

describe('workouts screen', () => {

    beforeEach(() => {
        component = (
            <MockApp>
                <WorkoutsStackScreen/>
            </MockApp>
        )
    })

    test('should load existing gyms of the user', async () => {
        
        const { getByText, debug } = render(component)
        // console.log(JSON.stringify(store.getState()))
        const gymName = await waitFor(() => (getByText(mockGym.name)))

    }) 

    test('route to add from existing gyms', async () => {
        const { getByLabelText, debug } = render(component)
        const addNewGymButton = await waitFor(() => (getByLabelText('add new gym')))

        fireEvent(addNewGymButton, 'press')
    })

    afterEach(() => {

    })
})