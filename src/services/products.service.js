import Product from '../models/Products.js';

export class ProductsService {
    async getAll() {
        return await Product.find();
    }

    async getById(productId) {
        return await Product.findById(productId);
    }

    async create(productData) {
        const product = new Product(productData);
        return await product.save();
    }

    async update(productId, productData) {
        return await Product.findByIdAndUpdate(productId, productData, { new: true });
    }

    async delete(productId) {
        return await Product.findByIdAndDelete(productId);
    }
}

export const productsService = new ProductsService();