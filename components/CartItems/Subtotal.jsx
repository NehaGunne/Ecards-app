import CurrencyFormat from 'react-currency-format';
import classes from '../../styles/Subtotal.module.css'
import { useContext} from "react";
import { Context } from "../Layout";
import PaymentBtn from './PaymentBtn';

export const getTotalBill=(cart)=>{
    let amount=0;
    for(let i of cart){
        amount=i.price+amount
    }
    return amount;
}
const Subtotal=()=>{
    const context=useContext(Context);
  const {cart}=context;
    
    return(
        <div className={`${classes.subtotal} mt-5`}>
            <CurrencyFormat
            renderText={(value)=>(
                <>
                <p>
                    Subtotal ({cart.length} items):
                    <strong>&#8377;{value}</strong>
                </p>
                <small className={classes.subtotal_gift}>
                    <input type='checkbox'/>
                    This order contains a gift
                </small>
                </>
            )}
            decimalScale={2}
            value={getTotalBill(cart)}
            displayType={'text'}
            thousandSeperator={true}
            
            />
            <PaymentBtn totalPrice={getTotalBill(cart)}/>

        </div>
    )
}
export default Subtotal;