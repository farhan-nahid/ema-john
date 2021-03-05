import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const firstTen = fakeData.slice(0,10);
    const [products, setProducts] = useState(firstTen);
    const [cart, setCart] = useState([]);
   console.log(setProducts);

    useEffect(()=>{
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey)
            product.quantity =savedCart[existingKey]
            return product
        })
        setCart (previousCart)
    }, [])

     const handleAddProduct = (product) =>{
         const toBeAddedKey =product.key
        const sameProduct = cart.find(pd=> pd.key === toBeAddedKey)
        let count =1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity +1;
            sameProduct.quantity=count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey)
            newCart=[...others,sameProduct]
        }else{
            product.quantity=1;
            newCart=[...cart, product]
        }
         //console.log("add", product);
         setCart(newCart)
         addToDatabaseCart(product.key, count)
     }
    return (
        <div className="shop-container">
            <div className="product-container">
                    {   
                        products.map(pd => <Product 
                            key={pd.key}
                            showAddToCart={true}
                            handleAddProduct ={handleAddProduct}
                            product ={pd}></Product> )    
                    }
            </div>
            <div className="cart-container">
                <Cart cart = {cart}>
                      <Link to='/review'><button className="cart-btn">Review order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;