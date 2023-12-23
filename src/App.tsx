import './App.css';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Home } from './pages/public/home/Home';
import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { BsCart4, BsSearch } from 'react-icons/bs'
import {AiTwotoneHome} from 'react-icons/ai'
import { Cart } from './pages/public/cart/cart';
import Checkout from './pages/public/checkout/checkout';
import { ProductParam } from './pages/public/product/productparam';
import { initState, orderReducer } from './provider/orderStore';
import { MainContext } from './provider/OrderProvider';
import logo from './asset/image/logo.jpeg'
import { Login } from './pages/public/login/login';
import { Admin } from './pages/private/admin/admin';
import { AdminLayout, Help, Layout } from './Applayout';
import Column from 'antd/es/table/Column';
import { Order } from './pages/private/order/order';
import { mainsw } from './checknotification';
import { TrophyFilled } from '@ant-design/icons';

function NoMatch() {
  return (
    <div style={{display:'flex', flexDirection:'column',justifyContent:'center'}}>
      <h2 style={{textAlign:'center'}}>Nothing to see here!</h2>
      <p  style={{textAlign:'center'}}>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}


function App() {
  const [state, dispatch] = useReducer(orderReducer,initState)
  useEffect(() => {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
          navigator.serviceWorker.ready.then(async function(registration) {
            // Đăng ký sự kiện push với service worker
            try {
              const subscription =  await registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: "BK-LPd2hDKcEzDOsFncWG4_1KOyZOWx8EAbSK8arLHBCF5Df-m12Rt8mz-JNV7KHmILsuRbn0RbvNisgoYvIElM" })
              console.log(subscription)
              const endpoint = subscription.endpoint
              
              const dataToSend =  {subscription: subscription}
              localStorage.setItem("subscription",JSON.stringify(dataToSend))
            } catch (error) {
              console.error('Lỗi khi đăng ký push:', error);
            }
          });
        }
      });
    }
  },[])
  return (
   
      <MainContext.Provider  value={{state,dispatch}}>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="/:id" element={<ProductParam />} />
          <Route path='/login' element={<Login/>}/>
        </Route>
        <Route path='/admin'element={<AdminLayout /> }>
           <Route index  element={<Admin/>}/>
           <Route path="order" element={< Order/>} />
        </Route>
      </Routes>
      
    </MainContext.Provider>
 
    
  );
}

export default App;
