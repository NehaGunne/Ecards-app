import {buildPath,extractData} from './../../lib/file-helpers';
import fs from 'fs';

  
async function handler(req, res) {
    const filePath = buildPath('cart.json');
    const data = extractData(filePath);
    if(req.method=='POST'){
        const item=req.body;
         if(!item.userid){
            res.status(400).json({message:"Please Log in to add items to cart"})
            return;
        }  
        const newItem={...item,cartid:Date.now().toString(36)}
        data.push(newItem);
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.status(200).json({cart: data})

    }
    else if(req.method=='DELETE'){
        const {userid,cartid}=req.query;
        console.log(userid);
        let newCart=[]
        if(userid && cartid){
             newCart=data.filter((item)=>!(item.userid==userid && item.cartid==cartid))
        }
        if(userid && !cartid){
             newCart=data.filter((item)=>item.userid!=userid)

        }

         fs.writeFileSync(filePath, JSON.stringify(newCart)); 

        res.status(200).json({cart:newCart,message:'Removed from cart'})

    }
    else{

        const userid=req.query?.userid;
        const cart=data.filter((item)=>item.userid==userid)
        res.status(200).json({ cart});
    }
}

export default handler;