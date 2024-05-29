import fs from 'node:fs';
import mongoose from "mongoose";
import { daoCarts } from './index.js';
import { __dirname } from '../utils.js';
import productManager from './ProductManager.js';
import { ticketsModel } from '../dao/mongo/models/tickets.js';
import ticketManager from './TicketManager.js';

class CartManager {

    async createNewCart() {
        let cart = {
            products: []
        };
        let newCart = await daoCarts.create(cart);
        return newCart._id;
    }
    async setProducts(cartId, products) {
        try { (await daoCarts.update(cartId, {products: products})).errors } catch { throw Error("No cart with ID " + cartId); }
    }
    async deleteProduct(cartId, productId) {
        await this._deleteProductWithCart(await this.getCartById(cartId), productId);
        
    }
    async _deleteProductWithCart(cart, productId) {
        let pIndex = cart.products.findIndex((element) => { return element.product._id == productId });
        if (pIndex == -1) throw "No product with ID " + productId + "in the cart " + cartId;
        cart.products.splice(pIndex, 1);
        await this.setProducts(cart._id, cart.products)
    }
    async deleteProducts(cartId) {
        await this.setProducts(cartId, []);
    }
    async setProductQuantity(cartId, productId, quantity) {
        let cart = await this.getCartById(cartId);
        let pIndex = cart.products.findIndex((element) => { return element.product._id == productId });
        if (pIndex == -1) throw "No product with ID " + productId + "in the cart " + cartId;
        cart.products[pIndex].quantity = quantity;
        daoCarts.saveChangesOnObject(cart);
    }
    async addProductToCart(cartId, productId, quantity) {
        quantity = quantity || 1;
        let cart = await this.getCartById(cartId);
        let pIndex = cart.products.findIndex((element) => { return element.product._id == productId });
        let quantity2;
        if (pIndex == -1) {
            quantity2 = quantity;
            let product = {
                product: productId,
                quantity: quantity
            };
            cart.products.push(product)
        } else {
            cart.products[pIndex].quantity += quantity;
            quantity2 = cart.products[pIndex].quantity;
        }
        await daoCarts.saveChangesOnObject(cart);
        return quantity2;
    }
    async deleteCart(cartId) {
        try { (await daoCarts.delete(cartId)).errors } catch { throw new Error("No cart with ID " + cartId); }
    }
    async getQuantityOfProduct(cartId, productId) {
        return this._getQuantityOfProductWithCart(await this.getCartById(cartId), productId);
        
    }
    async _getQuantityOfProductWithCart(cart, productId) {
        let pIndex = cart.products.find((element) => element.product == productId)
        if (pIndex) {
            return pIndex.quantity;
        } else {
            return 0;
        }
    }
    async createTestCarts(array) {
        let id = await this.createNewCart();
        let id2 = await this.createNewCart();
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if (index < 5) {
                await this.addProductToCart(id, element, index)
                continue;
            }
            await this.addProductToCart(id2, element, index)
        }
    }
    async getCartById(cartId) {
        let cart = await daoCarts.getById(cartId);
        if (cart == undefined) {
            throw Error("No cart with ID " + cartId);
        }
        return cart;
    };
    async cartBought(cartId, email){
        let cart = await this.getCartById(cartId);
        let boughtProducts = [];
        let rejectedProducts = [];
        let amount = 0;
        for(let i = 0; i < cart.products.length; i++){
            let p = cart.products[i];
            let pid = p.product._id
            let pAmount = await productManager.getProductStock(pid);
            if(p.quantity > pAmount){
                rejectedProducts.push(pid);
                continue;
            }
            amount += p.product.price * p.quantity;
            let newItem = {product: pid, quantity: p.quantity}
            boughtProducts.push(newItem);
            this._deleteProductWithCart(cart, pid);
            productManager.updateProduct(pid, {stock: pAmount-p.quantity})
        }
        console.log(boughtProducts);
        console.log(rejectedProducts);
        console.log(amount)
        if(boughtProducts.length != 0) ticketManager.generateTicket(boughtProducts, amount, email);
        return rejectedProducts.length == 0? null: rejectedProducts;

    }
    //! ONLY FOR TESTING
    async getCarts(cartId) {
        let cart = await daoCarts.get();
        
        return cart;
    }
}


const cartManager = new CartManager();

export default cartManager;


