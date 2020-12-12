import React from 'react';
import {Redirect, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

const Checkout = ({history, match, ings, purchased}) => {
    const checkoutCancelledHandler = () => {
        history.goBack();
    }

    const checkoutContinuedHandler = () => {
        history.replace(`${match.url}/contact-data`);
    }

    let summary = <Redirect to='/'/>
    if(ings) {
        const purchasedRedirect = purchased ? <Redirect to='/'/> : null;
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary 
                    ingredients={ings}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler}
                />
                <Route 
                    path={`${match.url}/contact-data`}
                    component={ContactData}
                />
            </div>
        )
    }
    return summary;
}

const mapStateToProps = state => ({
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
})

export default connect(mapStateToProps)(Checkout);