import React, { Component } from 'react';
import classes from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({loading: true});
        const {ingredients, price, history} = this.props;
        const order = {
            ingredients,
            price,
            customer: {
                name: 'Omar Taha',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Turkey'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        
        // .json just for firbase configuration
        axios.post('/orders.json', order)
            .then(res => {
                // console.log(res);
                this.setState({
                    loading: false
                });
                history.push('/');
            })
            .catch(err => {
                // console.log(err.response);
                this.setState({
                    loading: false
                });
            })
    }

    render() {
        const {loading} = this.state;
        let form = (
            <form>
                <input 
                    className={classes.Input}
                    type='text' 
                    name='name'
                    placeholder= 'Your Name'
                />
                <input 
                    className={classes.Input}
                    type='email' 
                    name='email'
                    placeholder= 'Your Mail'
                />
                <input 
                    className={classes.Input}
                    type='text' 
                    name='street'
                    placeholder= 'Street'
                />
                <input 
                    className={classes.Input}
                    type='text' 
                    name='postal'
                    placeholder= 'Postal Code'
                />
                <Button btnType='Success' clicked={this.orderHandler}>
                    ORDER
                </Button>
            </form>
        );
        if(loading) form = <Spinner/>
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;