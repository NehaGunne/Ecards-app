import {buildPath,extractData} from './../../lib/file-helpers';
  
  
  async function handler(req, res) {
      const str=req.query.q
      const searchText=str.toLowerCase();
      console.log(searchText)
    const filePath = buildPath('eCards.json');
    const data = extractData(filePath);
    const cards=data.filter((item)=>{
        const title=item.title.toLowerCase();
       const description=item.description.toLowerCase();
       if(title.includes(searchText) || description.includes(searchText)){
           return true
       }
        
    })
    res.status(200).json({searchedCards:cards})
}

export default handler;