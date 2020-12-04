import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
    state = {
        ingredients: {}
    }
    
    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        for(let param of query.entries()){
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace(`${this.props.match.url}/contact-data`);
    }

    render() {
        const {ingredients} = this.state;
        return (
            <div>
                <CheckoutSummary 
                    ingredients={ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route path={`${this.props.match.url}/contact-data`} component={ContactData}/>
            </div>
        );
    }
}

export default Checkout;