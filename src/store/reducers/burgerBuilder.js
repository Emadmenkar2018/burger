import {ADD_INGREDIENTS, REMOVE_INGREDIENTS, SET_INGREDIENTS, FETCH_INGREDIENTS_FAILED} from '../actions/actionTypes'
import {updateObject} from '../utility'

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

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState);
}

const setIngredients = (state, action) => {
    const {salad, bacon, cheese, meat} = action.ingredients;
    return updateObject(state, {
        ingredients: {
            salad,
            bacon,
            cheese,
            meat
        },
        totalPrice: 4,
        error: false
    });
}

const fetchedIngredients = state => (
    updateObject(state, {
        error: true
    })
)

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_INGREDIENTS:
            return addIngredient(state, action);
        case REMOVE_INGREDIENTS:
            return removeIngredient(state, action);
        case SET_INGREDIENTS:
            return setIngredients(state, action);
        case FETCH_INGREDIENTS_FAILED:
            return fetchedIngredients(state);
        default:
            return state;
    }
}