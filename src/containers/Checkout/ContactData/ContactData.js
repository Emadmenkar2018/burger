import React, { Component } from 'react';
import classes from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({loading: true});
        const {ingredients, price, history} = this.props;
        const order = {
            ingredients,
            price
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

    inputChangedHandler = (e, inputIdentifier) => {
        const {orderForm} = this.state;
        const updatedOrderForm = {
            ...orderForm
        }

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = e.target.value;
        
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({
            orderForm: updatedOrderForm
        })
    }

    render() {
        const {loading, orderForm} = this.state;
        const formElementsArray = [];
        for(let key in orderForm){
            formElementsArray.push({
                id: key,
                config: orderForm[key]
            })
        }
        let form = (
            <form>
                {formElementsArray.map(formElement => 
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(e) => this.inputChangedHandler(e, formElement.id)}
                    />
                )}
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