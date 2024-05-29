import { Router } from "express";
import { __dirname } from "../utils.js";
import cartController from "../controllers/cartController.js";
import { isAdmin, isNotAdmin } from "../auth.js";
const cartRouter = Router();

cartRouter.get("/:cid", cartController.getCart);

cartRouter.post("/", cartController.createCart);

cartRouter.post("/:cid/products/:pid", isNotAdmin, cartController.addProduct);

cartRouter.put("/:cid/products/:pid", cartController.modifyProductQuantity);

cartRouter.put("/:cid", cartController.setCart);

cartRouter.delete("/:cid/products/:pid", cartController.deleteProduct);

cartRouter.delete("/:cid", cartController.resetCart);

cartRouter.get('/:cid/purchase', cartController.buyCart);

//! FOR TESTING ONLY
cartRouter.get("/", isAdmin, cartController.getIds);

export default cartRouter;