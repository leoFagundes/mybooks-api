import bcrypt from "bcrypt";
import User from "../models/User.js";

async function authenticateUser(username, password) {
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return { success: false, message: "User not found" };
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            return { success: true, user };
        } else {
            return { success: false, message: "Incorrect password" };
        }
    } catch (error) {
        return { success: false, message: "Auth error" };
    }
}

export default authenticateUser;