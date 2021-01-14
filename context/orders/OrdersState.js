import React, { useReducer } from 'react';

import OrdersReducer from './OrdersReducer';
import OrdersContext from './OrdersContext';
import OrderProgress from '../../views/OrderProgress';

import { SELECT_PRODUCT, CONFIRM_ORDER, SHOW_RESUME, DELETE_ITEM, ORDER_ID } from '../../types';

const OrdersState = (props) => {

    const initialState = {
        order: [],
        item: null,
        total: 0,
        orderId: ''
    }

    const selectItem = (item) => {
        dispatch({
            type: SELECT_PRODUCT,
            payload: item
        })
    }

    const addItem = (order) => {
        dispatch({
            type: CONFIRM_ORDER,
            payload: order
        })
    }

    const showResume = (total) => {
        dispatch({
            type: SHOW_RESUME,
            payload: total
        })
    }

    const deleteItem = (id) => {
        dispatch({
            type: DELETE_ITEM,
            payload: id
        })
    }

    const getOrderId = (id) => {
        dispatch({
            type: ORDER_ID,
            payload: id
        })
    }

    const [state, dispatch] = useReducer(OrdersReducer, initialState);

    return (
        <OrdersContext.Provider
            value={{
                order: state.order,
                item: state.item,
                total: state.total,
                orderId: state.orderId,
                selectItem,
                addItem,
                showResume,
                deleteItem,
                getOrderId
            }}
        >
            {props.children}
        </OrdersContext.Provider>
    )
}

export default OrdersState;