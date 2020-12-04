import React, { Component } from 'react';
import axios from '../../axios-orders'
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
    state = {
        orders: [], 
        loading: true
    }

    componentDidMount(){
        axios.get('/orders.json')
            .then(res => {
                const orders = [];
                for(let key in res.data){
                    orders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({
                    loading:false,
                    orders
                })
            })
            .catch(err => {
                this.setState({loading:false})
            })
    }

    render() {
        const {orders, loading} = this.state;
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

export default withErrorHandler(Orders, axios);