import React, {Fragment} from 'react'
import Button from '../../UI/Button/Button'

const OrderSummary = props => {
    // This could be a functional component, dosen't have to be a class
    // componentDidUpdate(){
    //     console.log('[OrderSummary] DidUpdate');
    // }

    const ingredientSummary = Object.keys(props.ingredients).map(igKey => 
        <li
            key={igKey}
        >
            <span 
                style={{textTransform: 'capitalize'}}
            >
                {igKey}
            </span>: {props.ingredients[igKey]}
        </li>
    )
    
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>
                <strong>
                Total Price: {props.price.toFixed(2)} $
                </strong> 
            </p>
            <p>Continue to Checkout?</p>
            <Button 
                btnType='Danger'
                clicked={props.purchaseCanceled}
            >
                CANCEL
            </Button>
            <Button
                btnType='Success'
                clicked={props.purchaseContinued}
            >
                CONTINUE
            </Button>
        </Fragment>
    )
}

export default OrderSummary;