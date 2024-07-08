import express from "express";
import { deleteUser, getUserById, updateUser } from "../controllers/user.controller.js";
import isAuth from "../middleware/auth.js";

const router = express.Router();

router.get("/:userId", isAuth, getUserById);

router.patch('/:userId', isAuth, updateUser);

router.delete('/:userId', isAuth, deleteUser);

export default router;