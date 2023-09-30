import classes from "../../styles/CartItem.module.css";
import Image from "next/image";
import RatingStars from "../RatingStars";
import { useContext} from "react";
import { Context } from "../Layout";

const CartItems = () => {
  const context=useContext(Context);
  const {session,cart,setCart}=context;

  const removeFromCart=async(item)=>{
    const res=await fetch(`/api/cart?userid=${session?.user.email}&cartid=${item.cartid}`,{
      method:"DELETE"
    })
    const result=await res.json()
   setCart(result.cart)

  }

  if (cart.length === 0) {
    return (
      <h3 style={{ color: "gray", textAlign: "center" }}>The Cart is Empty!</h3>
    );
  }
  return (
    <div>
      {cart.map((each) => {
        return (
          <div className={classes.cart_item} key={each.cartid}>
            <div className="d-flex flex-row">
              <div>
                <Image
                  src={each.img}
                  className={classes.cart_img}
                  alt={each.name}
                  width={100}
                  height={100}
                />
              </div>
              <div>
                <p className="text-secondary h5">{each.title}</p>
                <strong>&#8377;{each.price}</strong>
                <RatingStars rating={each.rating} />
               
                <button onClick={()=>removeFromCart(each)} className={`btn btn-danger mt-3`}>
                  Remove from Cart
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItems;
