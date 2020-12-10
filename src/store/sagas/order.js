import {put} from 'redux-saga/effects'
import axios from '../../axios-orders'
import * as actions from '../actions'

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    
    try {
        const res = yield axios.post(`/orders.json?auth=${action.token}`, action.orderData);
        yield put(actions.purchaseBurgerSuccess(res.data.name, action.orderData));
    }catch(err) {
        yield put(actions.purchaseBurgerFail(err));
    }
}

