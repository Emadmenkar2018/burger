import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders'
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions'

class Orders extends Component {
    componentDidMount(){
        const {token, onFetchOrders} = this.props;
        onFetchOrders(token);
    }

    render() {
        const {orders, loading} = this.props;
        let ordersList = <Spinner/>;
        if(!loading){
            ordersList = orders.map(order => 
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}
                />
            )
        }
        return (
            <div>
                {ordersList}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
})

const mapDispatchToProps = dispatch => ({
    onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));