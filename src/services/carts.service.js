import Cart from '../models/Carts.js';
import Product from '../models/Products.js';

export class CartService {
    async createCart() {
        const newCart = new Cart({ products: [] });
        return await newCart.save();
    }

    async getCartById(cartId) {
        return await Cart.findById(cartId).populate('products.product');
    }

    async getAllCarts() {
        return await Cart.find().populate('products.product');
    }

    async addProductToCart(cartId, productId) {
        const cart = await Cart.findById(cartId);
        const product = await Product.findById(productId);

        if (!cart || !product) {
            throw new Error('Carrito o producto no encontrado');
        }

        const productInCart = cart.products.find(p => p.product.equals(productId));
        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        return await cart.save();
    }

    async removeProductFromCart(cartId, productId) {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        cart.products = cart.products.filter(p => !p.product.equals(productId));
        return await cart.save();
    }

    async updateCart(cartId, products) {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        cart.products = products;
        return await cart.save();
    }

    async deleteCart(cartId) {
        return await Cart.findByIdAndDelete(cartId);
    }
}

export const cartService = new CartService();