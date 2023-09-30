import SingleGiftCard from "./SingleGiftCard";

const GiftCard = (props) => {
  const { cards } = props;
  if (cards.length == 0) {
    return (
     
        <div className="card alert alert-info text-center m-5">
          <strong>Info!</strong> There are no Cards to display!.
        </div>
   
    );
  }
  return (
    <div className="d-flex flex-row justify-content-center flex-wrap p-2">
      {cards.map((card) => (
        <SingleGiftCard {...card} key={card.id} />
      ))}
    </div>
  );
};

export default GiftCard;
