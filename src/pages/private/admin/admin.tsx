
import { useEffect, useState } from 'react';
import './admin.css'
import { Route, Routes } from 'react-router';
import { Line } from 'react-chartjs-2';
import { data } from '../data';
import { CategoryScale, Chart, LinearScale, PointElement, LineElement } from "chart.js";



export const Admin = () => {
    const label = ['Mon', 'Tue', 'Wes', 'Thus', 'Fri', 'Sat', 'Sun']
    const [userData, seUsertData] = useState({
        labels: label,
        datasets: [{ label: 'User Access', data: data.map(data => data.access), backgroundColor: ["red"], borderColor: 'red', borderWidth: 1, pointRadius: 2 }]
    });
    

    Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

    return (
        <div className="admin">
            <div className='adminContent'>
                <h2>To do List</h2>
                <div className="to-do-box" >
                    <a href="/admin/order?type=unpaid" className="to-do-box-aitem">
                        <p className="item-title"> 0 </p>
                        <p className="item-desc"> Unpaid </p>
                    </a>
                    <a href="/admin/shipment?type=toship" className="to-do-box-aitem">
                        <p className="item-title"> 0 </p>
                        <p className="item-desc"> To-Process Shipment </p>
                    </a>
                    <a href="/admin/shipment?type=shipping" className="to-do-box-aitem">
                        <p className="item-title"> 0 </p>
                        <p className="item-desc"> Processed Shipment </p>
                    </a>
                    <a href="/admin/order?type=cancelled" className="to-do-box-aitem">
                        <p className="item-title"> 0 </p>
                        <p className="item-desc"> Pending Cancellation </p>
                    </a>
                    <a href="/admin/order?type=refund" className="to-do-box-aitem">
                        <p className="item-title"> 0 </p>
                        <p className="item-desc"> Pending Return/Refund </p>
                    </a>

                    <a href="/admin/product/list/banned" className="to-do-box-aitem">
                        <p className="item-title"> 0 </p>
                        <p className="item-desc"> Deboosted Products </p>
                    </a>
                    <a href="/admin/product/list/soldout" className="to-do-box-aitem">
                        <p className="item-title"> 0 </p>
                        <p className="item-desc"> Sold Out Products </p>
                    </a>
                    <a href="/admin/growth/havent-archive" className="to-do-box-aitem">
                        <p className="item-title"> 0 </p>
                        <p className="item-desc">
                            <span >Pending Campaign</span>
                        </p>
                    </a>
                </div>

            </div>
            <div className='adminContent' style={{ width: '90%' }}><h2> Business Insights</h2>

                <div className='box'>

                    <div className='content'>
                        <h3>Last week</h3>
                        <Line data={userData} options={{
                            scales: { y: { beginAtZero: true } }
                        }} />
                    </div>
                    <div className='content'>
                        <div className='item'>
                            <h5 className='item-title'>Visitor</h5>
                            <h4 className='item-data'>0</h4>
                            <div className='item-increase'><span>vs yesterday</span> 0.00%</div>
                        </div>
                        <div className='item'>
                            <h5 className='item-title'>PageView</h5>
                            <h4 className='item-data'>0</h4>
                            <div className='item-increase'><span>vs yesterday</span> 0.00%</div>
                        </div>
                        <div className='item'>
                            <h5 className='item-title'>Order</h5>
                            <h4 className='item-data'>0</h4>
                            <div className='item-increase'><span>vs yesterday</span> 0.00%</div>
                        </div>
                        <div className='item'>
                            <h5 className='item-title'>Conversion Rate</h5>
                            <h4 className='item-data'>0.00%</h4>
                            <div className='item-increase'><span>vs yesterday</span> 0.00%</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )

}