import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const BUCKET = process.env.S3_BUCKET;
const RECORDINGS_DIR = process.env.RECORDINGS_DIR;

const s3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESSKEY,
    secretAccessKey: process.env.S3_SECRETKEY,
  },
});

export default async function handler(_req, res) {
  const filename = `${RECORDINGS_DIR}/recording-${Date.now().toString()}.webm`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: filename,
    })
  );

  const signedPutUrl = await getSignedUrl(
    s3Client,
    new PutObjectCommand({ Bucket: BUCKET, Key: filename })
  );

  const signedGetUrl = await getSignedUrl(
    s3Client,
    new GetObjectCommand({ Bucket: BUCKET, Key: filename })
  );

  res.status(200).json({ url: signedGetUrl, uploadUrl: signedPutUrl });
}
