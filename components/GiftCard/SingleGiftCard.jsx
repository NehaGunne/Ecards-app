import Image from "next/image";
import Link from "next/link";
import RatingStars from "../RatingStars";
import classes from "./giftcard.module.css";

const SingleGiftCard = (props) => {
  const { img, title, rating, range, price, id } = props;
  return (
    <Link href={`/ecard-details/${id}`}>
      <div className={`card p-3 m-2 ${classes.ecard} `}>
        <Image src={img} width={250} height={150} alt={title+'img'} />
        <h2 className="h4">{title}</h2>
        <RatingStars rating={rating} />
        {range ? (
          <p>
            &#8377; {range[0]} - &#8377; {range[1]}{" "}
          </p>
        ) : (
          <p>&#8377; {price}</p>
        )}
      </div>
    </Link>
  );
};

export default SingleGiftCard;
