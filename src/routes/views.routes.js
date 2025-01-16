import { Router } from "express";


export const viewsRoutes = Router();

viewsRoutes.get("/", (req, res) => {
  res.render("home", { productos });
});

viewsRoutes.get("/products", (req, res) => {
  res.render("productos");
});