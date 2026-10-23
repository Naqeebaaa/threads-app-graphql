import { createHmac, randomBytes } from 'node:crypto'
import JWT from 'jsonwebtoken'
import  { prisma }  from "../lib/db";
import { Prisma } from "../generated/prisma/client";

const JWT_SECRET: string = process.env.JWT_SECRET ?? "";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing from environment variables");
}


export interface CreateUserPayload{
      firstName: string;
      lastName: string;
      username: string;
      email: string;
      password: string;
}
export interface GetUserTokenPayload{
  email: string;
  password : string;
}

class UserService {

     public static generateHash(salt: string, password: string){
           const hashedPassword = createHmac('sha256', salt)
           .update(password)
           .digest('hex');
           return hashedPassword;

     }

    public static getUserById(id: string) {
      return prisma.user.findUnique({ where: { id }});
    }
    public static async  createUser(payload: CreateUserPayload) {
      const {firstName, lastName, username, email, password} = payload;

      const salt =randomBytes(32).toString("hex");
      const hashedPassword = UserService.generateHash(salt, password);
      try{
  return await prisma.user.create({
  data: {
    firstName,
    lastName,
    username,
    email,
    salt,
    password: hashedPassword,
  }, 
  });
    } catch (error){
   if (
  typeof error === "object" &&
  error !== null &&
  "code" in error &&
  error.code === "P2002"
)  {
      throw new Error("Email or username is already taken.");
      }
      throw error;
    }
  }
   private static async getUserByEmail(email: string) {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error("getUserByEmail Prisma error:", error);
    throw error;
  }
}
    //incode service for token
    public static async getUserToken(payload: GetUserTokenPayload) {
      const { email, password } = payload;
      const user = await UserService.getUserByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }

      //agar user mil gaya to salt liya db se
     const userSalt = user.salt;
     const userHashPassword =UserService.generateHash(userSalt, password);

     if(userHashPassword !== user.password)
      throw new Error("Invalid password");

      //else generate token and return
      const token = JWT.sign(
        { id: user?.id, email: user.email }, 
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      return token;
    } 
    //decode service for token
    public static decodeJWTToken(token: string) {
      return JWT.verify(token, JWT_SECRET);
    }

    }


export default UserService;