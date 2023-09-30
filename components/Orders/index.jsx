import moment from "moment";
import { useEffect,useState,useContext } from "react";
import classes from './order.module.css';
import {Context} from '../Layout'


const OrderHistory=()=>{
    const [orders,setOrders]=useState([]);
  const context=useContext(Context)
  const {session}=context;

    useEffect(()=>{
        fetch(`/api/orders?userid=${session?.user.id}`)
        .then((data)=>data.json())
        .then(({orders})=>{setOrders(orders)})
        .catch((err)=>{console.log(err)})
    },[session])

    if(orders.length===0){
        return <h3 className="text-warning text-center h3">All your previos orders will be displayed here. You have no Orders!</h3>
    }
    return(
        <div className="card p-3">
            <h1>Your Orders:</h1>
            <table className={classes.table}>
                <thead>
                    <th>ORDER ID</th>
                    <th>DATE</th>
                    <th>No. OF ITEMS</th>
                    <th>TOTAL</th>
                    <th>PAID ON</th>
                </thead>
                <tbody>
                    {orders?orders.map((order)=>{
                        return(
                            <tr key={order.orderid}>
                                <td>{order.orderid}</td>
                                <td>{ moment(order.createdAt).format('ll')}</td>
                                <td>{order.quantity}</td>
                                <td>{order.totalPrice.toFixed(2)}</td>
                                <td>{order.isPaid? moment(order.paidAt).format('ll') : 'No'}</td>
                                
                            </tr>
                        )
                    }):<h5>There are no Orders</h5>} 
                </tbody>
            </table>

        </div>
    )
}

export default OrderHistory