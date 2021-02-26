import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Product.css';

const Product = (props) => {
    console.log(props);
   const {name,img,seller,price,stock}=props.product
    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt=""/>
            </div>
            <div className="product-content">
                  <a href={name}>{name} </a>
                  <p>by: {seller}</p>
                  <h3>${price}</h3>
                  <p>only {stock} left in stock - order soon</p>
                  <button className="cart-btn" onClick={ ()=> props.handleAddProduct(props.product)}> <FontAwesomeIcon icon={faShoppingCart} />  Add to Cart</button>
            </div>
        </div>
    );
};

export default Product;