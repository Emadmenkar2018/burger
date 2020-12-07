import {AUTH_START, AUTH_SUCCESS, AUTH_FAIL} from './actionTypes'
import axios from '../../axios-orders'

export const authStart = () => ({
    type: AUTH_START
})

export const authSuccess = authData => ({
    type: AUTH_SUCCESS,
    authData
})

export const authFail = error => ({
    type: AUTH_FAIL,
    error
})

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());

    }
}