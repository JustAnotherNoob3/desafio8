import { __dirname } from "../utils.js";
import productManager from '../Repositories/ProductManager.js';
import chatManager from "../Repositories/ChatManager.js";
import cartManager from "../Repositories/CartManager.js";

class ViewController{
    async getDefault(req, res)  {
        if(req.session && req.session.user) return res.redirect("/products");
        return res.redirect("/login")
      }
     renderRawView(viewName){
        return async (req, res) => res.render(viewName);
      }
      async getOldProductsView(req, res) {
        let products = (await productManager.getProducts(9999)).docs.map((x) => {
            let p = x.toObject();
            return {id: p._id.toString(), title: p.title, pair: Object.keys(p).map((obj, i) => {if(obj=="__v")return undefined;return {key: toTitleCase(obj), value:Object.values(p)[i]}})}
        });
        res.render("home", {product: products});
      }
      async getPagedProductsView(req, res){
        let fullUrl = req.protocol + '://' + req.get('host') + "/products";
        let p = await productManager.getProducts(5, req.query.page);
        let products = p.docs.map((x) => {
            let p = x.toObject();
            return {id: p._id.toString(), title: p.title, url: fullUrl+"/"+p._id}
        });
        res.render("products", {user: req.session.user,product: products, page: p.page, hasNext: p.hasNextPage, hasPrev: p.hasPrevPage, prevUrl: fullUrl + "?page=" + p.prevPage,nextUrl: fullUrl + "?page=" + p.nextPage});
      }
      async getDetailedProductView(req, res){
        let id = req.params.pid;
        try{
        let p = (await productManager.getProductById(id)).toObject();
        res.render("product", { user: req.session.user, id: id, title: p.title, pair: Object.keys(p).map((obj, i) => {if(obj=="__v" || obj == "title")return undefined;return {key: toTitleCase(obj), value:Object.values(p)[i]}})});
      } catch(error){
        res.status(400).send({ status: "error", error: error.toString() });
      }
      }
      async getRealTimeProducts(req, res) {
        let products = (await productManager.getProducts()).docs.map((x) => {
          let p = x.toObject();
          return {id: p._id.toString(), title: p.title, pair: Object.keys(p).map((obj, i) => {if(obj=="__v")return undefined;return {key: toTitleCase(obj), value:Object.values(p)[i]}})}
          });
          res.render("realTimeProducts",{product: products});
      }
      async getCartView(req, res){
        let id = req.params.cid;
        try{
        let cart = (await cartManager.getCartById(id)).toObject();
        res.render("cart",{id: id, product: cart.products.map((x) => {return {quantity: x.quantity, title: x.product.title, id: x.product._id, description: x.product.description}})});
        } catch(error){
          res.status(400).send({ status: "error", error: error.toString() });
        }
        
      }
        async getChatView(req, res){
            let msgs = (await chatManager.getMessages()).map((x) => x.toObject());
            console.log(msgs);
              res.render("chat",{messages: msgs});
          }
      
};

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

export default (new ViewController());