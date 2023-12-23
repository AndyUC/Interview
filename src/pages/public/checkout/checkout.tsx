import React, { useContext, useEffect,  useState } from 'react';
import './checkout.css'



import { MainContext } from '../../../provider/OrderProvider';
import { CheckoutItem } from './checkoutItem/checkoutItem';
import axios from 'axios';
import { setCart, setCheckout, setTotalAmount } from '../../../provider/orderStore';



export interface Iitem {
    gtin: string,
    quantity: number,
    price: IAmount,
    name: string,
    category: string,
    subCategory?: string[],
    sku: string,
    brand?: string,
    imageUrl?: string
}
interface IAmount {
    amount: number,
    currency: string
}

function Checkout() {

    const { state, dispatch } = useContext(MainContext)
    const [consumerGivenName, setConsumerGivenName] = useState('');
    const [consumerSurName, setConsumerSurName] = useState('');
    const [consumerEmail, setConsumerEmail] = useState('');
    const [consumerPhoneNumber, setConsumerPhoneNumber] = useState('');
    const [billingName, setBillingName] = useState('');
    const [billingPhoneNumber, setBillingPhoneNumber] = useState('');
    const [billingCountryCode, setBillingCountryCode] = useState('');
    const [billingPostCode, setBillingPostCode] = useState('');
    const [billingSuburb, setBillingSuburb] = useState('');
    const [billingLine1, setBillingLine1] = useState('');
    const [shippingName, setShippingName] = useState('');
    const [shippingCountryCode, setShippingCountryCode] = useState('');
    const [shippingPostCode, setShippingPostCode] = useState('');
    const [shippingSuburb, setShippingSuburb] = useState('');
    const [shippingLine1, setShippingLine1] = useState('');
    const [shippingPhoneNumber, setShippingPhoneNumber] = useState('');
    const [shipAmount, setShipAmount] = useState(0);
    const [consumerError, setConsumerError] = useState({phoneNumber:'',givenNames:'',surname:'',email:''});
    const [shippingError, setShippingError] = useState({phoneNumber:'',countryCode:'',name:'',postcode:'',suburb:'',line1:''});
    const [billingError, setBillingError] = useState({phoneNumber:'',countryCode:'',name:'',postcode:'',suburb:'',line1:''});
    const [itemError, setItemError] = useState('');
    const client = axios.create({
        baseURL: "https://jungtalentinterview-be.onrender.com"
    });
    useEffect(() => {
        if (state.totalAmount > 0) {
            setShipAmount(20)
        } else {
            setShipAmount(0)
        }
    }, [state.totalAmount])
    console.log(consumerError)

    const handleSubmit = async () => {
        console.log('submit')
        let consumer = {}
        let discountsarray = []
        let shipping = {}
        let products: {}[] = []
        let shippingAmount = {}
        let totalAmount = {}
        if (consumerGivenName.length > 0) {
            consumer = { ...consumer, givenNames: consumerGivenName }
        }
        if (consumerPhoneNumber.length > 0) {
            consumer = { ...consumer, phoneNumber: consumerPhoneNumber }
        }
        if (consumerSurName.length > 0) {
            consumer = { ...consumer, surname: consumerSurName }
        }
        if (consumerEmail.length > 0) {
            consumer = { ...consumer, email: consumerEmail }
        }
        let billing = {}
        if (billingPhoneNumber.length > 0) {
            billing = { ...billing, phoneNumber: billingPhoneNumber }
        }
        if (billingCountryCode.length > 0) {
            billing = { ...billing, countryCode: billingCountryCode }
        }
        if (billingName.length > 0) {
            billing = { ...billing, name: billingName }
        }
        if (billingPostCode.length > 0) {
            billing = { ...billing, postcode: billingPostCode }
        }
        if (billingSuburb.length > 0) {
            billing = { ...billing, suburb: billingSuburb }
        }
        if (billingLine1.length > 0) {
            billing = { ...billing, line1: billingLine1 }
        }

        if (shippingPhoneNumber.length > 0) {
            shipping = { ...shipping, phoneNumber: shippingPhoneNumber }
        }
        if (shippingCountryCode.length > 0) {
            shipping = { ...shipping, countryCode: shippingCountryCode }
        }
        if (shippingName.length > 0) {
            shipping = { ...shipping, name: shippingName }
        }
        if (shippingPostCode.length > 0) {
            shipping = { ...shipping, postcode: shippingPostCode }
        }
        if (shippingSuburb.length > 0) {
            shipping = { ...shipping, suburb: shippingSuburb }
        }
        if (shippingLine1.length > 0) {
            shipping = { ...shipping, line1: shippingLine1 }
        }

        state.checkout.map(select => {
            let item = {}
            item = {
                quantity: state.cart[select].quantity,
                name: state.cart[select].name,
                category: state.cart[select].category,
                brand: state.cart[select].brand,
                pageUrl: state.cart[select].pageUrl,
                imageUrl: state.cart[select].imageUrl,
                price: { amount: state.cart[select].price.toFixed(2), currency: 'EUR' }
            }
            if (state.cart[select].subcatalog) {
                item = { ...item, subcategory: state.cart[select].subcatalog }
            }
            products.push(item)
            if (state.cart[select].discount) {
                const amount = state.cart[select].price * (state.cart[select].discount || 1) * state.cart[select].quantity / 100
                discountsarray.push({ amount: { amount: amount.toFixed(2), currency: 'EUR' }, displayName: state.cart[select]._id + ' ' + state.cart[select].discount + '% discount' })
            }

        })

        if (shipAmount > 0) {
            shippingAmount = { amount: shipAmount.toFixed(2), currency: 'EUR' }
        }
        let taxAmount = {}
        if (state.totalAmount > 0) {
            taxAmount = { amount: (state.totalAmount * 0.1).toFixed(2), currency: 'EUR' };
            totalAmount = { amount: state.totalAmount.toFixed(2), currency: 'EUR' }
        }
        if (state.totalAmount > 100) {
            discountsarray.push({ amount: { amount: (state.totalAmount * 0.1).toFixed(2), currency: 'EUR' }, displayName: '10% for more 100EUR' })
        }

        try {
            const res = await client.post('/api/v1/order', {
                consumer: consumer,
                billing: billing,
                shipping: shipping,
                items: products,
                shippingAmount: shippingAmount,
                taxAmount: taxAmount,
                discounts: discountsarray,
                totalAmount: totalAmount
            })
            console.log(res.data.checkoutUrl)
            const newcart = state.cart
            state.checkout.map(items => newcart.splice(items, 1))
            localStorage.setItem('cart', JSON.stringify([...newcart]))
            dispatch(setCart([...newcart]))
            dispatch(setCheckout([]))
            dispatch(setTotalAmount(0))
            window.location.replace(res.data.checkoutUrl);
        } catch (error: any) {
            const errors = error.response.data;
            console.log(error.response.data)
            errors.map((err: any) =>{
                let messages = ""
                err.messages.map((mes:any)=>messages+=mes)
                switch(err.field[0]){
                    case "consumer":
                        if((err.field.length<=1)){
                        setConsumerError({phoneNumber:'',givenNames:'Given Name is Required',surname:'Surname is Required',email:''})
                        }else{
                           switch(err.field[1]){
                            case 'phoneNumber':
                                consumerError.phoneNumber=messages
                            break;
                            case 'givenNames':
                                consumerError.givenNames=messages
                            break;
                            case 'surname':
                                consumerError.surname=messages
                            break;
                            case 'email':
                                consumerError.email=messages
                            break;
                            default:
                                console.log(err.field)
                                break
                           }
                           setConsumerError({...consumerError})
                           }
                           
                           break;
                    case "billing":
                               switch(err.field[1]){
                                case 'phoneNumber':
                                    billingError.phoneNumber=messages
                                break;
                                case 'countryCode':
                                    billingError.countryCode=messages
                                break;
                                case 'name':
                                    billingError.name=messages
                                break;
                                case 'postCode':
                                    billingError.postcode=messages
                                break;
                                case 'suburb':
                                    billingError.suburb=messages
                                break;
                                case 'line1':
                                    billingError.line1=messages
                                break;
                                default:
                                    console.log(err.field)
                                    break
                               }
                              setBillingError({...billingError})
                        break;
                    case "shipping":
                        if(!(err.field.length>1)){
                            setShippingError({phoneNumber:'',countryCode:'countryCode is required',name:'name is required',postcode:'postcode is required',suburb:'suburb is required',line1:'line1 is required'})
                        }else{
                            switch(err.field[1]){
                                case 'phoneNumber':
                                    shippingError.phoneNumber=messages
                                break;
                                case 'countryCode':
                                    shippingError.countryCode=messages
                                break;
                                case 'name':
                                    shippingError.name=messages
                                break;
                                case 'postCode':
                                    shippingError.postcode=messages
                                break;
                                case 'suburb':
                                    shippingError.suburb=messages
                                break;
                                case 'line1':
                                    shippingError.line1=messages
                                break;
                                default:
                                    console.log(err.field)
                                    break
                               }
                              setBillingError({...billingError})
                        break;
                        }
                    break;
                    case "totalAmount":
                        setItemError('No Item Here')
                    break;
                    default:
                        console.log(err)
                    }
            }
            )
        }

    }

    return (
        <div className='ckeckoutFormWrapper' >
            <div className='orderForm' style={{ display: 'flex', flexDirection: 'column', width: '45%', backgroundColor: 'white' }}>
                <h2 className='title'>CONSUMER INFORMATION *</h2>
                <div className='orderInputWrapper'>
                    <div className='subTitle'>Given Names *</div>
                    <input className='orderInput' placeholder='givenNames' onChange={(e) => {if(consumerError.givenNames!==''){consumerError.givenNames='';setConsumerError({...consumerError})};setConsumerGivenName(e.target.value)}} style={{ width: '90%', height: '30px', fontSize: '17px' }} />
                    {<div className='error'>{consumerError.givenNames}</div>}
                </div>
                <div className='orderInputWrapper'>
                    <div className='subTitle'>Surname *</div>
                    <input className='orderInput' placeholder='surname' onChange={(e) => {if(consumerError.surname!==''){consumerError.surname='';setConsumerError({...consumerError})};setConsumerSurName(e.target.value)}} />
                    {<div className='error'>{consumerError.surname}</div>}
                </div>
                <div className='orderInputWrapper'>
                    <div className='subTitle'>Email</div>
                    <input className='orderInput' placeholder='email' onChange={(e) => {if(consumerError.email!==''){consumerError.email='';setConsumerError({...consumerError})};setConsumerEmail(e.target.value)}} />
                    {<div className='error'>{consumerError.email}</div>}
                </div>
                <div className='orderInputWrapper'>
                    <div className='subTitle'>phoneNumber</div>
                    <input className='orderInput' placeholder='phoneNumber' onChange={(e) => {if(consumerError.phoneNumber!==''){consumerError.phoneNumber='';setConsumerError({...consumerError})};setConsumerPhoneNumber(e.target.value)}} />
                    {<div className='error'>{consumerError.phoneNumber}</div>}
                </div>
                <div style={{ height: '20px' }}></div>
            </div>
            <div className='orderForm'>
            <div className='orderInputWrapper'>
            {<div className='error'>{itemError}</div>}
            </div>
                <div className='itemsForm'>
                    {state.checkout.map(item => <CheckoutItem imageUrl={state.cart[item].imageUrl} name={state.cart[item].name} quantity={state.cart[item].quantity} />)}
                </div>
                <div className='Cash'>
                    <div className='cashTitle'>Cash Details</div>
                    <div className='cashDetailsForm'>
                        <div className='cashDetailTitle'>Subtotal</div>
                        <div className='cashDetaiAmount'>€ {(state.totalAmount).toFixed(2)}</div>
                    </div>
                    <div className='cashDetailsForm'>
                        <div className='cashDetailTitle'>Estimate Shipping</div>
                        <div className='cashDetaiAmount'>€ {shipAmount}</div>
                    </div>
                    <div className='cashDetailsForm'>
                        <div className='cashDetailTitle'>Estimate Tax</div>
                        <div className='cashDetaiAmount'>€ {(state.totalAmount * 0.1).toFixed(2)}</div>
                    </div>
                    {state.totalAmount > 100 &&
                        <div className='cashDetailsForm'>
                            <div className='cashDetailTitle' style={{ color: 'red' }}>Discount</div>
                            <div className='cashDetaiAmount' style={{ color: 'red' }}>€ {(state.totalAmount * 0.1).toFixed(2)}</div>
                        </div>}
                    <div className='cashDetailsForm' style={{ marginTop: '10px' }}>
                        <div className='cashDetailTitle' style={{ fontWeight: 700 }}>Total</div>
                        <div className='cashDetaiAmount' style={{ fontWeight: 700 }}>€ {state.totalAmount > 0 ? state.totalAmount > 100 ? (state.totalAmount + 10).toFixed(2) : (state.totalAmount * 1.1 + 10).toFixed(2) : '0.00'}</div>
                    </div>
                </div>
                <div style={{ height: '20px' }}></div>
            </div>
            <div className='orderForm'>
                <h2 className='title'>BILLING TO</h2>
                <div className='orderInputWrapper'>
                    <div className='subTitle'>Phone Number</div>
                    <input className='orderInput' placeholder='PhoneNumber' onChange={(e) =>{if(billingError.phoneNumber!==''){billingError.phoneNumber='';setBillingError({...billingError})};setBillingPhoneNumber(e.target.value)} } />
                    {<div className='error'>{billingError.phoneNumber}</div>}
                </div>
                <div className='orderInputWrapper'>
                    <div className='subTitle'>Name</div>
                    <input className='orderInput' placeholder='Name' onChange={(e) => {if(billingError.name!==''){billingError.name='';setBillingError({...billingError})};setBillingName(e.target.value)}} />
                    {<div className='error'>{billingError.name}</div>}
                </div>
                <div className='orderInputWrapper'>
                    <div className='subTitle'>Country Code</div>
                    <input className='orderInput' placeholder='CountryCode' onChange={(e) => {if(billingError.countryCode!==''){billingError.countryCode='';setBillingError({...billingError})};setBillingCountryCode(e.target.value)}} />
                    {<div className='error'>{billingError.countryCode}</div>}
                </div>
                <div className='orderInputWrapper'>
                    <div className='subTitle'>Post Code</div>
                    <input className='orderInput' placeholder='PostCode' onChange={(e) => {if(billingError.postcode!==''){billingError.postcode='';setBillingError({...billingError})};setBillingPostCode(e.target.value)}} />
                    {<div className='error'>{billingError.postcode}</div>}
                </div>
                <div className='orderInputWrapper'>
                    <div className='subTitle' style={{fontWeight:600}}>Address</div>
                </div>
                <div className='orderInputWrapper'>
                    <div className='subTitle'>Suburb</div>
                    <input className='orderInput' placeholder='Suburb' onChange={(e) => {if(billingError.suburb!==''){billingError.suburb='';setBillingError({...billingError})};setBillingSuburb(e.target.value)}} />
                    {<div className='error'>{billingError.suburb}</div>}
                </div>
                <div className='orderInputWrapper'>
                    <div className='subTitle'>Line1</div>
                    <input className='orderInput' placeholder='Line1' onChange={(e) => {if(billingError.line1!==''){billingError.line1='';setBillingError({...billingError})};setBillingLine1(e.target.value)}} />
                    {<div className='error'>{billingError.line1}</div>}
                </div>
                <div style={{ height: '20px' }}></div>
            </div>
            <div className='orderForm' >
                <h2 className='title'>SHIPPING TO</h2>
                <div className='orderInputWrapper'>
                    <div className='subTitle'>Phone Number</div>
                    <input className='orderInput' placeholder='PhoneNumber' onChange={(e) => {if(shippingError.phoneNumber!==''){shippingError.phoneNumber='';setShippingError({...shippingError})};setShippingPhoneNumber(e.target.value)}} />
                    {<div className='error'>{shippingError.phoneNumber}</div>}
                </div>
                <div className='orderInputWrapper'>
                    <div className='subTitle'>Name *</div>
                    <input className='orderInput' placeholder='Name' onChange={(e) => {if(shippingError.name!==''){shippingError.name='';setShippingError({...shippingError})};setShippingName(e.target.value)}} />
                    {<div className='error'>{shippingError.name}</div>}
                </div>
                <div className='orderInputWrapper'>
                    <div className='subTitle'>Country Code *</div>
                    <input className='orderInput' placeholder='CountryCode' onChange={(e) => {if(shippingError.countryCode!==''){shippingError.countryCode='';setShippingError({...shippingError})};setShippingCountryCode(e.target.value)}} />
                    {<div className='error'>{shippingError.countryCode}</div>}
                </div>
                <div className='orderInputWrapper'>
                    <div className='subTitle'>Post Code *</div>
                    <input className='orderInput' placeholder='PostCode' onChange={(e) => {if(shippingError.postcode!==''){shippingError.postcode='';setShippingError({...shippingError})};setShippingPostCode(e.target.value)}} />
                    {<div className='error'>{shippingError.postcode}</div>}
                </div>
                <div className='orderInputWrapper'>
                    <div className='subTitle' style={{fontWeight:600}}>Address</div>
                </div>
                <div className='orderInputWrapper'>
                    <div className='subTitle'>Suburb *</div>
                    <input className='orderInput' placeholder='Suburb' onChange={(e) => {if(shippingError.suburb!==''){shippingError.suburb='';setShippingError({...shippingError})};setShippingSuburb(e.target.value)}} />
                    {<div className='error'>{shippingError.suburb}</div>}
                </div >
                <div className='orderInputWrapper'>
                    <div className='subTitle'>Line1 *</div>
                    <input className='orderInput' placeholder='Line1' onChange={(e) => {if(shippingError.line1!==''){shippingError.line1='';setShippingError({...shippingError})};setShippingLine1(e.target.value)}} />
                    {<div className='error'>{shippingError.line1}</div>}
                </div>
            </div>

            <div style={{ height: '20px' }}></div>
            <div className='OrderFooter' style={{ width: '-webkit-fill-available', display: 'flex', flexDirection: 'row' }}>
                <div className='Order Note' style={{ width: '60%', display: 'flex', justifyItems: 'center' }}>By press 'Order', you agree with our policy</div>
                <div className='OrderButtonWrapper' style={{ width: '40%', display: 'flex', justifyItems: 'center', justifyContent: 'center' }}> <div className='Confirm' role='button' onClick={handleSubmit} style={{ width: '50%', height: '50px', backgroundColor: 'orangered', color: 'white', fontSize: '30px', fontWeight: 700, alignItems: 'center', justifyContent: 'center',textAlign:'center', zIndex: 2 }}>Order</div></div>
            </div>
        </div>

    );
}

export default Checkout;
