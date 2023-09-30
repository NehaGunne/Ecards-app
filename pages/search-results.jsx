import { useContext }  from "react";
import GiftCard from "../components/GiftCard";
import { Context } from "../components/Layout";



const SearchResults = () => {
    const context=useContext(Context)
    const {searchedCards}=context

  return (
   <GiftCard cards={searchedCards}/>
  )
}

export default SearchResults