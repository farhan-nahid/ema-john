import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,

  Route, Switch
} from "react-router-dom";
import './App.css';
import Header from './Component/Header/Header';
import Inventory from './Component/Inventory/Inventory';
import Login from './Component/Login/Login';
import NotFound from './Component/NotFound/NotFound';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import Review from './Component/Review/Review';
import Shipment from './Component/Shipment/Shipment';
import Shop from './Component/Shop/Shop';

export const userContext = createContext()

function App() {
  const [loggedInUser ,  setLoggedInUser] = useState({})
  return (
    
    <userContext.Provider value = {[loggedInUser ,  setLoggedInUser]}>
      <h3>Email : {loggedInUser.email}</h3>
      
      <Router>
      <Header></Header>
        <Switch>
            <Route path="/shop">
                <Shop></Shop>
            </Route>
            <Route path="/review">
                  <Review></Review>
            </Route>
            <PrivateRoute path="/inventory">
              <Inventory></Inventory>
            </PrivateRoute>
            <PrivateRoute path="/shipment">
              <Shipment />
            </PrivateRoute>
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
    </userContext.Provider>
  );
}

export default App;
