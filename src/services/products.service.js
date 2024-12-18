import fs from "node:fs";
import path from 'node:path';
import { v4 as uuid } from "uuid";
import { __dirname } from "../dirname.js";

const productsFilePath = path.join(__dirname, 'products.json');

class ProductsService {
  path;
  products;

  /**
   *
   * @param { path } path - Path del archivo donde se guardan los productos
   */
  constructor({ path }) {
    this.path = path;

    if (fs.existsSync(path)) {
      try {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      } catch (error) {
        this.products = [];
      }
    } else {
      this.products = [];
    }
  }

  /**
   *
   * @returns { Promise<Array> } - Devuelve todos los productos
   */
  async getAll() {
    return this.products;
  }

  /**
   *
   * @param { id } id - Id del posteo a buscar
   *
   * @returns { Object } - Devuelve el producto con el id pasado por parámetro
   */
  async getById({ id }) {
    const product = this.products.find((product) => product.id === id);
    return product;
  }

  async create({ nombre, descripcion, stock, codigo, categoria, precio, thumbnails }) {
    const id = uuid();

    const product = {
      id,
      nombre,
      descripcion,
      stock,
      codigo,
      categoria,
      precio,
      thumbnails,
    };
    this.products.push(post);

    try {
      await this.saveOnFile();

      return product;
    } catch (error) {
      console.log(error);

      console.error("Error al guardar el archivo");
    }
  }

  async update({ nombre, descripcion, stock, codigo, categoria, precio, thumbnails }, id) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      return null;
    }

    product.nombre = nombre ?? product.nombre;
    product.descripcion = descripcion ?? product.descripcion;
    product.stock = stock ?? product.stock;
    product.codigo = codigo ?? product.codigo;
    product.categoria = categoria ?? product.categoria;
    product.precio = precio ?? product.precio;
    product.thumbnails = thumbnails ?? product.thumbnails;

    const index = this.products.findIndex((product) => product.id === id);

    this.products[index] = product;

    try {
      await this.saveOnFile();

      return product;
    } catch (error) {
      console.error("Error al actualizar el archivo");
    }
  }


  async delete({ id }) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      return null;
    }

    const index = this.products.findIndex((product) => product.id === id);

    this.products.splice(index, 1);

    try {
      await this.saveOnFile();

      return product;
    } catch (error) {
      console.error("Error al eliminar el archivo");
    }
  }
  async saveOnFile() {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2)
      );
    } catch (error) {
      console.log(error);

      console.error("Error al guardar el archivo");
    }
  }
}

export const productsService = new ProductsService({
  path: "./src/db/products.json",
});