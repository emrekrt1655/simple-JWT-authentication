import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { User } from "../Types/index";

const prisma = new PrismaClient();

const authController = {
  register: async (req: Request, res: Response) => {
    const existingUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (existingUser)
      return res.status(400).json({ message: "This user already exists" });
    const { id, firstName, lastName, position, email, password } = req.body;

    try {
      const user: User = await prisma.user.create({
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
        msg: "Registered Successfully",
        data: user,
      });
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  },

  getUsers: async (req: Request, res: Response) => {
    try {
      const users: User[] = await prisma.user.findMany();
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
      const updateUser: User = await prisma.user.update({
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
      res
        .status(200)
        .json({
          message: `${user?.firstName} ${user?.lastName} deleted successfully!`,
        });
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  },
};

export default authController;
