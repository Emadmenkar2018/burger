import React, { Component, Fragment } from 'react'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => ({
            showSideDrawer: !prevState.showSideDrawer
        }))
    }

    render(){
        const {showSideDrawer} = this.state;
        const {isAuthenticated} = this.props;
        return (
            <Fragment>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} isAuth={isAuthenticated}/>
                <SideDrawer 
                    open={showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}
                    isAuth={isAuthenticated}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token !== null
})

export default connect(mapStateToProps)(Layout);