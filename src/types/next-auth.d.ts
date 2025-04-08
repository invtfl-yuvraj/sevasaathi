import "next-auth";
import { DefaultSession } from "next-auth";


declare module "next-auth" {
  interface User {
    id?: string;
    email?: string;
    username?: string;
    isVerified?: boolean;
    accessToken?: string;
  }
  
  interface Session {
    user: {
      id?: string;
      email?: string;
      username?: string;
      isVerified?: boolean;
      accessToken?: string;
    } & DefaultSession["user"];
  }
  
  interface JWT {
    id?: string;
    email?: string;
    username?: string;
    isVerified?: boolean;
    accessToken?: string;
  }
}