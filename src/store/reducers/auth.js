import {AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT} from '../actions/actionTypes'
import {updateObject} from '../utility'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const authStart = state => (
    updateObject(state, {
        error: null, 
        loading: true
    })
)

const authSuccess = (state, action) => (
    updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    })
)

const authFail = (state, action) => (
    updateObject(state, {
        error: action.error, 
        loading: false
    })
)

const authLogout = state => (
    updateObject(state, {
        token: null,
        userId: null
    })
)

export default (state = initialState, action) => {
    switch(action.type){
        case AUTH_START:
            return authStart(state);
        case AUTH_SUCCESS:
            return authSuccess(state, action);
        case AUTH_FAIL:
            return authFail(state, action);
        case AUTH_LOGOUT:
            return authLogout(state);
        default:
            return state;
    }
}