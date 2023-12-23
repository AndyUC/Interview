import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { MainContext } from "./provider/OrderProvider";
import { BsCart4, BsSearch } from "react-icons/bs";
import { FaShippingFast} from "react-icons/fa";
import logo from './asset/image/logo.jpeg'
import './AppLayout.css'
import { IoNewspaperSharp } from "react-icons/io5";
import { BiPackage } from "react-icons/bi";
import { AiOutlineAreaChart } from "react-icons/ai";
import { PiMedalBold } from "react-icons/pi";
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import React from 'react';
import { FloatButton } from 'antd';
import { Chatbox } from "./chatbox/chatbox";


export function Layout() {
    const {state,dispatch}= useContext(MainContext)
    return (
      <div className='navbar'>
        <nav className="navdetails"  >
            <div className='home' >
            <Link to="/" style={{color:'black'}}><img src={logo} style={{height:'80px'}}/></Link>
            </div>
              <div className='searchBar' >
                <div className='searchBarCover'style={{width:'99.5%', height:'55px', display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
                <input style={{width:'100%',height:'50px',border: '1px solid white'}}></input>
                <div role='button'style={{width:'60px',height:'50px',backgroundColor:'lightblue', display:'flex', alignItems:'center',justifyContent:'center'}}><BsSearch style={{width:'40px',height:'40px'}}/></div>
                </div>
              </div>
        <div className="cart-drawer-container" style={{width:'10%',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Link className="cart-drawer flex v-center" id="cart_drawer_target_id" to="/cart" style={{color:'black'}}>
            <BsCart4 style={{width:'50px',height:'50px',position:'absolute',right:'40px',top:'25px',zIndex:'2'}}/>
            <div className="shopee-cart-number-badge" aria-hidden="true" style={{fontSize:'20px',position:'absolute',right:'10',top:'5px',width:'40px',height:'40px',borderRadius:"20px",display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'red',color:'white'}}>{state.cart.length}</div>
          </Link>
        </div>  
        
        </nav>
        <Help/>
        <div style={{height:'100px'}}></div>
        
        <Outlet />
        
      </div>
    );
  }

  export function AdminLayout() {
    const [shipping, setShipping] = useState(false);
    const [order, setOrder] = useState(false);
    const [product, setProduct] = useState(false);
    const [data, setData] = useState(false);
    const [growth, setGrowth] = useState(false);
    const location = useLocation();
    console.log(location)
    return (
      <div className='navbar' style={{borderBottom:'1px solid gray',marginBlockEnd:'20px',backgroundColor:'#F7F6F6'}}>
        <nav style={{backgroundColor:'lightblue',display:'flex',flexDirection:'row', width:'100%', height:'100px',alignItems:'center',justifyContent:'center', position: 'fixed'}}>
            <div className='home' style={{width:'20%',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Link to="" style={{color:'black'}}><img src={logo} style={{height:'80px'}}/></Link>
            </div>
              <div className='searchBar' style={{width:'70%', height:'55px', display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
                <div className='searchBarCover'style={{width:'99.5%', height:'55px', display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
                <input style={{width:'100%',height:'50px',border: '1px solid white'}}></input>
                <div role='button'style={{width:'60px',height:'50px',backgroundColor:'lightblue', display:'flex', alignItems:'center',justifyContent:'center'}}><BsSearch style={{width:'40px',height:'40px'}}/></div>
                </div>
              </div>
        <div className="cart-drawer-container" style={{backgroundColor:'White',width:'10%',display:'flex',alignItems:'center',justifyContent:'center'}}>
        </div>  
        </nav>
        <div className="adminSlidebar">
        <div style={{height:'1em'}}></div>
            <div className='sideBarWrapper'>
            <div className='sideBarItem' role='button' onClick={()=>setShipping(!shipping)}>
            <FaShippingFast className="sideBarItemIcons"/>
            Shipment
            </div>
            {shipping&&<div className='sideBarSubItem'>
              <Link className='subIndex' to='order?type=toship' style={{backgroundColor:location.pathname==='/admin/order'&&location.search.includes('type=toship')?'lightgray':'white'}} >To ship</Link>
            <Link className='subIndex' to='order?type=shipping'style={{backgroundColor:location.pathname==='/admin/order'&&location.search.includes('type=shipping')?'lightgray':'white'}}>Shipping</Link>
            <Link className='subIndex' to='order?type=completed'style={{backgroundColor:location.pathname==='/admin/order'&&location.search.includes('type=completed')?'lightgray':'white'}}>Complete</Link>
            <Link className='subIndex' to='order?type=faileddelivery'style={{backgroundColor:location.pathname==='/admin/order'&&location.search.includes('type=faileddelivery')?'lightgray':'white'}}>Failed Delivery</Link>
            </div>}
           </div>
           <div className='sideBarWrapper'>
            <div className='sideBarItem' role='button' onClick={()=>setOrder(!order)}>
            <IoNewspaperSharp className="sideBarItemIcons"/>
            Order 
            </div>
            {order&&<div className='sideBarSubItem'><Link className='subIndex' to='order' style={{backgroundColor:location.pathname==='/admin/order'&&location.search.length===0?'lightgray':'white'}}>All Order</Link>
            <Link className='subIndex'  to='order?type=unpaid' style={{backgroundColor:location.pathname==='/admin/order'&&location.search.includes('type=unpaid')?'lightgray':'white'}}>Unpaid</Link>
            <Link className='subIndex' to='order?type=cancelled' style={{backgroundColor:location.pathname==='/admin/order'&&location.search.includes('type=cancelled')?'lightgray':'white'}}>cancellation</Link>
            <Link className='subIndex' to='order?type=return' style={{backgroundColor:location.pathname==='/admin/order'&&location.search.includes('type=return')?'lightgray':'white'}}>Return/Refund</Link>
            </div>}
           </div>
           <div className='sideBarWrapper'>
            <div className='sideBarItem' role='button' onClick={()=>setProduct(!product)}>
            <BiPackage className="sideBarItemIcons"/>
            Product
            </div>
            {product&&<div className='sideBarSubItem'><Link className='subIndex' to=''>All Product</Link>
            
            <Link className='subIndex' to=''>Add Product</Link>
            <Link className='subIndex' to=''>Temporarily cancelled</Link>
            </div>}
           </div>
           <div className='sideBarWrapper'>
            <div className='sideBarItem' role='button' onClick={()=>setData(!data)}>
            <AiOutlineAreaChart className="sideBarItemIcons"/>
            Data
            </div>
            {data&&<div className='sideBarSubItem'><Link className='subIndex' to=''>Business Insights</Link>
            <Link className='subIndex' to=''>Account Health</Link>
            </div>}
           </div>
           <div className='sideBarWrapper'>
            <div className='sideBarItem' role='button' onClick={()=>setGrowth(!growth)}>
            <PiMedalBold className="sideBarItemIcons"/>
            Growth
            </div>
            {growth&&<div className='sideBarSubItem'><Link className='subIndex' to=''>Sale Misstion</Link>
            <Link className='subIndex' to=''>Archive</Link>
            <Link className='subIndex' to=''>Havent Archive</Link>
            </div>}
           </div>
           <div style={{height:'1em'}}></div>
        </div>
      
        <div style={{height:'100px'}}></div>
        <Outlet />
        <Help/>
        
      </div>
    );
  }

  export const Help: React.FC = () => {
    const [comment, setComment] = useState(false);
    return (<>
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ right: 24,  }}
        icon={<CustomerServiceOutlined  />}
      >
        <FloatButton icon={<CommentOutlined />} onClick={()=>setComment(!comment)}/>
      </FloatButton.Group>
      {comment&&<Chatbox/>}
    </>)
  }
;
  

