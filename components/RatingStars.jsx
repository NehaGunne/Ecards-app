import React from 'react'
import EmptyStar from './Icons/EmptyStar';
import Filledstar from './Icons/Filledstar';
import HalfFilledStar from './Icons/HalfFilledStar';
import {v4} from 'uuid'

const RatingStars = (props) => {
    const {rating}=props;
    const ratingValue=Math.floor(rating);
    const strRating=rating.toString()
    const ratingDecimal=parseInt(strRating.split('.')[1]);
  return (
      <div>
           {[...Array(ratingValue)].map((index)=><Filledstar key={v4()} />)}
            {ratingValue<5 ? ratingDecimal>=5?<HalfFilledStar/>:<EmptyStar/>:null}
            {ratingValue<5 && [...Array(5-ratingValue-1)].map((index)=><EmptyStar key={v4()} />)}
      </div>
    
  )
}

export default RatingStars