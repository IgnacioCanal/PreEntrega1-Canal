import path from "path";
import morgan from "morgan";
import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import fs from "fs";

import { __dirname } from "./dirname.js";
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import { viewsRoutes } from "./routes/views.routes.js";


const app = express();


app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../public")));

app.engine('hbs', handlebars({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use("/", viewsRoutes);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.get('/products', (req, res) => {
  fs.readFile(path.join(__dirname, 'products.json'), 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send('Error al cargar productos');
    }
    const products = JSON.parse(data);
    res.render('products', { products });
  });
});

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Ocurrió un error interno en el servidor" });
});

const server = app.listen(8080, () =>
  console.log("Server running on port http://localhost:8080")
);
export const io = new Server(server);

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.emit("init", productos);
});