import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'

const App = () => {
	return (
		<Layout>
			<Switch>
				<Route path='/checkout' component={Checkout}/>
				<Route path='/orders' component={Orders}/>
				<Route exact path='/' component={BurgerBuilder}/>
			</Switch>
		</Layout>
	);
}

export default App;
