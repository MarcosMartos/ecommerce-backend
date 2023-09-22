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
      return cart.products;
    } catch (error) {
      return error;
    }
  }

  // Agregar un producto a un carrito

  // async addProductToCart(idCart, idProduct) {
  //   try {
  //     // Buscar al carrito
  //     const cart = this.getCartById(idCart);
  //     // Crear producto

  //     // CADA CARRITO TIENE PRODUCTOS INDIVIDUALES

  //     // const isExist = cart.product.find((p)=>p.id === idProduct);
  //     // if(isExist){
  //     //   const newProduct = {
  //     //     product: {...cart.product};
  //     //     qu
  //     //   }
  //     // }

  //     const newProduct = {
  //       product: {idProduct, ...cart.product};
  //       quantity:
  //     }
  //   } catch (error) {
  //     return error;
  //   }
  // }

  // async addProductToCart(idCart, producto) {
  //   const {product, quantity} = product;
  //  try {
  //   const cart = await this.getCartById(idCart);
  //   if (!cart) {
  //     return -1;
  //   }else{
  //     cart.products = {}
  //   }
  // }
  //  } catch (error) {
  //   return error;
  //  }
}

//************************************ Primera Entrega ********************************* */

export const carrito = new Carts("Carts.json");

// carrito.addProductToCart();
