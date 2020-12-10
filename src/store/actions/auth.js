import {
    AUTH_START, 
    AUTH_SUCCESS, 
    AUTH_FAIL, 
    AUTH_CHECK_TIMEOUT, 
    AUTH_INITIATE_LOGOUT, 
    AUTH_LOGOUT, 
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
    type: AUTH_INITIATE_LOGOUT
})

export const logoutSucceed = () => ({
    type: AUTH_LOGOUT
})

export const checkAuthTimeout = expirationTime => ({
    type: AUTH_CHECK_TIMEOUT,
    expirationTime
})

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
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', res.data.localId);
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

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) return dispatch(logout());

        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if(expirationDate < new Date()) return dispatch(logout());

        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    }
}