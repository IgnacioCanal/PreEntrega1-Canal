import { Router } from "express";
import { productsService } from "../services/products.service.js";

export const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  try {
    const products = await productsService.getAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener los productos:", error.message);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

productsRouter.get("/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await productsService.getById(productId);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error al obtener el producto:", error.message);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});

productsRouter.post("/", async (req, res) => {
  const newProduct = req.body;
  try {
    const createdProduct = await productsService.create(newProduct);
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error al crear el producto:", error.message);
    res.status(500).json({ error: "Error al crear el producto" });
  }
});


productsRouter.put("/:productId", async (req, res) => {
  const { productId } = req.params;
  const updatedProduct = req.body;
  try {
    const product = await productsService.update(productId, updatedProduct);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error al actualizar el producto:', error.message);
    res.status(500).json({ error: "Error al subir el producto"});
  }
});

productsRouter.delete("/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const productDeleted = await productsService.delete(productId);
    if (!productDeleted) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error.message);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});
