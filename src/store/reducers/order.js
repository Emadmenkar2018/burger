import {
    PURCHASE_BURGER_SUCCESS, 
    PURCHASE_BURGER_FAIL, 
    PURCHASE_BURGER_START, 
    PURCHASE_INIT, 
    FETCH_ORDERS_SUCCESS, 
    FETCH_ORDERS_FAIL, 
    FETCH_ORDERS_START
} from '../actions/actionTypes'
import {updateObject} from '../../shared/utility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = state => (
    updateObject(state, {
        purchased: false
    })
)

const purchaseBurgerStart = state => (
    updateObject(state, {
        loading: true
    })
)

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {
        id: action.orderId
    });
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    })
}

const purchaseBurgerFail = state => (
    updateObject(state, {
        loading: false
    })
)
const fetchOrderStart = state => (
    updateObject(state, {
        loading: true
    })
)

const fetchOrderSuccess = (state, action) => (
    updateObject(state, {
        loading: false,
        orders: [...action.orders]
    })
)

const fetchOrderFail = state => (
    updateObject(state, {
        loading: false
    })
)

export default (state = initialState, action) => {
    switch(action.type){
        case PURCHASE_INIT:
            return purchaseInit(state);
        case PURCHASE_BURGER_START:
            return purchaseBurgerStart(state);
        case PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action);
        case PURCHASE_BURGER_FAIL:
            return purchaseBurgerFail(state);
        case FETCH_ORDERS_START:
            return fetchOrderStart(state);
        case FETCH_ORDERS_SUCCESS:
            return fetchOrderSuccess(state, action);
        case FETCH_ORDERS_FAIL:
            return fetchOrderFail(state);
        default:
            return state;
    }
}