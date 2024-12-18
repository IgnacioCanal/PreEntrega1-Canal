import fs from "fs/promises";
import path from "node:path";
import { v4 as uuid } from "uuid";
import { __dirname } from "../dirname.js";

const cartsFilePath = path.join(__dirname, "data", "carts.json");

export class CartService {
  async createCart() {
    const carts = await this._readCartsFile();

    const newCart = {
      id: uuidv4(),
      products: []
    };

    carts.push(newCart);
    await this._writeCartsFile(carts);

    return newCart;
  }
  async getCartById(cartId) {
    const carts = await this._readCartsFile();
    return carts.find((cart) => cart.id === cartId);
  }

  async addProductToCart(cartId, productId) {
    const carts = await this._readCartsFile();
    const cart = carts.find((cart) => cart.id === cartId);

    if (!cart) {
      throw new Error("Carrito no encontrado");
    }

    const product = cart.products.find((p) => p.productId === productId);
    if (product) {
      product.quantity += 1;
    } else {
      cart.products.push({ productId, quantity: 1 });
    }

    await this._writeCartsFile(carts);
    return cart;
  }

  async _readCartsFile() {
    try {
      const data = await fs.readFile(cartsFilePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async _writeCartsFile(carts) {
    await fs.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));
  }
}
