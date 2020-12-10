import {delay} from 'redux-saga/effects'
import {put} from 'redux-saga/effects'
import axios from 'axios'
import * as actions from '../actions'

// Generator Function
export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = action.isSignup ? 
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSbOdiC4GVm1LLmkw6G2_VqnJRtTk49Jo' : 
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSbOdiC4GVm1LLmkw6G2_VqnJRtTk49Jo';

    try{
        const res = yield axios.post(url, authData);

        const expirationDate = yield new Date(new Date().getTime() + res.data.expiresIn * 1000);
        yield localStorage.setItem('token', res.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', res.data.localId);
        yield put(actions.authSuccess(res.data.idToken, res.data.localId));
        yield put(actions.checkAuthTimeout(res.data.expiresIn));
    }catch(err){
        yield put(actions.authFail(err.response.data.error));
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if(!token) return yield put(actions.logout());

    const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
    if(expirationDate < new Date()) return yield put(actions.logout());

    const userId = yield localStorage.getItem('userId');
    yield put(actions.authSuccess(token, userId));
    yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
}