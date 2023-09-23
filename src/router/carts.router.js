import { Router } from "express";
import { carrito } from "../carts.js";

const router = Router();

// Todos los productos
router.get("/", async (req, res) => {
  try {
    const carts = await carrito.getCarts();

    if (!carts.length) {
      res.status(200).json({ menssage: "No carts found" });
    } else {
      res.status(200).json({ menssage: "Carts found", carts });
    }
  } catch (error) {
    res.status(500).json({ menssage: error });
  }
});

// Crear carrito
router.post("/", async (req, res) => {
  try {
    const newCart = await carrito.addCart();
    res.status(200).json({ menssage: "Cart created", cart: newCart });
  } catch (error) {
    res.status(500).json({ menssage: error });
  }
});

// Carrito por id
router.get("/:idCart", async (req, res) => {
  const { idCart } = req.params;
  try {
    const cart = await carrito.getCartById(+idCart);
    if (!cart) {
      res.status(400).json({ menssage: "Cart not found with the id sent" });
    } else {
      res.status(200).json({ menssage: "Cart found", cart });
    }
  } catch (error) {
    res.status(500).json({ menssage: error });
  }
});

// Agregar producto al carrito
router.post("/:idCart/product/:idProduct", async (req, res) => {
  const { idCart, idProduct } = req.params;
  try {
    const cart = await carrito.addProductToCart(+idCart, +idProduct);

    res.status(200).json({ menssage: "Product added to the Cart" });
  } catch (error) {
    res.status(500).json({ menssage: error });
  }
});

export default router;
