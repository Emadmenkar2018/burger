import React, { useState, Fragment } from 'react'
import classes from './Layout.module.css'
import { connect } from 'react-redux'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

const Layout = ({isAuthenticated, ...props}) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer((prevState) => ({
            showSideDrawer: !prevState.showSideDrawer
        }))
    }

    return (
        <Fragment>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler} isAuth={isAuthenticated}/>
            <SideDrawer 
                open={showSideDrawer} 
                closed={sideDrawerClosedHandler}
                isAuth={isAuthenticated}
            />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token !== null
})

export default connect(mapStateToProps)(Layout);