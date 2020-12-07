import {
    PURCHASE_BURGER_SUCCESS, 
    PURCHASE_BURGER_FAIL, 
    PURCHASE_BURGER_START, 
    PURCHASE_INIT, 
    FETCH_ORDERS_SUCCESS, 
    FETCH_ORDERS_FAIL, 
    FETCH_ORDERS_START
} from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => ({
    type: PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData
})

export const purchaseBurgerFail = error => ({
    type: PURCHASE_BURGER_FAIL,
    error
})

export const purchaseBurgerStart = () => ({
    type: PURCHASE_BURGER_START
})

export const purchaseInit = () => ({
    type: PURCHASE_INIT
})

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post(`/orders.json?auth=${token}`, orderData)
            .then(res => {
                // console.log(res);
                dispatch(purchaseBurgerSuccess(res.data.name, orderData));
            })
            .catch(err => {
                // console.log(err.response);
                dispatch(purchaseBurgerFail(err));
            })
    }
}

export const fetchOrdersSuccess = orders => ({
    type: FETCH_ORDERS_SUCCESS,
    orders
})

export const fetchOrdersFail = error => ({
    type: FETCH_ORDERS_FAIL,
    error
})

export const fetchOrdersStart = () => ({
    type: FETCH_ORDERS_START
})

export const fetchOrders = token => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get(`/orders.json?auth=${token}`)
            .then(res => {
                const fetchedOrders = [];
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            })
    }
}