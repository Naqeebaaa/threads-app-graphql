import { createHmac, randomBytes } from 'node:crypto'
import JWT from 'jsonwebtoken'
import  { prisma }  from "../lib/db";

const JWT_SECRET ='$uperM@n@123'

export interface CreateUserPayload{
      firstName: string;
      lastName: string;
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
    public static createUser(payload: CreateUserPayload) {
      const {firstName, lastName, email, password} = payload;

      const salt =randomBytes(32).toString("hex");
      const hashedPassword = UserService.generateHash(salt, password);
  return prisma.user.create({
  data: {
    firstName,
    lastName,
    email,
    salt,
    password: hashedPassword,
  }, 
  });
    }
    private static getUserByEmail(email: string) {
      return prisma.user.findUnique({ where : { email} })
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
        JWT_SECRET
      );
      return token;
    } 
    //decode service for token
    public static decodeJWTToken(token: string) {
      return JWT.verify(token, JWT_SECRET);
    }
    }


export default UserService;