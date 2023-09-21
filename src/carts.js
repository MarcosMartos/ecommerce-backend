import fs from "fs";

// Crear clase constructora carts

class Carts {
  constructor(path) {
    this.path = path;
  }

  // Traer json de Cart
  async getCarts() {
    // Verificamos si existe contenido en el path
    if (fs.existsSync(this.path)) {
      //  Leemos, parseamos y retornamos
      const info = await fs.promises.readFile(this.path, "utf-8");
      const infoParsed = JSON.parse(info);
      console.log(infoParsed);

      return infoParsed;
    } else {
      // En caso de que no haya nada, retornamos array vacío
      return [];
    }
  }

  // Crear método addCart
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
}

//************************************ Primera Entrega ********************************* */

export const carts = new Carts("Carts.json");

carts.addCart();
