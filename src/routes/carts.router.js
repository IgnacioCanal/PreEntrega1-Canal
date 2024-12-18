import { Router } from "express";
import { CartService } from "../services/carts.service.js";

export const cartsRouter = Router();

const cartService = new CartService();

cartsRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartService.getCartById(cid);
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
});

cartsRouter.post("/", async (req, res) => {
  try {
    const newCart = await cartService.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el carrito" });
  }
});

