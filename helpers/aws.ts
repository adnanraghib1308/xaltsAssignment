import { AWS_KEYS } from "../config/firestore";
const { S3Client } = require("@aws-sdk/client-s3");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: AWS_KEYS.accessKey,
  secretAccessKey: AWS_KEYS.secret,
});

const getS3FilePath = (rootFolderName: string, fileName: string) => {
  return `${rootFolderName}/${fileName}`;
};

export const uploadFileWithBuffer = async (buffer: any, bucket: string, fileName: string, rootFolderName: string) => {
  const upload = await s3.upload({
    Body: buffer,
    Bucket: bucket,
    ContentType: "application/pdf",
    Key: `${getS3FilePath(rootFolderName, fileName)}`,
  });
  const { Location } = await upload.promise();
  return Location;
};
