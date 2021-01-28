import express from "express";
import {
  authUser,
  registerUser,
  getUsers,
  deleteUser,
  sendEmailVerification,
  sendForgetPasswordEmail,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router.post("/login/email-verification", sendEmailVerification);
router.post("/login/forget-password", sendForgetPasswordEmail);

router.route("/:id").delete(protect, admin, deleteUser);

export default router;
