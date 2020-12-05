import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace(`${this.props.match.url}/contact-data`);
    }

    render() {
        const {ings} = this.props;
        return (
            <div>
                <CheckoutSummary 
                    ingredients={ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route 
                    path={`${this.props.match.url}/contact-data`}
                    component={ContactData}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ings: state.ingredients
})

export default connect(mapStateToProps)(Checkout);