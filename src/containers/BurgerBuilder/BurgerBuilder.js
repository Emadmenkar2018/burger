import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls//BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import {ADD_INGREDIENTS, REMOVE_INGREDIENTS} from '../../store/actions'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        // axios.get('/ingredients.json')
        //     .then(res => {
        //         // console.log(res);
        //         this.setState({
        //             ingredients: res.data
        //         })
        //     })
        //     .catch(err => {
        //         this.setState({error: true})
        //     })
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => 
                ingredients[igKey]
            )
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        this.setState({
            purchasable: sum > 0
        });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {
        // alert('YOU CONTINUE!');
        const {ingredients, totalPrice} = this.state;
        const queryParams = [];
        for(let i in ingredients){
            queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(ingredients[i])}`);
        }
        queryParams.push(`price=${totalPrice}`);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: `?${queryString}`
        });
    }

    render() {
        const {totalPrice, purchasable, purchasing, loading, error} = this.state;
        const {ings, onIngredientAdded, onIngredientRemoved} = this.props;
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
                        price={totalPrice}
                        purchasable={purchasable}
                        ordered={this.purchaseHandler}
                    />
                </Fragment>
            )
            orderSummary = (
                <OrderSummary
                    ingredients={ings}
                    price={totalPrice}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />
            )
        }
        if(loading) orderSummary = <Spinner/>

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
    ings: state.ingredients
})

const mapDispatchToProps = dispatch => ({
    onIngredientAdded: (ingName) => dispatch({type: ADD_INGREDIENTS, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: REMOVE_INGREDIENTS, ingredientName: ingName})
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));