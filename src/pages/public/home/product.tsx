import { useState } from 'react';
import { HiReceiptPercent } from 'react-icons/hi2'
import { useNavigate } from 'react-router';

type ProductProps={
    imageUrl:string,
    discount?:number,
    name:string,
    price:number,
    id:string
}
export const Product = (props:ProductProps) => {
    const navigate = useNavigate()
    return (
        <div className="product-section" style={{ width: '200px'}} role='button' onClick={()=>navigate('/'+props.id)}>
            {props.discount&&<div style={{ backgroundColor: 'red', color: "white", width: '45px', height: '30px', display: 'flex', flexDirection: 'row', alignItems: 'center',position:'absolute'}}><span style={{ fontWeight: 700, fontSize: '15px', width: '30px' }}>{props.discount}</span><HiReceiptPercent style={{ width: '20px', height: '20px' }} /></div>}
            <div className="product-wrapper" style={{ backgroundColor: 'white', boxShadow: '1px 2px #F5F5F5'}}>
                <img src={props.imageUrl} alt={props.name} className="productimage" style={{width:'100%',aspectRatio:'1/1'}} />
                <div className='productname' style={{height:'100px',display:'flex'}}>
                <div className="productname" style={{width:'90%',fontSize:'16px',fontWeight:500}}>{props.name}</div>
                </div>
                    {(props.discount&&props.discount>0)?<div className='pricewrapper' style={{height:'15%',display:'flex',flexDirection:'row',columnGap:'20px'}}><span style={{textDecoration:'line-through',fontSize:'16px',fontWeight:500,color:'gray'}}>€ {props.price}</span><span style={{fontSize:'16px',fontWeight:600}}>€ {(100-props.discount)*props.price/100}</span></div>:<div style={{height:'15%',display:'flex',flexDirection:'row',columnGap:'20px'}}><span style={{fontSize:'20px',fontWeight:600}}>€ {props.price}</span></div>}
            </div>
        </div>
    )
}

