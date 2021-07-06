import React, { useEffect, useState } from 'react';
import classes from './Auth.module.css'
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions'
import {updateObject, checkValidity} from '../../shared/utility'

const Auth = ({loading, error, isAuth, buildingBurger, authRedirectPath, onAuth, onSetAuthRedirectPath}) => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });
    // const [formIsValid, setFormIsValid] = useState(false);
    const [isSignup, setIsSignup] = useState(true);

    useEffect(() => {
        !buildingBurger && authRedirectPath !== '/' && 
            onSetAuthRedirectPath();
    }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath])

    const inputChangedHandler = (e, controlName) => {
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: e.target.value,
                valid: checkValidity(e.target.value, controls[controlName].validation),
                touched: true
            })
        });

        // let formIsValid = true;
        // for(let controlName in updatedControls){
        //     formIsValid = updatedControls[controlName].valid && formIsValid;
        // }

        setControls(updatedControls);
    }

    const submitHandler = e => {
        e.preventDefault();
        const {email, password} = controls;
        onAuth(email.value, password.value, isSignup);
    }

    const switchAuthModeHandler = () => {
        setIsSignup(prevState => ({
            isSignup: !prevState.isSignup
        }))
    }

    const formElementsArray = [];
    for(let key in controls){
        formElementsArray.push({
            id: key,
            config: controls[key]
        })
    }
    let form = formElementsArray.map(formElement => 
        <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(e) => inputChangedHandler(e, formElement.id)}
        />
    );
    if(loading) form = <Spinner/>

    let errorMessage = null;
    if(error) errorMessage = (
        <p>{error.message}</p>
    )

    let authRedirect = null;
    if(isAuth) authRedirect = <Redirect to={authRedirectPath}/>

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType='Success'>
                    SUBMIT
                </Button>
            </form>
            <Button btnType='Danger' clicked={switchAuthModeHandler}>
                SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}
            </Button>
        </div>
    );
}

const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath 
})

const mapDispatchToProps = dispatch => ({
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth);