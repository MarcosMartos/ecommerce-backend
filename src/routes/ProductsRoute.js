import express from "express";

import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../controllers/productsController.js";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:pid", getProductById);

router.post("/", addProduct);

router.put("/:pid", updateProductById);

router.delete("/:pid", deleteProductById);

export default router;
