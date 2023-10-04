import './App.css';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Home } from './pages/home/Home';
import { createContext, useContext, useReducer, useState } from 'react';
import { BsCart4 } from 'react-icons/bs'
import {AiTwotoneHome} from 'react-icons/ai'
import { Cart } from './pages/cart/cart';
import Checkout from './pages/checkout/checkout';
import { ProductParam } from './pages/product/productparam';
import { initState, orderReducer } from './provider/orderStore';
import { MainContext } from './provider/OrderProvider';


function Layout() {
  const {state,dispatch}= useContext(MainContext)
  return (
    <div className='navbar' style={{borderBottom:'1px solid gray',marginBlockEnd:'20px',backgroundColor:'#F7F6F6'}}>
      <nav style={{backgroundColor:'White',display:'flex',flexDirection:'row', width:'100%', height:'100px',alignItems:'center'}}>
            <Link to="/" style={{color:'black'}}><AiTwotoneHome style={{width:'50px',height:'50px',position:'absolute',left:'10%',top:'25px'}}/></Link>
      <div className="cart-drawer-container" style={{backgroundColor:'White'}}>
        <Link className="cart-drawer flex v-center" id="cart_drawer_target_id" to="/cart" style={{color:'black'}}>
          <BsCart4 style={{width:'50px',height:'50px',position:'absolute',right:'10%',top:'25px',zIndex:'2'}}/>
          <div className="shopee-cart-number-badge" aria-hidden="true" style={{fontSize:'20px',position:'absolute',right:'9%',top:'5px',width:'40px',height:'40px',borderRadius:"20px",display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'red',color:'white'}}>{state.cart.length}</div>
        </Link>
      </div>
      </nav>
      
      <Outlet />

      
    </div>
  );
}




function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}


function App() {
  const [state, dispatch] = useReducer(orderReducer,initState)

  return (
   
      <MainContext.Provider  value={{state,dispatch}}>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="/:id" element={<ProductParam />} />
        </Route>
      </Routes>

      
    </MainContext.Provider>
 
    
  );
}

export default App;
