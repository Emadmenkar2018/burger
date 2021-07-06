import React, { useState, Fragment } from 'react'
import './Layout.css'
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
        <>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler} isAuth={isAuthenticated}/>
            <SideDrawer 
                open={showSideDrawer} 
                closed={sideDrawerClosedHandler}
                isAuth={isAuthenticated}
            />
            <div className="Content">
                {props.children}
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token !== null
})

export default connect(mapStateToProps)(Layout);