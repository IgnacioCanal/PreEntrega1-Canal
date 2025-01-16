import path from "path";
import morgan from "morgan";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import fs from "fs";


import { __dirname } from "./dirname.js";
import { productsRouter } from "./routes/products.router.js";
import { productsService } from "./services/products.service.js";
import { cartsRouter } from "./routes/carts.router.js";
import { viewsRoutes } from "./routes/views.routes.js";


const app = express();


app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../public")));

app.engine('hbs', handlebars.engine({ extname: '.hbs', defaultLayout: 'main', layoutsDir: path.join(__dirname, 'views', 'layout') }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use("/", viewsRoutes);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Ocurrió un error interno en el servidor" });
});

const server = createServer(app);
export const io = new Server(server);

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  const productos = productsService.getAll();
  console.log("Productos enviados:", productos)
  socket.emit("actualizarProductos", productos);


  socket.on("agregarProducto", (producto) => {
    productsService.addProduct(producto);
    io.emit("actualizarProductos", productsService.getAll());
  });


  socket.on("eliminarProducto", (producto) => {
    productsService.deleteProduct(producto.nombre);
    io.emit("actualizarProductos", productsService.getAll());
  });
});

// Iniciar servidor
server.listen(8080, () => {
  console.log("Server running on port http://localhost:8080");
});