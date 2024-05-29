import { __dirname } from "../utils.js";
import cartManager from "../Repositories/CartManager.js";

class CartController{
    async getCart(req, res){
        let id = req.params.cid;
        try{
            let cart = await cartManager.getCartById(id);
            res.status(200).send({status: "success", payload: cart});
        } catch (error) {
            res.status(400).send({status: "error", error: error.toString()});
        }
    }
    async createCart(req, res){
        try {
            let id = await cartManager.createNewCart();
            res.status(200).send({status: "success", payload: {id: id}});
        } catch (error) {
            res.status(400).send({status: "error", error: error.toString()});
        }
    }
    async addProduct(req, res){
        let cid = req.params.cid;
        let pid = req.params.pid;
        let qMany = req.body.quantity;
        try {
            let quantity = await cartManager.addProductToCart(cid, pid, qMany);
            res.status(200).send({status: "success", payload: {quantity: quantity}});
        } catch (error) {
            console.log({status: "error", error: error.toString()});
            res.status(400).send({status: "error", error: error.toString()});
        }
    }
    async modifyProductQuantity(req, res){
        let cid = req.params.cid;
        let pid = req.params.pid;
        let qMany = req.body.quantity;
        try {
            await cartManager.setProductQuantity(cid, pid, qMany);
            res.status(200).send({status: "success"});
        } catch (error) {
            res.status(400).send({status: "error", error: error.toString()});
        }
    }
    async setCart(req, res) {
        let cid = req.params.cid;
        let products = req.body;
        try {
            await cartManager.setProducts(cid, products);
            res.status(200).send({status: "success"});
        } catch (error) {
            res.status(400).send({status: "error", error: error.toString()});
        }
    }
    async deleteProduct(req, res){
        let cid = req.params.cid;
        let pid = req.params.pid;
        try {
            await cartManager.deleteProduct(cid, pid);
            res.status(200).send({status: "success"});
        } catch (error) {
            res.status(400).send({status: "error", error: error.toString()});
        }
    }
    async resetCart(req, res){
        let cid = req.params.cid;
        try {
            await cartManager.deleteProducts(cid); //change to deleteCart
            res.status(200).send({status: "success"});
        } catch (error) {
            res.status(400).send({status: "error", error: error.toString()});
        }
    }
    async buyCart(req, res){
        let cid = req.params.cid;
        try {
            let un = await cartManager.cartBought(cid, req.session.user.email);
            res.status(200).send({status: "success", payload:un});
        } catch (error) {
            res.status(400).send({status: "error", error: error.toString()});
        }
    }
    //! FOR TESTING ONLY
    async getIds(req, res){
        try {
            
            res.status(200).send({payload:await cartManager.getCarts(), status: "success"});
        } catch (error) {
            res.status(400).send({status: "error", error: error.toString()});
        }
    }
};

export default (new CartController());