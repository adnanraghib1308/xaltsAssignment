import { User } from "@prisma/client";
import { getAllUsers } from "../../dao/user";
import { reqWrapper } from "../../helpers/utils";

const router = require("express").Router();
// const multer = require("multer");
// const { S3Client } = require("@aws-sdk/client-s3");
// const multerS3 = require("multer-s3");

// const s3 = new S3Client({
//   credentials: {
//     accessKeyId: AWS_KEYS.accessKey, // store it in .env file to keep it safe
//     secretAccessKey: AWS_KEYS.secret,
//   },
//   region: "ap-south-1", // this is the region that you select in AWS account
// });

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });


// const upload2 = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'suprmommydaddy',
//     key: function (req: any, file: any, cb: any) {
//       cb(null, 'images/' + Date.now() + '-' + file.originalname);
//     }
//   })
// });

const getUserList = reqWrapper(async (req, res) => {
  let users:any = await getAllUsers();
  users = users.map((user: User) => ({email: user.email, name: user.name, id: user.id }));
  return res.sendResponse({ data: users });
});

router.get('/list', getUserList);

export = router;
