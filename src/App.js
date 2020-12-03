import React from 'react'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import {Route, Switch} from 'react-router-dom'

const App = () => {
	return (
		<Layout>
			<Switch>
				<Route path='/checkout' component={Checkout}/>
				<Route exact path='/' component={BurgerBuilder}/>
			</Switch>
		</Layout>
	);
}

export default App;
