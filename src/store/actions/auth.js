import {
    AUTH_USER, 
    AUTH_START, 
    AUTH_SUCCESS, 
    AUTH_FAIL, 
    AUTH_CHECK_TIMEOUT, 
    AUTH_INITIATE_LOGOUT, 
    AUTH_LOGOUT, 
    SET_AUTH_REDIRECT_PATH, 
    AUTH_CHECK_STATE
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

export const authCheckState = () => ({
    type: AUTH_CHECK_STATE
})

