import { Router } from "express";
import { productsService } from "../services/products.service.js";

export const viewsRoutes = Router();

viewsRoutes.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const products = await productsService.getAll(page, limit);

    res.render("home", { products });
  } catch (error) {
    console.error("Error al obtener los productos:", error.message);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

viewsRoutes.get("/realtimeproducts", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const products = await productsService.getAll(page, limit);

    res.render("realTimeProducts", { products });
  } catch (error) {
    console.error("Error al obtener los productos:", error.message);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

viewsRoutes.get("/cart", (req, res) => {
 
  const cart = [
    { product: { nombre: "Martillo", precio: 200 }, quantity: 1 },
    { product: { nombre: "Serrucho", precio: 150 }, quantity: 2 },
  ];


  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);


  res.render("cart", {
    cartCount, 
    products: cart,
  });
});