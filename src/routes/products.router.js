import { Router } from "express";
import { productsService } from "../services/products.service.js";
import { io } from "../server.js";
import  Product  from "../models/Products.js";

export const productsRouter = Router();

const validateProductFields = (Product) => {
  const { nombre, descripcion, stock, codigo, categoria, precio, status } =
    Product;

  if (
    !nombre ||
    !descripcion ||
    !codigo ||
    !categoria ||
    precio === undefined ||
    stock === undefined
  ) {
    return {
      valid: false,
      message: "Todos los campos son obligatorios excepto thumbnails",
    };
  }

  if (typeof precio !== "number" || typeof stock !== "number") {
    return { valid: false, message: "Precio y stock deben ser números" };
  }

  if (status !== undefined && typeof status !== "boolean") {
    return { valid: false, message: "Status debe ser un valor booleano" };
  }

  return { valid: true };
};

productsRouter.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const filter = query ? { categoria: query } : {};

    const options = {
      page: parseInt(page), 
      limit: parseInt(limit),
      sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {}, 
    };

    const products = await Product.paginate(filter, options);
    console.log("Productos sin paginar:", products);

    console.log("Filter usado:", filter);
    console.log("Options usadas:", options);
    console.log("Resultado paginación:", products);

    res.status(200).json({
      status: "success",
      payload: products.docs, // Solo los productos
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.hasPrevPage ? `/api/products?page=${products.prevPage}&limit=${limit}&sort=${sort}&query=${query}` : null,
      nextLink: products.hasNextPage ? `/api/products?page=${products.nextPage}&limit=${limit}&sort=${sort}&query=${query}` : null
    });

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
  const validation = validateProductFields(newProduct);

  if (!validation.valid) {
    return res.status(400).json({ error: validation.message });
  }

  try {
    const createdProduct = await productsService.create(newProduct);
    io.emit("nuevo-producto", createdProduct);
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error al crear el producto:", error.message);
    res.status(500).json({ error: "Error al crear el producto" });
  }
});

productsRouter.put("/:productId", async (req, res) => {
  const { productId } = req.params;
  const updatedProduct = req.body;
  const validation = validateProductFields(updatedProduct);

  if (!validation.valid && updatedProduct.productId === undefined) {
    return res.status(400).json({ error: validation.message });
  }

  try {
    const product = await productsService.update(productId, updatedProduct);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error al actualizar el producto:", error.message);
    res.status(500).json({ error: "Error al subir el producto" });
  }
});

productsRouter.delete("/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const productDeleted = await productsService.delete(productId);
    if (!productDeleted) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el producto:", error.message);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});
