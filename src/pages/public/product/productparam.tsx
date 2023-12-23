import { useContext, useEffect, useState } from "react";
import { BsCartPlus } from 'react-icons/bs'
import { PiSparkleDuotone, PiStool } from 'react-icons/pi'
import { IoBagCheckOutline } from 'react-icons/io5'
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { MainContext } from "../../../provider/OrderProvider";
import { setCart } from "../../../provider/orderStore";
import { client } from "../../../clientaxios";

type Producttype = {
    _id: string,
    remain: number,
    name: string,
    price: number,
    category: string,
    imageUrl: string,
    brand: string,
    subcatalog?: string[],
    discount?: number
}

export function ProductParam() {
    const [post, setPost] = useState<Producttype>({ _id: '', name: '', remain: 0, price: 0, category: '', imageUrl: '', brand: '' })
    const [quantity, setQuantity] = useState<number>(1);
    const {state,dispatch}= useContext(MainContext);
    const location = useLocation();
    const navigate= useNavigate();
    console.log(state.cart)
    const fetchData = async (api: string) => {
       
        try {
            const res = await client.get(api + location.pathname)
            setPost(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log(location)
        const api = '/api/v1/product/'
        fetchData(api)
    }, []);
    const deacreaseClick=()=>{
        if(quantity>1){
            const newquantity=quantity-1
            setQuantity(newquantity)
        }
       
    }
    const increaseClick=()=>{
        const newquantity=quantity+ 1
        setQuantity(newquantity)
    }
    const Addtocart=()=>{
        localStorage.setItem('cart',JSON.stringify([...state.cart,{...post,quantity:quantity,pageUrl:'/'+post._id}]))
        dispatch(setCart([...state.cart,{...post,quantity:quantity,pageUrl:'/'+post._id}]))
        navigate('/')
    }
    return (
        <section className="product-briefing" style={{ display: "flex", flexDirection: 'column', minHeight:'-webkit-fill-available', marginLeft: '20px', rowGap: '50px' }}>

            <section className="product-section" style={{ display: "flex", flexDirection: "row", justifyContent: "center", columnGap: '40px', width: '90%', backgroundColor: "#F5F4F4", borderRadius: '5px 5px 5px 5px' }}>

                <img alt="" className="product-image" src={post.imageUrl} style={{ width: '30%', marginBlock: '25px' }} />
                <section className="product-info" style={{ width: '50%' }}>
                    <div style={{ height: '1px' }}></div>
                    <h1 className="product-brief" style={{ marginBlockStart: '0.33em', fontSize: '25px' }} >{post.name}
                    </h1>
                    <div>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                        <div className="Price">
                            <div className="flex flex-column +o886E">
                                <section className="price-section">
                                    {post.discount ?
                                        <div className="price-content" style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div className="price-after-discount-content" style={{ display: 'flex', flexDirection: 'row' }}>
                                                <div className="price" style={{ textDecoration: 'line-through', fontSize: '20px', fontWeight: 500, color: "gray", width: '100px' }}>€ {post.price}</div>
                                                <div className="price-after-discount" style={{ fontSize: '20px', fontWeight: 500, width: '100px' }}>€ {post.price * (100 - post.discount) / 100}</div>
                                            </div>
                                            <div className="discount" style={{ color: "white", backgroundColor: 'red', width: '100px', height: '20px', fontSize: '15px', display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}>13% Discount</div>

                                        </div> : <div className="price-content" style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div className="price-after-discount-content" style={{ display: 'flex', flexDirection: 'row' }}>
                                                <div className="price-after-discount" style={{ fontSize: '20px', fontWeight: 500, width: '100px' }}>€ {post.price}</div>
                                            </div>
                                        </div>
                                    }
                                </section>
                            </div>
                        </div>
                    </div>


                    <section className="quantity">
                        <div className="quantity-wrapper" style={{ display: "flex", flexDirection: 'row' }}>
                            <div className="title" style={{ fontWeight: 500, fontSize: '20px', width: '150px' }}>Quantity</div>
                            <div className="flex items-center">
                                <div style={{ marginRight: '15px' }}>
                                    <div className="input-quantity" style={{ display: "flex", flexDirection: 'row', columnGap: '20px' }}>
                                        <div className="quantity-controller" style={{ display: "flex", flexDirection: 'row' }}>
                                            <button className="qty-button" style={{ width: '25px', height: '25px', display: "flex", alignItems: "center", backgroundColor: "white" }} onClick={deacreaseClick}>
                                                <span style={{ fontSize: '20px' }}>-</span>
                                            </button>
                                            <span className="quantity"style={{ width: '80px', fontSize:'20px',textAlign:"center" }}> {quantity}</span>
                                            <button className="qty-button" style={{ width: '25px', height: '25px', backgroundColor: "white", alignItems: "center" }} onClick={increaseClick}>
                                                <span style={{ fontSize: '20px' }}>+</span>
                                            </button>

                                        </div>
                                        
                                    </div>
                                </div>
                            
                        </div>
                        </div >
                        <div className="remain" style={{ fontSize: '15px',marginBlock:'10px' }}>{post.remain} product available</div>
                    </section>



                    <div style={{
                        marginTop: '15px'
                    }}>
                        <div className="checkout-or-cart-section">
                            <div className="checkout-or-cart-wrapper" style={{ display: "flex", flexDirection: 'row', columnGap: '10px' }}>
                                <button type="button" className="add-to-cart-button" style={{ display: "flex", flexDirection: 'row',alignItems:"center", columnGap: '10px', backgroundColor:'lightgoldenrodyellow',color:'red',border:'1px solid red',height:'40px' }} onClick={Addtocart}>
                                    <BsCartPlus className="cart-icon" style={{height:'30px',width:'30px'}} />
                                    <span style={{fontSize:'20px',fontWeight:550}}>Add to Cart
                                    </span>
                                </button>
                                <button type="button" className="buy-button" style={{ display: "flex", flexDirection: 'row',alignItems:"center", columnGap: '10px', backgroundColor:'red',color:'white',border:'1px solid red',height:'40px' }} >
                                    <IoBagCheckOutline style={{height:'30px',width:'30px'}} />
                                    <span style={{fontSize:'20px',fontWeight:550}}>Buy Now</span>
                                </button>
                            </div>
                        </div>
                    </div >


                    <div style={{ marginTop: `30px`, borderTop: `1px solid rgba(0, 0, 0, 0.05)`, marginBlockEnd: '0.3em' }}>
                        < div className="welfare" style={{ display: 'flex', flexDirection: "row", columnGap: "10px"}}>
                            <div className="welfareWrapper" id="welfare1" tabIndex={0} style={{width:'30%' }}>
                                <div className="welfare-center" style={{ borderRight: '0.5px' }}>
                                    <img className="welfare-img" src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/6c502a2641457578b0d5f5153b53dd5d.png" />
                                    <div className="welfare-text" >7 day return
                                    </div>
                                </div>
                            </div>
                            <div className="welfareWrapper" id="welfare2" tabIndex={0} style={{width:'30%' }}>
                                <div className="welfare-center">
                                    <img className="welfare-img" src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/511aca04cc3ba9234ab0e4fcf20768a2.png" />
                                    <div className="welfare-text">100% Offical
                                    </div>
                                </div>
                            </div>
                            <div className="welfareWrapper" id="welfare3" tabIndex={0} style={{width:'30%' }}>
                                <div className="welfare-center">
                                    <img className="welfare-img" src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/16ead7e0a68c3cff9f32910e4be08122.png" />
                                    <div className="welfare-text">Freeship
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ height: '1px' }}></div>
                </section>
            </section >
            <section className="product-details" style={{ display: 'flex', flexDirection: 'column', width: '90%', backgroundColor: "#F5F4F4" }} >
                <div className="product-details-block" style={{ marginBlockEnd: '20px' }}>
                    <h1 className="product-details-title">PRODUCT-DETAILS</h1>
                    <div className="product-detail-wrapper" style={{ display: 'flex', flexDirection: 'row', columnGap: '20px' }}>
                        <div className="product-detail-title" style={{ width: '100px', fontWeight: 400, fontSize: '22px', color: "gray", }}>Brand</div>:
                        <div className="product-detail-content" style={{ fontWeight: 400, fontSize: '18px' }}>{post.brand}</div>
                    </div>

                    <div className="product-detail-wrapper" style={{ display: 'flex', flexDirection: 'row', columnGap: '20px' }}>
                        <div className="product-detail-title" style={{ width: '100px', fontWeight: 400, color: "gray", fontSize: '22px' }}>Catalog</div>:
                        <div className="product-detail-content" style={{ fontWeight: 400, fontSize: '18px' }}>Catalog</div>
                    </div>
                    {post.subcatalog &&
                        <div className="product-detail-wrapper" style={{ display: 'flex', flexDirection: 'row', columnGap: '20px' }}>
                            <div className="product-detail-title" style={{ width: '100px', fontWeight: 400, color: "gray", fontSize: '22px' }}>SubCatalog</div>:
                            {post.subcatalog.map((subcatalog) => <div className="product-detail-content" style={{ fontWeight: 400, fontSize: '18px', textDecoration: 'underline' }}>{subcatalog}</div>)}
                        </div>}

                    <div className="product-detail-wrapper" style={{ display: 'flex', flexDirection: 'row', columnGap: '20px' }}>
                        <div className="product-detail-title" style={{ width: '100px', fontWeight: 400, color: "gray", fontSize: '22px' }}>Remain</div>:
                        <div className="product-detail-content" style={{ fontWeight: 400, fontSize: '18px' }}>{post.remain}</div>
                    </div>
                </div>
            </section>
        </section >
    )
}