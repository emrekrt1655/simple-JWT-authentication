import express, { Request, Response } from "express";
import authController from "../controller/index";

const router = express.Router();
//import {} from "..controller/index";

router.get("/", function (req: Request, res: Response) {
  res.send("Get request from homepage");
});

router.post("/register", authController.register);
router.get("/users", authController.getUsers);
router.put("/edit/:id", authController.updateUser);
router.get("/delete/:id", authController.deleteUser);

export default router;
