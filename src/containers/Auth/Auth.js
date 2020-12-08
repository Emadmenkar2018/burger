import React, { Component } from 'react';
import classes from './Auth.module.css'
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions'
import {updateObject} from '../../shared/utility'

class Auth extends Component {
    state = {
        controls: {
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
        },
        formIsValid: false,
        isSignup: true
    }

    componentDidMount(){
        const {buildingBurger, authRedirectPath, onSetAuthRedirectPath} = this.props;
        !buildingBurger && authRedirectPath !== '/' && 
            onSetAuthRedirectPath();
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        if(rules.isEmail){
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if(rules.isNumeric){
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (e, controlName) => {
        const {controls} = this.state;
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: e.target.value,
                valid: this.checkValidity(e.target.value, controls[controlName].validation),
                touched: true
            })
        });

        // let formIsValid = true;
        // for(let controlName in updatedControls){
        //     formIsValid = updatedControls[controlName].valid && formIsValid;
        // }

        this.setState({
            controls: updatedControls
        })
    }

    submitHandler = e => {
        e.preventDefault();
        const {isSignup} = this.state;
        const {email, password} = this.state.controls;
        const {onAuth} = this.props;
        onAuth(email.value, password.value, isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => ({
            isSignup: !prevState.isSignup
        }))
    }

    render() {
        const {controls, isSignup} = this.state;
        const {loading, error, isAuth, authRedirectPath} = this.props;
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
                changed={(e) => this.inputChangedHandler(e, formElement.id)}
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
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>
                        SUBMIT
                    </Button>
                </form>
                <Button btnType='Danger' clicked={this.switchAuthModeHandler}>
                    SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}
                </Button>
            </div>
        );
    }
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
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath('/'))
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth);