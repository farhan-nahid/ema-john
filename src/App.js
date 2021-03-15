import React from 'react';
import {
  BrowserRouter as Router,

  Route, Switch
} from "react-router-dom";
import './App.css';
import Header from './Component/Header/Header';
import Inventory from './Component/Inventory/Inventory';
import Login from './Component/Login/Login';
import NotFound from './Component/NotFound/NotFound';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import Review from './Component/Review/Review';
import Shipment from './Component/Shipment/Shipment';
import Shop from './Component/Shop/Shop';



function App() {
  
  return (
    
    <div>
      <Header></Header>
      <Router>
        <Switch>
            <Route path="/shop">
                <Shop></Shop>
            </Route>
            <Route path="/review">
                  <Review></Review>
            </Route>
            <Route path="/inventory">
              <Inventory></Inventory>
            </Route>
            <Route path="/shipment">
              <Shipment />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route  path="/product/:productKey">
                <ProductDetails></ProductDetails>
            </Route>
            <Route exact path="/">
                <Shop></Shop>
            </Route>
            <Route  path="*">
                <NotFound></NotFound>
            </Route>
        </Switch>
      </Router>
      
      
    </div>
  );
}

export default App;
