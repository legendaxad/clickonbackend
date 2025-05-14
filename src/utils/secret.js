import dotenv from "dotenv";
dotenv.config();

export const MONGODB_URL = process.env.MONGODB_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const S3URL = process.env.S3URL;
export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
export const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY;
export const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY;
export const S3_REGION = process.env.S3_REGION;
