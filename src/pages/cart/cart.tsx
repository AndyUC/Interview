import { useContext, useEffect, useState } from "react";
import { BsCartPlus } from 'react-icons/bs'
import { PiSparkleDuotone } from 'react-icons/pi'
import { IoBagCheckOutline } from 'react-icons/io5'
import { BiTrash } from 'react-icons/bi'
import { MainContext } from "../../provider/OrderProvider";
import { setCart, setCheckout, setTotalAmount } from "../../provider/orderStore";
import { SelectContext } from "../../provider/SelectProvider";
import { useNavigate } from "react-router";

type CartProductProps = {
    name: string,
    pageUrl: string,
    imageUrl: string,
    discount?: number,
    price:number,
    quantity:number,
    index:number
}

function CartProduct(props: CartProductProps) {

    const { state, dispatch } = useContext(MainContext)
   
    const deacreaseClick=()=>{
        if(props.quantity>1){
            const newcart = state.cart
            newcart[props.index].quantity=props.quantity-1
            localStorage.setItem('cart',JSON.stringify([...newcart]))
            dispatch(setCart([...newcart]))
        }
    }
    const increaseClick=()=>{
            const newcart = state.cart
            newcart[props.index].quantity=props.quantity+1
            localStorage.setItem('cart',JSON.stringify([...newcart]))
            dispatch(setCart([...newcart]))
    }
    const deleteClick=()=>{
        state.cart.splice(props.index,1);
        localStorage.setItem('cart',JSON.stringify([...state.cart]))
        dispatch(setCart([...state.cart]))
    }
    const handleChecked =()=>{
        if(state.checkout.includes(props.index)){
            const newselect = state.checkout.filter(item => item!==props.index)
            dispatch(setCheckout([...newselect]))
        }else{
            dispatch(setCheckout([...state.checkout,props.index]))
        }
    }


    return (
        <div className="selection-wrapper" style={{ display: "flex", flexDirection: "row", border: '0.3px dashed red' }}>

            <div className="items" style={{ display: 'flex', marginTop: '20px', width: '10%', justifyContent: "center", alignItems: "center" }}>
                <label className="stardust-checkbox">
                    <input className="stardust-checkbox__input" type="checkbox" style={{ width: '20px', height: '20px' }} checked={state.checkout.includes(props.index)} onChange={handleChecked} />
                    <div className="stardust-checkbox__box">
                    </div>
                </label>
            </div>
            <div className="tiemdeltaisWrapper" style={{ display: "flex", flexDirection: "row", width: "-webkit-fill-available" }}>
                <div className="itemsinfo" style={{ display: "flex", width: '50%', flexDirection: "column", rowGap: '20px' }}>
                    <a className="title-item" href={props.pageUrl} style={{ width: '80%', fontSize: '18px', fontWeight: 500 }}>{props.name}</a>
                    <a title={props.name} href={props.pageUrl}>
                        <img className="WanNdG" src={props.imageUrl} alt="product image" style={{ width: '30%' }} />
                    </a>
                </div>
               
                    {props.discount ? 
                     <div className="price-wrapper" style={{ display: "flex", width: '15%', flexDirection: "column", rowGap: '10px', justifyContent: "center", alignItems: "center" }}>
                    <div className='price-text'style={{display:'flex',flexDirection:"row",columnGap:"10px"}}>
                        <span className="price" style={{textDecoration:'line-through', color:'gray'}}>€ {props.price}</span>
                        <span className="price-after-discount">€ {(props.price*(100-props.discount)/100).toFixed(2)}</span>
                        
                    </div>
                    <div className="price-details">
                        <span className="zaniLz"style={{backgroundColor:'red', color:'white'}}>{props.discount}% discount</span>
                    </div>
                    </div>
                        : 
                        <div className="price-wrapper" style={{ display: "flex", width: '15%', flexDirection: "column", rowGap: '10px', justifyContent: "center", alignItems: "center" }}>
                        <div className='price-text' style={{ display: 'flex', flexDirection: "row", columnGap: "10px" }}>
                            <span className="price-after-discount">43.70</span>
                            <span className="currency">EUR</span>
                        </div>
                        </div>
                    }

                
                <div className="quantity" style={{ display: "flex", width: '15%', flexDirection: "column", rowGap: '10px', justifyContent: "center", alignItems: "center" }}>
                    <div className="input-quantity" style={{ display: 'flex', flexDirection: "row", columnGap: "3px", justifyContent: "center", alignItems: "center" }} >
                        <button className="quantity-button" onClick={deacreaseClick} >
                            <span>-</span>
                        </button>
                        <span className="quantity-content" style={{textAlign:"center",width:'50px'}}>{props.quantity}</span>
                        <button className="quantity-button" onClick={increaseClick}>
                            <span>+</span>
                        </button>
                    </div>
                </div>
                <div className="amount" style={{ display: "flex", width: '10%', flexDirection: "column", rowGap: '10px', justifyContent: "center", alignItems: "center" }}>
                    <span style={{ color: 'red', fontSize: '15', fontWeight: 700 }} >{props.discount?(props.price*(100-props.discount)/100*props.quantity).toFixed(2):props.price*props.quantity}</span>
                </div>
                <div className="Delete" style={{ display: "flex", width: '10%', flexDirection: "column", rowGap: '10px', justifyContent: "center", alignItems: "center" }}>
                    <button className="delete-button" onClick={deleteClick}><BiTrash style={{ width: '30px', height: '60px' }}></BiTrash></button>
                </div>

                <div className="_2rzy4U">
                </div>
            </div>
        </div>
    );
}
export const Cart = () => {
    const { state, dispatch } = useContext(MainContext)
    const [totalSelect, setTotalSelect] = useState(0);
    const navigate = useNavigate();
    useEffect(()=>{
        let total = 0
        state.cart.map((cart,index)=>{
            if(state.checkout.includes(index)){
                if(cart.discount){
                    total+=(cart.price*(1-cart.discount/100)*cart.quantity)
            }else{
                total+=cart.price*cart.quantity
            }
        }})
        setTotalSelect(total)
    },[state.cart,state.checkout])
    const handleCkeck =()=>{
        if(state.checkout.length===state.cart.length){
            dispatch(setCheckout([]))
        }
        if(state.checkout.length!==state.cart.length){
            let newselect:number[];
            newselect=[];
            for (let i=0;i<state.cart.length;i++){
                 newselect.push(i)
            }
            dispatch(setCheckout([...newselect]))
        }
       
    }
    const checkout = ()=>{
        if(state.checkout.length!==0){
            dispatch(setTotalAmount(totalSelect))
            navigate('/checkout')
        }
    }
    return (
        <div className="container" style={{display:"flex",justifyContent:"center"}}>
            <main className="cart-wrapper" style={{width:'90%'}} >
                <div className="Title" style={{ display: "flex", flexDirection: "row", flexWrap: 'nowrap', justifyContent: "center", alignItems: "center",marginBlock:'25px' }}>
                    <div className="chekcbox-wrapper" style={{ display: "flex", width: '10%', justifyContent: "center", alignItems: "center" }}>
                        <label className="stardust-checkbox" style={{ display: "flex", width: '40px', justifyContent: "center", alignItems: "center" }}>
                            <input className="stardust-checkbox__input" type="checkbox" style={{ width: '20px', height: '20px' }} checked={(state.cart.length!==0&&state.checkout.length===state.cart.length)}  onChange={handleCkeck}/>
                            <div className="stardust-checkbox__box">
                            </div>
                        </label>
                    </div>
                    <div className="title-wrapper" style={{ display: "flex", flexDirection: "row", width: "-webkit-fill-available", height: '50px', alignItems: "center" }}>
                        <div className="product-title" style={{ display: "flex", width: '50%', justifyContent: "center", alignItems: "center", borderRight: '1px dotted gray', borderLeft: '1px dotted gray' }}><span className="title" style={{ fontSize: '20px', fontWeight: 600 }}>ITEM DESCRITION</span></div>
                        <div className="price-title" style={{ display: "flex", width: '15%', justifyContent: "center", alignItems: "center", borderRight: '1px dotted gray', borderLeft: '1px dotted gray' }}><span className="title" style={{ fontSize: '20px', fontWeight: 600 }}>PRICE</span></div>
                        <div className="quantity-title" style={{ display: "flex", width: '15%', justifyContent: "center", alignItems: "center", borderRight: '1px dotted gray', borderLeft: '1px dotted gray' }}><span className="title" style={{ fontSize: '20px', fontWeight: 600 }}>QUANTITY</span></div>
                        <div className="amount-title" style={{ display: "flex", width: '10%', justifyContent: "center", alignItems: "center", borderRight: '1px dotted gray', borderLeft: '1px dotted gray' }}><span className="title" style={{ fontSize: '20px', fontWeight: 600 }}>AMOUNT</span></div>
                        <div className="delete-title" style={{ display: "flex", width: '10%', justifyContent: "center", alignItems: "center", borderRight: '1px dotted gray', borderLeft: '1px dotted gray' }}><span className="title" style={{ fontSize: '20px', fontWeight: 600 }}>DELETE</span></div>
                    </div>
                </div>
                
                <section className="carts-section">
                    {state.cart.map((cart,index) => <CartProduct key={index}
                      name={cart.name}
                      pageUrl={cart.pageUrl}
                      imageUrl={cart.imageUrl}
                      discount={cart.discount}
                      price={cart.price}
                      quantity={cart.quantity}
                      index={index} />)}
                </section>
                

                <div className="cart-footer" style={{ display: 'flex', flexDirection: "row", justifyContent: "center", alignItems: "center", height: '50px' }}>
                    <div className="totalamountwrapper" style={{ width: '-webkit-fill-available', display: 'flex', flexDirection: "row", marginLeft: '30%', justifyContent: "center", alignItems: "center", height: '50px' }}>
                        <div className="totalamount" style={{ display: 'flex', flexDirection: "row", width: '70%', justifyContent: "center", alignItems: "center", height: '50px' }}>
                            <div className="totalamounttitle" style={{ fontSize: '20px', fontWeight: 500 }}>Total Amount (0 items):</div>
                            <div className="totalamount" style={{ fontSize: '30px', fontWeight: 700, color: 'red' }} >€ {totalSelect.toFixed(2)}</div>
                        </div>
                    </div>
                    <div className="BuybuttonWrapper" style={{ display: 'flex', width: '30%', justifyContent: "center", alignItems: "center", height: '50px' }}>
                        <button className="Buybutton" style={{ width: '150px', justifyContent: "center", alignItems: "center", height: '35px', color: "white", backgroundColor: "red", border: '1px solid white' }} onClick={checkout}>
                            <span className="Ckeckout" style={{ fontSize: '25px', fontWeight: 700 }}>Checkout</span>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}