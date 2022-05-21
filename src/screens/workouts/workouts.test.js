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
        // console.log(JSON.stringify(store.getState()))
        // await new Promise((r) => setTimeout(r, 100));

    test('load saved gyms of the user', async () => {
        
        const { getByText, debug } = render(component)

        const gymName = await waitFor(() => (getByText(mockGym.name)))
    }) 

    test('add from existing gyms', async () => {
        const { getByLabelText, getByText, debug } = render(component)
        const addNewGymButton = await waitFor(() => (getByLabelText('add new gym')))
        
        // tap on add gym button
        fireEvent(addNewGymButton, 'press')
 
        // check if navigated to add gym screen
        const createdByLabel = getByText('Created by:')
        const gymCreatorLabel = getByText(mockGym.createdBy)

        // tap on gym entry
        const gymEntry = getByLabelText(mockGym.name + ' entry')
        // unable to proceed, problem with react-native-pager-view
        // fireEvent(gymEntry, 'press')

        // check if navigated to gym details screen

    })

    test('create new gym', async () => {
        const { getByLabelText, getByText, debug } = render(component)
        const addNewGymButton = await waitFor(() => (getByLabelText('add new gym')))

        fireEvent(addNewGymButton, 'press')
        const createNewButton = getByText('Create New')
        fireEvent(createNewButton, 'press')

    })

    afterEach(() => {

    })
})