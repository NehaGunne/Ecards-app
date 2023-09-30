import fs from 'fs';
import {buildPath,extractData} from './../../lib/file-helpers';


async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const data = req.body;
  if(!data.username){
      data.username='Anonymous'
  }

  const id=Date.now().toString(36);


  const filePath = buildPath('reviews.json');
  const reviewsData = extractData(filePath);
  const createdAt=Date.now()

  const newReview = { ...data, id,createdAt }

  reviewsData.push(newReview);
  fs.writeFileSync(filePath, JSON.stringify(reviewsData));
  console.log('api',reviewsData)


  res.status(201).json({ message: 'Review sent!' });
}

export default handler;