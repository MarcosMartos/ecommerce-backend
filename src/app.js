import express from "express";
import productsRouter from "./router/products.router.js";
import cartsRouter from "./router/carts.router.js";

// Levantar servidor con express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// Escuchar al servidor 8080

app.listen(8080, () => {
  console.log("Escuchando al puerto 8080");
});
