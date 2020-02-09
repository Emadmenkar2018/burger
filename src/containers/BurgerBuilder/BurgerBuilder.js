import React, { Component, Fragment } from 'react'
import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }

    render() {
        const {ingredients} = this.state;
        return (
            <Fragment>
                <Burger 
                    ingredients={ingredients}
                />
                <div>Build Controls</div>
            </Fragment>
        )
    }
}

export default BurgerBuilder;