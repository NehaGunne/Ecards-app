import fs from 'fs';
import path from 'path';
export function buildPath(fileName) {
    return path.join(process.cwd(), 'mock-data', fileName);
  }
  
export function extractData(filePath) {
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    return data;
  }