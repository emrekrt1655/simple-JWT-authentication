import express, { Request, Response } from "express";
import authController from "../controller/index";
import validRegister from "../middleware/valid";


const router = express.Router();
//import {} from "..controller/index";

router.get("/", function (req: Request, res: Response) {
  res.send("Get request from homepage");
});

router.post("/register", validRegister, authController.register);
router.post("/active", authController.activeAccount)
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/refresh_token", authController.refreshToken);
router.get("/users", authController.getUsers);
router.put("/edit/:id", authController.updateUser);
router.get("/delete/:id", authController.deleteUser);

export default router;
