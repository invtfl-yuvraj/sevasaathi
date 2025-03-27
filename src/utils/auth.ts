import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRECT_KEY = process.env.JWT_SECRET || "bharti-1234-secret-key";

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, SECRECT_KEY, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRECT_KEY);
};

export const generateVerifyCode = () => {
  return Math.floor(100000 + (Math.random()*900000)).toString();
}




