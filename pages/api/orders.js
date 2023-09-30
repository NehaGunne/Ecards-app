import {buildPath,extractData} from './../../lib/file-helpers';
import fs from 'fs';
  
  async function handler(req, res) {
    const filePath = buildPath('orders.json');
    const data = extractData(filePath);
    if(req.method=='POST'){
      const item=req.body;
     /*  if(!item.userid){
          res.status(400).json({message:"Please Log in"})
      }  */
      const newItem={...item,orderid:Date.now().toString(36)}
      data.push(newItem);
      fs.writeFileSync(filePath, JSON.stringify(data));
      res.status(200).json({orders: data})

  }else{
    const {userid}=req.query;
    const orders=data.filter((item)=>item.userid==userid)

    res.status(200).json({  orders});

  }
}

export default handler;