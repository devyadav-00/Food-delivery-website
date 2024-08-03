import React, { useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios'
import {toast} from 'react-toastify'
import {assets} from '../../assets/admin_assets/assets'

const Order = ({url}) => {

  const [orders,setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url+"/api/order/list")
    if(response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data)
    }
    else {
      toast.error("Error")
    }
  }

  const statusHandler = async (event,orderId) => {
    //console.log(event,orderId)
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status : event.target.value
    })
    if(response.data.success) {
      await fetchAllOrders()
    }
  }

  useEffect(()=>{
    fetchAllOrders()
  },[])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order,index)=>(
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.orderItem.map((item,index)=>{
                  if(index===order.orderItem.length-1) {
                    return item.name + " x " + item.quantity
                  }
                  else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>
              <p className='order-item-name'>{order.userAddress.firstName+" "+order.userAddress.lastName}</p>
              <div className="order-item-address">
                <p>{order.userAddress.street+","}</p>
                <p>{order.userAddress.city+", "+order.userAddress.state+", "+order.userAddress.country+", "+order.userAddress.zipcode}</p>
              </div>
              <p className="order-item-phone">{order.userAddress.phone}</p>
            </div>
            <p>Items : {order.orderItem.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order