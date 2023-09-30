import DetailsPageComponent from "../../components/DetailsPageComponent";


const DetailsPage = (props) => {
  return (
      <DetailsPageComponent {...props}/>
  )
}

export const getStaticPaths=async()=>{
    const res=await fetch(`http://localhost:3000/api/ecards`)
    const data=await res.json();
    const ids=data.cards.map((card)=>card.id);
    const params=ids.map((id)=>({params:{id:`${id}`}}))
    return{
        paths:params,
        fallback:false
    }
}

export const getStaticProps=async(ctx)=>{
    const {id}=ctx.params
    const result=await fetch(`http://localhost:3000/api/singlecard/${id}`)
    const data=await result.json();
    return{
        props:{
            ecard:data.card,
            reviews:data.reviews

        }
    }

}

export default DetailsPage