import { Router } from "express";
import { __dirname } from "../utils.js";
import viewController from "../controllers/viewController.js";
import { authed, notAuthed } from "../auth.js";

const viewsRouter = Router();

viewsRouter.get("/", viewController.getDefault);
viewsRouter.get("/register", notAuthed, viewController.renderRawView("register"));
viewsRouter.get("/login", notAuthed, viewController.renderRawView("login"));
viewsRouter.get("/products-old", authed, viewController.getOldProductsView);

viewsRouter.get("/products", authed, viewController.getPagedProductsView);

viewsRouter.get("/products/:pid", authed, viewController.getDetailedProductView);

viewsRouter.get("/realtimeproducts", authed, viewController.getRealTimeProducts);

viewsRouter.get("/carts/:cid", authed, viewController.getCartView);

viewsRouter.get("/chat", authed, viewController.getChatView);



export default viewsRouter;