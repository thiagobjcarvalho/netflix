import React from "react";
import './Header.css';
import logo from './../../img/logo.png'


// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return (
        <header>
            <div className='header--logo'>
                <img src={logo}></img>
            </div>
        </header>
    )
}