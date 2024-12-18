import fs from "node:fs";
import { v4 as uuid } from "uuid";

class PostService {
  path;
  posts;

  /**
   *
   * @param { path } path - Path del archivo donde se guardan los posteos
   */
  constructor({ path }) {
    this.path = path;

    if (fs.existsSync(path)) {
      try {
        this.posts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      } catch (error) {
        this.posts = [];
      }
    } else {
      this.posts = [];
    }
  }

  /**
   *
   * @returns { Promise<Array> } - Devuelve todos los post
   */
  async getAll() {
    return this.posts;
  }

  /**
   *
   * @param { id } id - Id del posteo a buscar
   *
   * @returns { Object } - Devuelve el posteo con el id pasado por parámetro
   */
  async getById({ id }) {
    const post = this.posts.find((post) => post.id === id);
    return post;
  }

  async create({ title, content, description }) {
    const id = uuid();

    const post = {
      id,
      title,
      content,
      description,
    };
    this.posts.push(post);

    try {
      await this.saveOnFile();

      return post;
    } catch (error) {
      console.log(error);

      console.error("Error al guardar el archivo");
    }
  }

  async update({ id, title, content, description }) {
    const post = this.posts.find((post) => post.id === id);

    if (!post) {
      return null;
    }

    post.title = title ?? post.title;
    post.content = content ?? post.content;
    post.description = description ?? post.description;

    const index = this.posts.findIndex((post) => post.id === id);

    this.posts[index] = post;

    try {
      await this.saveOnFile();

      return post;
    } catch (error) {
      console.error("Error al actualizar el archivo");
    }
  }


  async delete({ id }) {
    const post = this.posts.find((post) => post.id === id);

    if (!post) {
      return null;
    }

    const index = this.posts.findIndex((post) => post.id === id);

    this.posts.splice(index, 1);

    try {
      await this.saveOnFile();

      return post;
    } catch (error) {
      console.error("Error al eliminar el archivo");
    }
  }
  async saveOnFile() {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.posts, null, 2)
      );
    } catch (error) {
      console.log(error);

      console.error("Error al guardar el archivo");
    }
  }
}

export const postService = new PostService({
  path: "./src/db/posts.json",
});