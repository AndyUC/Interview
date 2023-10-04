import {  Reducer, useReducer } from "react";

interface CartItem{
   
         _id: string,
         remain: number,
         name: string,
         price:number,
         category: string,
         imageUrl: string,
         brand: string,
         subcatalog?: string[],
         discount?: number,
         quantity:number,
         pageUrl:string
}
interface Discount{
    amount:{
        amount:number,
            currency:'EUR'
    },
    displayName:string
}
export type State ={
    cart: CartItem[],
    checkout:number[],
    discount:Discount[],
    totalAmount:number
}
export const initState:State={
    cart:localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || '{}') : [],
    checkout:[],
    discount:[],
    totalAmount:0
}


const enum REDUCER_ACTION_TYPE{
    SETCART,
    SETCHECKOUT,
    SETDISCOUNT,
    SETTOTALAMOUNT
}
export type ReducerAction = {
    type:REDUCER_ACTION_TYPE
    payload?:any
}
    const setCart=(payload:any)=>{
        return{type:REDUCER_ACTION_TYPE.SETCART,
        payload}
    }
    const setCheckout=(payload:any)=>{
        return {type:REDUCER_ACTION_TYPE.SETCHECKOUT,
        payload}
    }
    const setDiscount=(payload:any)=>{
        return {type:REDUCER_ACTION_TYPE.SETDISCOUNT,
            payload}
    }
    const setTotalAmount =(payload:any)=>{
        return {type:REDUCER_ACTION_TYPE.SETTOTALAMOUNT,
            payload}
    }
export const orderReducer:Reducer<State,ReducerAction>=(state,action):State=>{
    switch (action.type){
        case REDUCER_ACTION_TYPE.SETCART:
        return {...state,cart:action.payload}
        case REDUCER_ACTION_TYPE.SETCHECKOUT:
        return {...state,checkout:action.payload}
        case REDUCER_ACTION_TYPE.SETDISCOUNT:
        return {...state,discount:action.payload}
        case REDUCER_ACTION_TYPE.SETTOTALAMOUNT:
            return {...state,totalAmount:action.payload}
        default:
            return state
    }
}
export {setCart,setDiscount,setCheckout,setTotalAmount}
