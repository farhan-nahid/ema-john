import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    console.log(props);
    const {name, quantity,key,price}=props.product;
    return (
        <div className="review-item">
            <h3 className="product-name">{name}</h3>
            <h5>Quantity : {quantity}</h5>
            <p>${price}</p>
            <button onClick={ () => props.removeProduct(key)} className="cart-btn">Remove Item</button>
        </div>
    );
};

export default ReviewItem;