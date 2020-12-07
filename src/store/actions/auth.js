import {AUTH_START, AUTH_SUCCESS, AUTH_FAIL} from './actionTypes'
import axios from 'axios'

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
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSbOdiC4GVm1LLmkw6G2_VqnJRtTk49Jo', authData)
            .then(res => {
                // console.log(res);
                dispatch(authSuccess(res.data));
            })
            .catch(err => {
                // console.log(err.response);
                dispatch(authFail(err));
            })
    }
}