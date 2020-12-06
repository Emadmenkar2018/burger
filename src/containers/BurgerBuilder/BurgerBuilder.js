import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls//BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import {ADD_INGREDIENTS, REMOVE_INGREDIENTS} from '../../store/actions/actionTypes'

class BurgerBuilder extends Component {
    state = {
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
        return sum > 0
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
        this.props.history.push('/checkout');
    }

    render() {
        const {purchasing, loading, error} = this.state;
        const {ings, price, onIngredientAdded, onIngredientRemoved} = this.props;
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
    ings: state.ingredients,
    price: state.totalPrice
})

const mapDispatchToProps = dispatch => ({
    onIngredientAdded: (ingName) => dispatch({type: ADD_INGREDIENTS, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: REMOVE_INGREDIENTS, ingredientName: ingName})
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));