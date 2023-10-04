
import React, { useContext, useEffect, useReducer, useState } from 'react';
import './checkoutItem.css'
type CheckoutItemProps={
    imageUrl:string,
    name:string,
    quantity:number
}
export const CheckoutItem = (props:CheckoutItemProps)=>{
    return (
        <div className="ItemWrapper">
        <img className='itemImage' src={props.imageUrl} alt={props.name}/>
        <div className="inforWrapper">
            <h3>{props.name}</h3>
            <span>Qty:{props.quantity}</span>
        </div>
    </div>
    )
    
}