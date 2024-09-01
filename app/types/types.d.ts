import NextAuth from "next-auth";
import  types from "@/"
declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      name?: string; // Optional, add other properties if needed
      image?: string; // Optional, add other properties if needed
    };
  }
}
 