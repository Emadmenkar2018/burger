import React from 'react';
import classes from './CheckoutSummary.module.css'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{
                width: '300px', 
                height: '300px', 
                margin: 'auto'
            }}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType='Danger' clicked>
                CANCEL
            </Button>
            <Button btnType='Success' clicked>
                CONTINUE
            </Button>
        </div>
    );
};

export default CheckoutSummary;