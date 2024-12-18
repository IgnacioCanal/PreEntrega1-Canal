// productRoutes.js
import { Router} from 'express';
import productsService from '../services/products.service.js';

export const productsRouter = Router();


productsRouter.get('/', async (req, res) => {
    try {
        const products = await productsService.getAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error buscando los productos', error });
    }
});

// GET product by ID
productsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productsService.getById(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar el producto', error });
    }
});

// POST new product
productsRouter.post('/', async (req, res) => {
    const newProduct = req.body;
    try {
        const createdProduct = await productsService.create(newProduct);
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear un producto', error });
    }
});

// PUT (update) product by ID
productsRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body;
    try {
        const product = await productsService.update(id, updatedProduct);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al subir el producto', error });
    }
});

// DELETE product by ID
productsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productsService.delete(id);
        if (product) {
            res.status(200).json({ message: 'Producto eliminado' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error borrando el producto', error });
    }
});

