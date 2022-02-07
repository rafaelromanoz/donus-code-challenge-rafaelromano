import jwt, { Secret, SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET: Secret = process.env.JWT_SECRET || '';

const JWT_CONFIG: SignOptions | undefined | Buffer = {
  expiresIn: "60d",
  algorithm: "HS256",
};

const generateToken = (data: object) => jwt
  .sign(data , JWT_SECRET, JWT_CONFIG);

const validateToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return;
  }
};

export { generateToken, validateToken };
