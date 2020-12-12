import React, { useEffect, Suspense } from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions'

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));

const Orders = React.lazy(() => import('./containers/Orders/Orders'));

const Auth = React.lazy(() => import('./containers/Auth/Auth'));

const App = ({onAuthCheckState, isAuthenticated, ...props}) => {
	useEffect(() => {
		onAuthCheckState();
	}, [onAuthCheckState])

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
			<Route path='/auth' component={Auth}/>
			<Route exact path='/' component={BurgerBuilder}/>
			<Redirect to='/'/>
		</Switch>
	)
	return (
		<Layout>
			<Suspense fallback={<p>Loading...</p>}>
				{routes}
			</Suspense>
		</Layout>
	);
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.token !== null
})

const mapDispatchToProps = dispatch => ({
	onAuthCheckState: () => dispatch(actions.authCheckState())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
