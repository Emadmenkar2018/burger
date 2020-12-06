import {ADD_INGREDIENTS, REMOVE_INGREDIENTS, SET_INGREDIENTS, FETCH_INGREDIENTS_FAILED} from './actionTypes'
import axios from '../../axios-orders'

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

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(res => {
                // console.log(res);
                dispatch(setIngredients(res.data));
            })
            .catch(err => {
                dispatch(fetchIngredientsFailed());
            })
    }
}