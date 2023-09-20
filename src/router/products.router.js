import { Router } from "express";
import { productsManager } from "../productsManager.js";

const router = Router();

// Todos los productos
router.get("/", async (req, res) => {
  try {
    const products = await productsManager.getProducts(req.query);

    if (!products.length) {
      res.status(200).json({ menssage: "No products found" });
    } else {
      res.status(200).json({ menssage: "Products found", products });
    }
  } catch (error) {
    res.status(500).json({ menssage: error });
  }
});

// Productos por id
router.get("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  try {
    const product = await productsManager.getProductById(parseInt(idProduct));
    if (!product) {
      res.status(400).json({ menssage: "Product not found with the id sent" });
    } else {
      res.status(200).json({ menssage: "Product found", product });
    }
  } catch (error) {
    res.status(500).json({ menssage: error });
  }
});

// Agregar producto
router.post("/", async (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;
  if (!title || !description || !price || !thumbnail || !code || !stock) {
    return res.status(400).json({ menssage: "Some data is missing" });
  }
  try {
    const newProduct = await productsManager.addProduct(req.body);
    res.status(200).json({ menssage: "Product created", product: newProduct });
  } catch (error) {
    res.status(500).json({ menssage: error });
  }
});

// Eliminar producto
router.delete("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  try {
    const response = await productsManager.deleteProduct(+idProduct);
    if (response === -1) {
      res.status(400).json({ menssage: "Product not found with the id sent" });
    } else {
      res.status(200).json({ menssage: "Product deleted" });
    }
  } catch (error) {
    res.status(500).json({ menssage: error });
  }
});

// Actualizar producto
router.put("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  try {
    const response = await productsManager.updateProduct(+idProduct, req.body);
    if (response === -1) {
      res.status(400).json({ menssage: "Product not found with the id sent" });
    } else {
      res.status(200).json({ menssage: "Product updated" });
    }
  } catch (error) {
    res.status(500).json({ menssage: error });
  }
});

export default router;
