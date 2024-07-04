import express from 'express';
import { forgotPassword, resetPassword } from '../controllers/resetPassword.controller.js';

const router = express.Router();

router.post('/', forgotPassword);
router.post('/:token', resetPassword);

export default router;
