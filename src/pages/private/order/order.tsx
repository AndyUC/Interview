import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import type { TimeRangePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import { BsSearch } from 'react-icons/bs';
import './order.css'
import { useLocation } from 'react-router';
export const Order = () => {
    const location = useLocation()
    console.log(location.search)
    return <div className='order' style={{ marginLeft: '250px' }}>
        <div className="orderHeader" >
            <div className="headerItem">Unpaid</div>
            <div className="headerItem">To Ship</div>
            <div className="headerItem">Shipping</div>
            <div className="headerItem">Completed</div>
            <div className="headerItem">Failed Delivery</div>
            <div className="headerItem">Cancelation</div>
            <div className="headerItem">Return/ Refund</div>
        </div>
        <div className="orderContent">
            <div className='orderSearching'>
                <div className='orderSearchingBar'>
                    <span className='orderSearchingTitle'>Order Id:</span>
                    <input className='orderSearchingInput' />
                    <div className='orderSearchingButton'>
                        <BsSearch className='searchingIcon' />
                    </div>
                </div>
                <Calendar />
            </div>
        
        <h3 className='numberOrder'>0 Order</h3>
        <div className='orderDetails'>
            <div className='orderDetailsProduct' style={{alignItems:'center',justifyContent:'center'}}>Product</div>
            <div className='orderDetailsAmount'>Amount</div>
            <div className='orderDetailsType'>Type</div>
            <div className='orderDetailsAction'>Action</div>
        </div>
        <div className='orderDetails'>
        <div className='orderDetailsProduct'>Product</div>
            <div className='orderDetailsAmount'>Amount</div>
            <div className='orderDetailsType'>Type</div>
            <div className='orderDetailsAction'>Action</div>
        </div>
        </div>
    </div>
}




const { RangePicker } = DatePicker;


const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    console.log(dates)
    if (dates) {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    } else {
        console.log('Clear');
    }
};

const rangePresets: TimeRangePickerProps['presets'] = [
    { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
];
type CalendarProps = {
    setFrom: Function
    setTo: Function
}
const Calendar = () => {

    return (
        <Space direction="vertical" size={12}>
            <RangePicker presets={rangePresets} onChange={(value) => { const a = value?.[0]?.toString(); console.log(a) }} />

        </Space>
    )
};
