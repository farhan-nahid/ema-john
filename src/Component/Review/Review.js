import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import fakeData from '../../fakeData';
import image from '../../img/giphy.gif';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart,setCart]=useState([])
    const [orderPlaced , setOrderPlaced] = useState(false)

    const history = useHistory()

    const handleProceedCheckout = () =>{
        
    }

    const removeProduct = (productKey) =>{
        const newCart = cart.filter(pd =>pd.key !== productKey );
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }

    useEffect(()=>{
     const savedCart = getDatabaseCart();
     const productKeys = Object.keys(savedCart)
     const cartProducts = productKeys.map (key => {
        const product = fakeData.find(pd=>pd.key===key)
        product.quantity = savedCart[key]
        return product;
     })
     setCart(cartProducts);
    }, [])
    
    let thankYou;
     if(orderPlaced){
        thankYou = <img src={image} alt="..."/>
    }
    return (
        <div className="shop-container"> 
            <div className=" product-container">
            {
                cart.map (pd => <ReviewItem
                     key={pd.key} 
                     product={pd}
                     removeProduct={removeProduct}
                     > 
                     </ReviewItem>)
            }
            {
                thankYou
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="cart-btn">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;