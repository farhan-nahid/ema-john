import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData/index';
import Product from '../Product/Product';
const ProductDetails = () => {
    const {productKey} =useParams()
  const product=  fakeData.find(pd => pd.key === productKey)
  console.log(product);

    return (
        <div>
            <h1> {productKey} Details</h1>
            <Product></Product>
        </div>
    );
};

export default ProductDetails;