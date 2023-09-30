import Image from "next/image";
import RatingStars from "../RatingStars";
import classes from "./details.module.css";
import Reviews from "./Reviews";
import { useContext} from "react";
import { Context } from "../Layout";

const DetailsPageComponent = (props) => {
  const context=useContext(Context);
  const {session,setCart}=context;
  const {ecard}=props;
  const { title, price, img, description, id, rating ,stripeid} = ecard;
  const addToCart=async()=>{
    const data={cardid:id,title,price,img,rating,userid:session?.user.email,stripeid}
    try{

      const result=await fetch('/api/cart',{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
          'Content-Type':'application/json'
        }
      })
      const response=await result.json()
      if(result.status==400){
        alert( response.message)
      }
      else{
        setCart(response.cart);

      }
    }
    catch(err){
      alert(err.message)
    }
  }
  return (
    <>
      <div className="d-flex flex-row p-4 m-2">
        <div className="w-75">
          <Image src={img} height={400} width={400} alt={title} />
        </div>
        <div className="p-3">
          <h3 className="text-secondary">{title}</h3>
          <RatingStars rating={rating} />
          <p className={classes.price}>&#8377; {price}</p>

          <h5 className="text-warning">Product Description:</h5>
          <p>{description}</p>
          <button className="btn btn-warning text-white p-2 m-2" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
      <Reviews {...props}/>
    </>
  );
};

export default DetailsPageComponent;
