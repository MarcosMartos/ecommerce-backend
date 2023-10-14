import express from "express";

import {
  addProductToCartById,
  createCart,
  getProductsOfCartById,
  deleteCart,
  deleteProductFromCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/:cid", getProductsOfCartById);

router.post("/", createCart);

router.post("/:cid/product/:pid", addProductToCartById);

router.delete("/:cid/product/:pid", deleteProductFromCart);

router.delete("/:cid", deleteCart);

export default router;
