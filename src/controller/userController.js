import user from "../models/User.js";
import authenticateUser from "../services/authenticationService.js";

class UserController {
  static async getUsers(req, res) {
    try {
      const getUsers = await user.find({});
      res.status(200).json(getUsers);
    } catch (error) {
      res.status(500).json({ message: `${error} - failed to fetch users.` });
    }
  }

  static async getUserById(req, res) {
    try {
      const id = req.params.id;
      const userFound = await user.findById(id);
      res.status(200).json(userFound);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error} - failed to fetch user by id.` });
    }
  }

  static async createUser(req, res) {
    try {
      const newUser = await user.create(req.body);
      res.status(201).json({
        message: "User created successfully",
        user: newUser,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error} - failed to create a new user.` });
    }
  }

  static async updateUser(req, res) {
    try {
      const id = req.params.id;
      await user.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "User updated successfully." });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - failed to update user.` });
    }
  }

  static async deleteUser(req, res) {
    try {
      const id = req.params.id;
      await user.findByIdAndDelete(id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - failed to delete user.` });
    }
  }

  static async loginUser(req, res) {
    const { username, password } = req.body;

    const authenticationResult = await authenticateUser(username, password);

    if (authenticationResult.success) {
      res.status(200).json({
        message: `Login successfully. Welcome ${username}!`,
        user: authenticationResult.user,
      });
    } else {
      res.status(401).json({
        message: "Authentication failed",
        error: authenticationResult.message,
      });
    }
  }
}

export default UserController;
