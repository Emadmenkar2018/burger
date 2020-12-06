import {ADD_INGREDIENTS, REMOVE_INGREDIENTS, SET_INGREDIENTS, FETCH_INGREDIENTS_FAILED} from '../actions/actionTypes'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case REMOVE_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        case SET_INGREDIENTS:
            const {salad, bacon, cheese, meat} = action.ingredients;
            return {
                ...state,
                ingredients: {
                    salad,
                    bacon,
                    cheese,
                    meat
                },
                totalPrice: 4,
                error: false
            }
        case FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}