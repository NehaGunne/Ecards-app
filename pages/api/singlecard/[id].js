import {buildPath,extractData} from '../../../lib/file-helpers';
  
  
  async function handler(req, res) {
    const {id}=req.query;
    const filePath = buildPath('eCards.json');
    const data = extractData(filePath);
    const card=data.find((item)=>item.id==id)
    if(!card){
        res.status(404).json({message:"Card not found"})
    }
    const reviewsPath=buildPath('reviews.json');
    const reviewsData=extractData(reviewsPath);
   const reviews=reviewsData.filter((review)=>review.cardid==id)
    res.status(200).json({ card,reviews});
}

export default handler;