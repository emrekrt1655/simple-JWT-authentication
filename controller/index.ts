import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser, IDecodedToken } from "../Types/index";
import {
  genActiveToken,
  genAccessToken,
  genRefreshToken,
} from "../config/generateToken";

const prisma = new PrismaClient();

const token = {
  active: process.env.ACTIVE_TOKEN_SECRET,
  refresh: process.env.REFRESH_TOKEN_SECRET,
};

const authController = {
  register: async (req: Request, res: Response) => {
    const existingUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (existingUser)
      return res.status(400).json({ message: "This user already exists" });

    const password = await bcrypt.hash(req.body.password, 12);

    const { id, firstName, lastName, position, email } = req.body;

    // try {
    //   const user: User = await prisma.user.create({
    //     data: {
    //       id: id,
    //       firstName: firstName,
    //       lastName: lastName,
    //       position: position,
    //       email: email,
    //       password: password,
    //     },
    //   });

    try {
      const user: IUser = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        position: position,
        email: email,
        password: password,
      };

      const activeToken = genActiveToken({ user });

      res.json({
        status: "OK",
        msg: "Please active your account",
        data: user,
        activeToken,
      });
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  },

  activeAccount: async (req:Request, res:Response) => {
    try {
      const {active_token} = req.body
      const decoded = <IDecodedToken>jwt.verify(active_token, `${token.active}`)
      const {user} = decoded

      if(!user) return res.status(400).json({msg: 'Invalid token'})

      await prisma.user.create({
        data:{
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          position: user.position,
          email: user.email,
          password: user.password
        }
      })
      res.status(200).json({message: "Account has been activated"})

    } catch (err: any) {
      res.status(500).json({message: err.message})
    }
  }, 

  login: async (req:Request, res: Response) => {
    try {
    const {email, password} = req.body

    const user = await prisma.user.findUnique({where: {email: req.body.email}})
    if (!user) return res.status(400).json({msg: "This account does not exists"})

    // if the user exists

    loginUser(user, password, res)
    }catch (error: any) {
      return res.status(500).json({msg:error.message})
    }

  },

  logout: async( req: Request, res: Response) => {
    try { 
      res.clearCookie("refreshtoken", {path: "/api/refresh_token"})
      return res.status(200).json({message:"Logged Out!"})
    } catch (err: any) {
      return res.status(500).json({message:err.message})
    }
  },

  refreshToken: async(req: Request, res: Response) => {
    try {
      const rf_token = req.cookies.refreshToken
      if(!rf_token) return res.status(400).json({mesage: "Please Login now!"})
      const decoded = <IDecodedToken>jwt.verify(rf_token, `${token.refresh}`)
      if(!decoded.id) return res.status(400).json({mesage: "Please Login now!"})

      const user = await prisma.user.findUnique(
        {
          where: {id: decoded.id},
         // select: {password: false}
        }
        )
      if(!user) return res.status(404).json({mesage: "This account does not exist."})

      const access_token = genAccessToken({id: user.id})

      res.json({access_token})
        

    } catch (error) {
      
    }
  },

  getUsers: async (req: Request, res: Response) => {
    try {
      const users: IUser[] = await prisma.user.findMany();
      res.json({
        status: "OK",
        msg: "Users",
        data: users,
      });
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  },

  updateUser: async (req: Request, res: Response) => {
    const { id, firstName, lastName, position, email, password } = req.body;

    try {
      const updateUser: IUser = await prisma.user.update({
        where: { id: req.params.id },
        data: {
          id: id,
          firstName: firstName,
          lastName: lastName,
          position: position,
          email: email,
          password: password,
        },
      });

      res.json({
        status: "OK",
        msg: "Updated Successfully",
        data: updateUser,
      });
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const user = await prisma.user.delete({
        where: { id: req.params.id },
      });
      res.status(200).json({
        message: `${user?.firstName} ${user?.lastName} deleted successfully!`,
      });
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  },
};

const loginUser = async(user:IUser, password: string, res: Response)=> {
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({message: "Password is incorrect"});

  const access_token =genAccessToken({id: user.id})
  const refresh_token = genRefreshToken({id: user.id})

  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    path: "/api/refresh_token",
    maxAge: 30*24*60*1000 //30 days
  })

  res.json({
    message: "Login successful",
    access_token,
    user: {...user, password: ""}
  })

}

export default authController;
