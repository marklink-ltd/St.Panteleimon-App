import express from "express";
import { deleteUser, getUserById, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/:userId", getUserById);

router.patch('/:userId', updateUser);

router.delete('/:userId', deleteUser);

export default router;