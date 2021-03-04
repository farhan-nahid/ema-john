import React from 'react';
import logo from '../../img/logo.png';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <a href="/shop">Shop</a>
                <a href="./review">Review</a>
                <a href="./inventory"> Inventory</a>
          </nav>
        </div>
    );
};

export default Header;