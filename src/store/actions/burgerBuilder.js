import {ADD_INGREDIENTS, REMOVE_INGREDIENTS} from './actionTypes'

export const addIngredient = (name) => ({
    type: ADD_INGREDIENTS,
    ingredientName: name
})

export const removeIngredient = (name) => ({
    type: REMOVE_INGREDIENTS,
    ingredientName: name
})
