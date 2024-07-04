import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    }
});

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "User with that email does not exist." });
        }

        const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        user.resetToken = resetToken;
        await user.save();

        const mailOptions = {
            to: user.email,
            from: `'HOTEL ST.PANTELEIMON' <${process.env.EMAIL}>`,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account. \n\n` +
                  `Please click on the following link to complete the process within one hour of receiving it: \n\n` +
                  `http://${req.headers.host}/reset-password/${resetToken}\n\n` +
                  `If you did not request this, please ignore this email and your password will remain unchanged.`
        };

        res.status(200).json({ message: `An email has been sent to ${user.email} with further instructions.`, emailContent: mailOptions.text });
    } catch (error) {
        console.log("Error in forgotPassword controller: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password has been updated', user });
    } catch (err) {
        if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        console.log('Error in forgotPassword resetPassword controller: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
