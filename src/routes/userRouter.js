import express from "express";
import UserController from "../controller/userController.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const routes = express.Router();

routes.get("/users", UserController.getUsers);
routes.get("/users/:id", UserController.getUserById);
routes.post("/users", UserController.createUser);
routes.post("/users/pdf", upload.single("pdf"), UserController.createPdfLink);
routes.post("/users/deletePdf", UserController.deletePdf);
routes.put("/users/:id", UserController.updateUser);
routes.delete("/users/:id", UserController.deleteUser);

export default routes;
