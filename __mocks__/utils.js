// export const setupModulesMock = (() => {
//     jest.mock('@react-native-firebase/firestore', () => {
//         return () => ({
//             log: jest.fn(),
//             recordError: jest.fn(),
//             // Any function you want to use or mock
//         });
//     });
import React from "react";
import { NavigationContainer } from "@react-navigation/native"
import { Provider } from "react-redux"
import { store } from "../src/redux/store"

import { useAppDispatch } from "../src/redux/hooks";
import { initUser } from "../src/redux/user/user.slice";

const MockAppBody = ({children}) => {
    // mock sign in
    const dispatch = useAppDispatch()
    dispatch(initUser({}))

    return (
        <NavigationContainer>
            {children}           
        </NavigationContainer>
    )
}

export const MockApp = ({children}) => {
    return (
        <Provider store={store}>
            <MockAppBody>
                {children}
            </MockAppBody>
        </Provider>
    )

}