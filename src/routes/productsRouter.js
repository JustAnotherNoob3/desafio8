import { Router } from "express";
import { __dirname } from "../utils.js";
import productsController from "../controllers/productsController.js";
import { isAdmin } from "../auth.js";

const productsRouter = Router();

productsRouter.get("/", productsController.getProducts);

productsRouter.get("/:pid", productsController.GetProductById);

productsRouter.post("/", isAdmin,productsController.createProduct);

productsRouter.put("/:pid", isAdmin, productsController.editProduct);

productsRouter.delete("/:pid", isAdmin, productsController.deleteProduct);

export default productsRouter;