import express from "express";
import UserController from "../controller/userController.js";

const routes = express.Router();

routes.get("/users", UserController.getUsers);
routes.get("/users/:id", UserController.getUserById);
routes.post("/users", UserController.createUser);
routes.post("/users/login", UserController.loginUser);
routes.put("/users/:id", UserController.updateUser);
routes.delete("/users/:id", UserController.deleteUser);

export default routes;
