import {
    AUTH_USER, 
    AUTH_START, 
    AUTH_SUCCESS, 
    AUTH_FAIL, 
    AUTH_CHECK_TIMEOUT, 
    AUTH_INITIATE_LOGOUT, 
    AUTH_LOGOUT, 
    SET_AUTH_REDIRECT_PATH
} from './actionTypes'

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

export const auth = (email, password, isSignup) => ({
    type: AUTH_USER,
    email,
    password,
    isSignup
})

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