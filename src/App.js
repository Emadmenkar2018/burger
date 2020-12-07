import React, { Component } from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions'

class App extends Component {
	componentDidMount(){
		const {onAuthCheckState} = this.props;
		onAuthCheckState();
	}

	render(){
		const {isAuthenticated} = this.props;
		let routes = (
			<Switch>
				<Route path='/auth' component={Auth}/>
				<Route exact path='/' component={BurgerBuilder}/>
				<Redirect to='/'/>
			</Switch>
		)
		if(isAuthenticated) routes = (
			<Switch>
				<Route path='/checkout' component={Checkout}/>
				<Route path='/orders' component={Orders}/>
				<Route path='/logout' component={Logout}/>
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
