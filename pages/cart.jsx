import classes from '../styles/cart.module.css';
import CartItems from '../components/CartItems';
import Subtotal from '../components/CartItems/Subtotal';


const Cart=()=>{

    
    return(
        <div className={`${classes.checkout}`}>
            <div className='w-75'>
                <div>
                    <h2 className={classes.checkout_title}>Your Shopping Cart</h2>
                </div>
                <CartItems/>
            </div>
            <div className={classes.checkout_right}>
                <Subtotal/> 
            </div>

        </div>

    )
}

export default Cart;