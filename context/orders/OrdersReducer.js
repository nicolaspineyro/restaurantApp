import { SELECT_PRODUCT, CONFIRM_ORDER, SHOW_RESUME, DELETE_ITEM, ORDER_ID } from "../../types";

export default (state, action) => {
    switch (action.type) {
        case SELECT_PRODUCT:
            return {
                ...state,
                item: action.payload
            }
        case CONFIRM_ORDER:
            return {
                ...state,
                order: [...state.order, action.payload]
            }
        case SHOW_RESUME:
            return {
                ...state,
                total: action.payload
            }
        case DELETE_ITEM:
            return {
                ...state,
                order: state.order.filter(item => item.id !== action.payload)
            }
        case ORDER_ID: 
            return {
                ...state,
                order: [],
                total: 0,
                orderId: action.payload,

            }
        default: return state;
    }
}