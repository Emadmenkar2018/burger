import {
    ADD_INGREDIENTS, 
    REMOVE_INGREDIENTS, 
    SET_INGREDIENTS, 
    INIT_INGREDIENTS, 
    FETCH_INGREDIENTS_FAILED} from './actionTypes'

export const addIngredient = (name) => ({
    type: ADD_INGREDIENTS,
    ingredientName: name
})

export const removeIngredient = (name) => ({
    type: REMOVE_INGREDIENTS,
    ingredientName: name
})

export const setIngredients = (ingredients) => ({
    type: SET_INGREDIENTS,
    ingredients
})

export const fetchIngredientsFailed = () => ({
    type: FETCH_INGREDIENTS_FAILED
})

export const initIngredients = () => ({
    type: INIT_INGREDIENTS
})