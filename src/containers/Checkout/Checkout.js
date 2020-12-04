import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
    state = this.myInitializeStateMethod();
    
    myInitializeStateMethod() {
        const query = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        let price = 0;
        for(let param of query.entries()){
            
            if (param[0] === 'price'){
                price = param[1];
            }else {
                ingredients[param[0]] = +param[1];
            }
        }
        return {ingredients, totalPrice: price};
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace(`${this.props.match.url}/contact-data`);
    }

    render() {
        const {ingredients, totalPrice} = this.state;
        return (
            <div>
                <CheckoutSummary 
                    ingredients={ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route 
                    path={`${this.props.match.url}/contact-data`} 
                    render={(props) => 
                        <ContactData 
                            {...props}
                            ingredients={ingredients}
                            price={totalPrice}
                        />
                    }
                />
            </div>
        );
    }
}

export default Checkout;