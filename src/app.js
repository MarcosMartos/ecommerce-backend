//Imports
import express from "express";
import productRoute from "./routes/productsRoute.js";
import cartRoute from "./routes/cartRoute.js";
import viewsRoute from "./routes/viewsRoute.js";
import { engine } from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import { getAllProductsHandler, messagesHandler } from "./handlers/handlers.js";
import "./config/configDB.js";

//Variables
const app = express();

//Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//Routes
app.use("/api/carts", cartRoute);
app.use("/api/products", productRoute);
app.use("/", viewsRoute);

const httpServer = app.listen(8080, () => {
  console.log(`Escuchando al puerto 8080`);
});

const socketServer = new Server(httpServer);

const onConnection = async (socket) => {
  await getAllProductsHandler(socketServer, socket);
  await messagesHandler(socketServer, socket);
};

socketServer.on("connection", onConnection);
