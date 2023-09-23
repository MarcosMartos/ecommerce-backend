import fs from "fs";

// Crear clase constructora carts

class Carts {
  constructor(path) {
    this.path = path;
  }

  // Mostrar todos los carritos
  async getCarts() {
    // Verificamos si existe contenido en el path
    if (fs.existsSync(this.path)) {
      //  Leemos, parseamos y retornamos
      const info = await fs.promises.readFile(this.path, "utf-8");
      const infoParsed = JSON.parse(info);

      return infoParsed;
    } else {
      // En caso de que no haya nada, retornamos array vacío
      return [];
    }
  }

  // Agregar un carrito
  async addCart() {
    try {
      // Llamar carritos

      const carts = await this.getCarts();

      // Identificador único

      let idCart;

      if (carts.length == 0) {
        idCart = 1;
      } else {
        idCart = carts[carts.length - 1].id + 1;
      }

      // Crear carrito

      const newCart = { id: idCart, products: [] };
      carts.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return newCart;
    } catch (error) {
      return error;
    }
  }

  // Mostrar productos de un carrito por id
  async getCartById(idCart) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((c) => c.id === idCart);
      return cart;
    } catch (error) {
      return error;
    }
  }

  // Agregar un producto a un carrito

  async addProductToCart(idCart, idProduct) {
    try {
      //Buscar todos los carritos
      const carts = await this.getCarts();
      // Buscar al carrito
      const cart = await this.getCartById(idCart);

      // buscamos si existe el producto
      let productIndex = cart.products.findIndex(
        (p) => p.product === idProduct
      );

      // agregamos objeto si no existe, sino sumamos quantity
      if (productIndex === -1) {
        cart.products.push({
          product: idProduct,
          quantity: 1,
        });
      } else {
        cart.products[productIndex].quantity += 1;
      }

      // buscamos carrito a cambiar
      const cartIndex = carts.findIndex((cart) => cart.id === idCart);
      carts[cartIndex] = cart;

      // sobreescribimos carts.json
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
    } catch (error) {
      return error;
    }
  }
}

//************************************ Primera Entrega ********************************* */

export const carrito = new Carts("Carts.json");

// carrito.addCart();
// carrito.getCartById(1);
carrito.addProductToCart(2, 3);
