import React, { Fragment, useCallback, useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls//BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import * as actions from '../../store/actions'

export const BurgerBuilder = ({history}) => {
    const [purchasing, setPurchasing] = useState(false);

    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);

    const dispatch = useDispatch();
    
    const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients])

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => 
                ingredients[igKey]
            )
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        return sum > 0
    }

    const purchaseHandler = () => {
        if(isAuthenticated) {
            setPurchasing(true)
        }else {
            onSetAuthRedirectPath('/checkout');
            history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        history.push('/checkout');
    }

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
                    purchasable={updatePurchaseState(ings)}
                    ordered={purchaseHandler}
                    isAuth={isAuthenticated}
                />
            </Fragment>
        )
        orderSummary = (
            <OrderSummary
                ingredients={ings}
                price={price}
                purchaseCanceled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
            />
        )
    }

    return (
        <Fragment>
            <Modal
                show={purchasing}
                modalClosed={purchaseCancelHandler}
            >
                {orderSummary}
            </Modal>
            {burger}
        </Fragment>
    )
}

// const mapStateToProps = state => ({
//     ings: state.burgerBuilder.ingredients,
//     price: state.burgerBuilder.totalPrice,
//     error: state.burgerBuilder.error,
//     isAuthenticated: state.auth.token !== null
// })

// const mapDispatchToProps = dispatch => ({
//     onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
//     onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
//     onInitIngredients: () => dispatch(actions.initIngredients()),
//     onInitPurchase: () => dispatch(actions.purchaseInit()),
//     onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
// })

export default withErrorHandler(BurgerBuilder, axios);