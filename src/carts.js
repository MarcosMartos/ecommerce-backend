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

  // Crear método postCart
  async addCart(products) {
    try {
      // Llamar carritos

      const carts = await this.getCarts();

      if (id) {
        id = products[products.length - 1].id + 1;
      } else {
        id = 1;
      }

      //   if (!products) {
      //     const products =
      //     const newCart = {id, }
      //   } else {
      //     //Cargar nuevo carrito al array

      //     const newCart = { id, ...obj };
      //     products.push(newCart);
      //     await fs.promises.writeFile(this.path, JSON.stringify(products));
      //     return newCart;
      //   }
    } catch (error) {
      return error;
    }
  }
}

//************************************ Primera Entrega ********************************* */

export const carts = new Carts("Carts.json");

// carts.getCarts();
