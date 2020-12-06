import {PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAIL, PURCHASE_BURGER_START} from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => ({
    type: PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData
})

export const purchaseBurgerFail = (error) => ({
    type: PURCHASE_BURGER_FAIL,
    error
})

export const purchaseBurgerStart = () => ({
    type: PURCHASE_BURGER_START
})

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
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