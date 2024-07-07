import express from "express";
import users from "./userRouter.js";

const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("MyBooks API"));

  app.use(express.json(), users);
};

export default routes;
