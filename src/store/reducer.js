import {ADD_INGREDIENTS, REMOVE_INGREDIENTS} from './actions'

const initialState = {
    ingredients: null,
    totalPrice: 4
}

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_INGREDIENTS:
            return {
                ...state
            }
        case REMOVE_INGREDIENTS:
            return {
                ...state
            }
        default:
            return state;
    }
}