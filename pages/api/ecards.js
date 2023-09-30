import {buildPath,extractData} from './../../lib/file-helpers';

  
  async function handler(req, res) {
    const filePath = buildPath('eCards.json');
    const data = extractData(filePath);
    res.status(200).json({ cards:data });
}

export default handler;