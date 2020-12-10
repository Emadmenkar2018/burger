import {takeEvery, all, takeLatest} from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes'
import {
    logoutSaga, 
    checkAuthTimeoutSaga, 
    authUserSaga, 
    authCheckStateSaga
} from './auth'
import {initIngredientsSaga} from './burgerBuilder'
import {purchaseBurgerSaga, fetchOrdersSaga} from './order'

export function* watchAuth() {
    // all: to run multiple tasks simultaneously
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ])
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
    // takeLatest will automatically cancel any ongoing executions and only excute the latest one
    yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}