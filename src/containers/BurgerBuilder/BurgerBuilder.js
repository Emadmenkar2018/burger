import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls//BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import * as actions from '../../store/actions'

export class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount(){
        const {onInitIngredients} = this.props;
        onInitIngredients();
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => 
                ingredients[igKey]
            )
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        return sum > 0
    }

    purchaseHandler = () => {
        const {isAuthenticated, history, onSetAuthRedirectPath} = this.props;
        if(isAuthenticated) {
            this.setState({
                purchasing: true
            })
        }else {
            onSetAuthRedirectPath('/checkout');
            history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {
        const {history, onInitPurchase} = this.props;
        onInitPurchase();
        history.push('/checkout');
    }

    render() {
        const {purchasing} = this.state;
        const {ings, price, error, isAuthenticated, onIngredientAdded, onIngredientRemoved} = this.props;
        const disabledInfo = {
            ...ings
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;
        if(ings) {
            burger = (
                <Fragment>
                    <Burger 
                        ingredients={ings}
                    />
                    <BuildControls
                        ingredientAdded={onIngredientAdded}
                        ingredientRemoved={onIngredientRemoved}
                        disabled={disabledInfo}
                        price={price}
                        purchasable={this.updatePurchaseState(ings)}
                        ordered={this.purchaseHandler}
                        isAuth={isAuthenticated}
                    />
                </Fragment>
            )
            orderSummary = (
                <OrderSummary
                    ingredients={ings}
                    price={price}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />
            )
        }

        return (
            <Fragment>
                <Modal
                    show={purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
})

const mapDispatchToProps = dispatch => ({
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));