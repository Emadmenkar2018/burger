import React, { Component } from 'react';
import axios from '../../axios-orders'
import Order from '../../components/Order/Order'

class Orders extends Component {
    componentDidMount(){

    }

    render() { 
        return (
            <div>
                <Order/>
                <Order/>
            </div>
        );
    }
}

export default Orders;