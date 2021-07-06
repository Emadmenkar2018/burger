import React from 'react';
import classes from './Logo.module.css'
import burgerLogo from '../../assets/images/burger-logo.png'

const Logo = (props) => (
    <div className={classes.Logo}>
        <img   src={"https://u-smile.live/usell/app-assets/images/logo/logo-light.png"} alt='U-Sell'/>
    </div>
);

export default Logo;