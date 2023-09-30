import { hashPassword } from "../../../lib/auth";
import { buildPath, extractData } from "../../../lib/file-helpers";
import fs from "fs";
import multer from "multer";
import nextConnect from "next-connect";

const filestorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/users");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
const upload = multer({ storage: filestorageEngine });
const uploadFile = upload.single("userimg");

const handler = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method "${req.method}" Not Allowed` });
  },
});
handler.use(uploadFile);

handler.post(async(req, res) => {

  let { email, password, mobile, address, name } = req.body;
  let userimg = "";
  let img = req?.file?.filename;
  if (!img || img == "") {
    userimg = "/images/users/user.png";
  } else {
    userimg = "/images/users/" + img;
  }
  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        'Invalid input - password should also be at least 7 characters long.',
    });
    return;
  }
  const filePath = buildPath('users.json');
  const usersData = extractData(filePath);
  const existingUser = usersData.find((user) => user.email === email)


  if (existingUser) {
    res.status(422).json({ message: 'User exists already!' });
    return;
  }

  const hashedPassword = await hashPassword(password);
  const id = Date.now().toString(36);

  const newUser = { email, password: hashedPassword,userimg,mobile,address,name, id }

  usersData.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(usersData));

  res.status(201).json({ message: 'Created user!' });
 
});
export default handler;


export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};


