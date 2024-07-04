import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({error: "User not found."});
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error in getUserById controller: ", error);
        res.status(500).json({ error: "Internal Server Error"});
    }
}

export const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { firstName, lastName, email, phoneNumber, oldPassword, newPassword, confirmNewPassword } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        if (!oldPassword) {
            return res.status(400).json({ error: 'Old password is required for update.' });
        }

        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: 'Old password is incorrect.' });
        }

        // Check if the email is already taken before update and if so return
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            console.log(emailExists);
            if (emailExists) {
                return res.status(400).json({ error: 'Email is already taken.' });
            }
        }

        // Check if the phone number is already taken before update and if so return
        if (phoneNumber && phoneNumber !== user.phoneNumber) {
            const phoneExists = await User.findOne({ phoneNumber });
            if (phoneExists) {
                return res.status(400).json({ error: 'Phone number is already taken.' });
            }
        }

        // Update user fields
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;

        if (newPassword && confirmNewPassword) {
            if (newPassword.length < 6 || confirmNewPassword.length < 6) {
                return res.status(400).json({ error: "Password must be at least 6 symbols." });
            }

            if (newPassword !== confirmNewPassword) {
                return res.status(400).json({ error: "New passwords do not match." });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
        }

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        console.log("Error in updateUser controller: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const deleteUser = async (req, res) => {
    const { userId } = req.params;
    const { password } = req.body;

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found.'});
    }

    if (!password) {
        return res.status(400).json({ error: 'Password is required.'});
    }

    const isPasswordCorrect = await bcrypt.compare(password, user?.password || '');

    if (!isPasswordCorrect) {
        return res.status(400).json({ error: 'Incorrect password'})
    }

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if(!deletedUser) {
            return res.status(404).json({ error: 'User not found.'});
        }

        res.status(200).json({message: 'User deleted successfully.'});
    } catch (error) {
        console.error('Error in deleteUser controller: ', error.message);
        res.status(500).json({ error: "Internal Server Error"});
    }
}