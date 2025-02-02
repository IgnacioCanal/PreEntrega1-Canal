import { Router } from "express";
import { CartService } from "../services/carts.service.js";
import { productsService } from "../services/products.service.js";

export const cartsRouter = Router();
const cartService = new CartService();

const validateCartProduct = async (productId) => {
  const product = await productsService.getById(productId);
  return product !== null;
};

cartsRouter.get("/", async (req, res) => {
  try {
    const carts = await cartService.getAllCarts();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los carritos" });
  }
});

cartsRouter.get("/:cartId", async (req, res) => {
  const { cartId } = req.params;
  try {
    const cart = await cartService.getCartById(cartId);
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

cartsRouter.post("/:cartId/products/:productId", async (req, res) => {
  const { cartId, productId } = req.params;

  if (!(await validateCartProduct(productId))) {
    return res.status(400).json({ error: "Producto no encontrado" });
  }

  try {
    const updatedCart = await cartService.addProductToCart(cartId, productId);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

cartsRouter.put("/:cartId", async (req, res) => {
  const { cartId } = req.params;
  const { products } = req.body;
  try {
      const updatedCart = await cartService.updateCart(cartId, products);
      res.json(updatedCart);
  } catch (error) {
      res.status(500).json({ error: "Error al actualizar el carrito" });
  }
});

cartsRouter.put("/:cartId/products/:productId", async (req, res) => {
  const { cartId, productId } = req.params;
  const { quantity } = req.body;
  try {
      const cart = await cartService.getCartById(cartId);
      const productInCart = cart.products.find(p => p.product.equals(productId));
      if (productInCart) {
          productInCart.quantity = quantity;
          const updatedCart = await cart.save();
          res.json(updatedCart);
      } else {
          res.status(404).json({ error: "Producto no encontrado en el carrito" });
      }
  } catch (error) {
      res.status(500).json({ error: "Error al actualizar la cantidad del producto" });
  }
});

cartsRouter.delete("/:cartId/products/:productId", async (req, res) => {
  const { cartId, productId } = req.params;
  try {
    const updatedCart = await cartService.removeProductFromCart(
      cartId,
      productId
    );
    res.json(updatedCart);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar el producto del carrito" });
  }
});

cartsRouter.delete("/:cartId", async (req, res) => {
  const { cartId } = req.params;
  try {
      const deletedCart = await cartService.deleteCart(cartId);
      res.json(deletedCart);
  } catch (error) {
      res.status(500).json({ error: "Error al eliminar el carrito" });
  }
});