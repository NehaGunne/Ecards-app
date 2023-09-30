import { useRef,useState } from "react";
import moment from "moment";
import RatingStars from '../RatingStars';
import classes from './details.module.css';
import ReactStars from 'react-rating-stars-component';
import { useSession } from "next-auth/client";


const Reviews=(props)=>{
    const {reviews,ecard}=props
  const [session, loading] = useSession();
  const [rating,setRating]=useState(0);
    const comment=useRef('');
    const addReview=async()=>{
        const data={rating,comment:comment.current.value,username:session?.user.username,cardid:ecard.id}
         const result=await fetch('/api/review',{
            method:'POST',
            body:JSON.stringify(data),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const response=await result.json();
        if(response){
            comment.current.value=''
            setRating(0)
            alert(response.message)
        }
    }

    return(
        <div className={`${classes.reviews} d-flex flex-row justify-content-around`}>
            <div className='col-7'>
                <h2>Reviews</h2>
                {reviews?reviews.length>0 ? reviews.map((review)=>{
                    return(
                        <div className={`card ${classes.review_details}`} key={review.id}>
                            <h3>{review.username}</h3>
                            <RatingStars rating={review.rating}/>
                            <p>Reviewed {Math.abs(moment(review.createdAt).diff(this,'hours'))<=24?
                           ` at ${moment(review.createdAt).format('hh:mm')}`:` on ${moment(review.createdAt).format('ll')}`}</p>
                            <p>{review.comment}</p>
        
                        </div>
                        )
                }):<h3>There are no reviews yet!</h3>:<h3>Unable to fetch Reviews!</h3>}
            </div>
            <div className={`col-4 ${classes.review_details}`}>
                <h3>Add a Review</h3>
                <p className='mt-4'>Select rating:</p>
                 <ReactStars size={35} onChange={(value)=>{setRating(value)}}
                isHalf={true}/> 
                <p className='mt-2'>Write your review here:</p>
                <textarea className='form-control' rows={5} ref={comment}/>
                <button className='btn btn-warning m-3'
                onClick={addReview}>Submit</button>

            </div>

        </div>
    )
}

export default Reviews;