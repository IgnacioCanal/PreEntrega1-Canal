import path from "path";
import morgan from "morgan";
import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";

import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Ocurrió un error interno en el servidor" });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📌 Endpoints:
    - Productos: http://localhost:${PORT}/api/products
    - Carritos: http://localhost:${PORT}/api/carts`);
});
