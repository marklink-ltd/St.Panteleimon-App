import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    });

    res.cookie("jwt", token,{
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        httpOnly: true, // Helps mitigate XSS attacks
        sameSite: "strict", // Helps mitigate CSRF attacks
        secure: process.env.NODE_ENV !== 'development' || 'test' // Ensures cookie is only sent over HTTPS in production
    });
}

export default generateTokenAndSetCookie;
