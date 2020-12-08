import React, { Component } from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import asyncComponent from './hoc/asyncComponent/asyncComponent'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions'

const asyncCheckout = asyncComponent(() => {
	return import('./containers/Checkout/Checkout');
})

const asyncOrders = asyncComponent(() => {
	return import('./containers/Orders/Orders');
})

const asyncAuth = asyncComponent(() => {
	return import('./containers/Auth/Auth');
})

class App extends Component {
	componentDidMount(){
		const {onAuthCheckState} = this.props;
		onAuthCheckState();
	}

	render(){
		const {isAuthenticated} = this.props;
		let routes = (
			<Switch>
				<Route path='/auth' component={asyncAuth}/>
				<Route exact path='/' component={BurgerBuilder}/>
				<Redirect to='/'/>
			</Switch>
		)
		if(isAuthenticated) routes = (
			<Switch>
				<Route path='/checkout' component={asyncCheckout}/>
				<Route path='/orders' component={asyncOrders}/>
				<Route path='/logout' component={Logout}/>
				<Route path='/auth' component={asyncAuth}/>
				<Route exact path='/' component={BurgerBuilder}/>
				<Redirect to='/'/>
			</Switch>
		)
		return (
			<Layout>
				{routes}
			</Layout>
		);
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.token !== null
})

const mapDispatchToProps = dispatch => ({
	onAuthCheckState: () => dispatch(actions.authCheckState())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
