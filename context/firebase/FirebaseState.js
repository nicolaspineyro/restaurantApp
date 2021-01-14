import React, { useReducer } from 'react';

import firestore from '@react-native-firebase/firestore';

import FirebaseReducer from './FirebaseReducer';
import FirebaseContext from './FirebaseContext';

import _ from 'lodash';

import { GET_PRODUCTS_SUCCESS } from '../../types'

const FirebaseState = (props) => {

    const initialState = {
        menu: []
    }

    const [state, dispatch] = useReducer(FirebaseReducer, initialState);

    const getProducts = () => {

        const handleSnapshot = (snapshot) => {
            let items = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });

            items = _.sortBy(items, 'type');

            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                payload: items
            })
        }
        try {
            firestore().collection('products').where('existence', '==', true).onSnapshot(handleSnapshot);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <FirebaseContext.Provider
            value={{
                menu: state.menu,
                getProducts
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState;