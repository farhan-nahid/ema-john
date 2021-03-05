import React from 'react';
import './Cart.css';


const Cart = (props) => {
    const cart = props.cart;
  //  console.log(cart);
   // const totalPrize = cart.reduce(   (total , product) => total + product.price, 0)

   let totalPrize = 0;
   for (let i = 0; i < cart.length; i++) {
       const product = cart[i];
       totalPrize= totalPrize + product.price * product.quantity;
   }

   let shipping = 0;
   if(totalPrize>35){
       shipping=0;
   }else if (totalPrize>15){
       shipping=4.99;
   }else if (totalPrize>0){
        shipping=12.99
   }

   const tax =( totalPrize/10).toFixed(2);
   const grandTotal =(totalPrize+ shipping+ Number(tax)).toFixed(2)

   const formatNumber = num => {
       const precision = num.toFixed(2);
       return Number(precision)
   }
    return (
        <div  className="cart">
            <h4>Order Summery</h4>
            <p>Items Ordered : {cart.length}</p>
            <h5>Product Prize : {formatNumber(totalPrize)}</h5>
            <p>Shipping cost : {shipping}</p>
            <p>Tax / Vat : {tax}</p>
            <p>Total Prize : {grandTotal}</p>
            { 
                props.children
            }
        </div>
    );
};

export default Cart;