import { Router } from "express";
import { products } from "./products.router.js";


export const viewsRoutes = Router();

viewsRoutes.get("/", (req, res) => {
  res.render("home", { products });
});

viewsRoutes.get("/products", (req, res) => {
  res.render("products");
});