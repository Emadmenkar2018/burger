import {
    AUTH_START, AUTH_SUCCESS, 
    AUTH_FAIL, AUTH_LOGOUT, 
    SET_AUTH_REDIRECT_PATH
} from './actionTypes'
import axios from 'axios'

export const authStart = () => ({
    type: AUTH_START
})

export const authSuccess = (idToken, userId) => ({
    type: AUTH_SUCCESS,
    idToken,
    userId
})

export const authFail = error => ({
    type: AUTH_FAIL,
    error
})

export const logout = () => ({
    type: AUTH_LOGOUT
})

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        let url = isSignup ? 
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSbOdiC4GVm1LLmkw6G2_VqnJRtTk49Jo' : 
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSbOdiC4GVm1LLmkw6G2_VqnJRtTk49Jo';

        axios.post(url, authData)
            .then(res => {
                // console.log(res);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err => {
                // console.log(err.response);
                dispatch(authFail(err.response.data.error));
            })
    }
}

export const setAuthRedirectPath = path => ({
    type: SET_AUTH_REDIRECT_PATH,
    path
})